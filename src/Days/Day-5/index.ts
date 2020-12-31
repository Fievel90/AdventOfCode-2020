import * as E from "fp-ts/Either";
import * as L from "@effect-ts/system/List";
import { pipe, tuple } from "fp-ts/function";
import { DailyTask } from "@app/Days";
import { FindSeatError } from "@app/Days/Day-5/Error/FindSeatError";

interface Seat {
  id: number;
  row: number;
  column: number;
}

const reduceSeat = (acc: number[], index: string): number[] => {
  const [min, max] = acc;
  const lowerHalf = [min, min + Math.floor((max - min) / 2)];
  const upperHalf = [min + Math.ceil((max - min) / 2), max];

  switch (index) {
    case "F":
    case "L":
      return lowerHalf;
    case "B":
    case "R":
      return upperHalf;
    default:
      return acc;
  }
};

export const calculateRow = (boardingPass: string) =>
  pipe(
    boardingPass,
    (a) => a.slice(0, 7),
    (a) => a.split(""),
    L.from,
    L.reduce([0, 127], reduceSeat),
    (a) => {
      if (a[0] !== a[1]) {
        return E.left(
          new FindSeatError("Unexpected rows count, expected only one.")
        );
      }

      return E.right(a[0]);
    }
  );

export const calculateColumn = (boardingPass: string) =>
  pipe(
    boardingPass,
    (a) => a.slice(7),
    (a) => a.split(""),
    L.from,
    L.reduce([0, 7], reduceSeat),
    (a) => {
      if (a[0] !== a[1]) {
        return E.left(
          new FindSeatError("Unexpected columns count, expected only one.")
        );
      }

      return E.right(a[0]);
    }
  );

export const calculateSeat = (boardingPass: string) =>
  pipe(
    boardingPass,
    (a) => tuple(calculateRow(a), calculateColumn(a)),
    E.sequenceArray,
    E.map(
      ([row, column]): Seat => ({
        id: row * 8 + column,
        row,
        column,
      })
    )
  );

const calculateSeats = (params: string[]) =>
  pipe(params, (p) => p.map((a) => calculateSeat(a)), E.sequenceArray);

const calculateHighestSeatID = (params: string[]) =>
  pipe(
    params,
    calculateSeats,
    E.map((a) => Math.max(...a.map((s) => s.id)))
  );

const calculateMissingSeatID = (params: string[]) =>
  pipe(
    params,
    calculateSeats,
    E.map((seats) => {
      const allRows = Array.from(Array(127).keys());
      const allColumns = Array.from(Array(7).keys());

      return allRows.reduce((acc, row) => {
        const missingSeats = allColumns.reduce((acc, column) => {
          const myId = row * 8 + column;
          const seatIsFull = seats.find((seat) => {
            return seat.row === row && seat.column === column;
          });
          const leftNeighbour = seats.find((seat) => {
            return seat.id === myId - 1;
          });
          const rightNeighbour = seats.find((seat) => {
            return seat.id === myId + 1;
          });
          if (!seatIsFull && leftNeighbour && rightNeighbour) {
            acc.push({
              id: myId,
              row,
              column,
            });
          }

          return acc;
        }, [] as Seat[]);

        acc.push(...missingSeats);

        return acc;
      }, [] as Seat[]);
    }),
    E.chain((a) => {
      if (a.length === 1) {
        return E.right(a[0].id);
      }

      return E.left(
        new FindSeatError("Unexpected missing seats count, expected only one.")
      );
    })
  );

export const task: DailyTask = {
  DailyTask: {
    exercise1: (params: string[]) => calculateHighestSeatID(params),
    exercise2: (params: string[]) => calculateMissingSeatID(params),
  },
};
