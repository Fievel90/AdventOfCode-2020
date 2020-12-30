import * as E from "@effect-ts/system/Either";
import {
  task5,
  calculateRow,
  calculateColumn,
  calculateSeat,
} from "@app/Days/Day-5";
import { FindSeatError } from "@app/Days/Day-5/Error/FindSeatError";

const passes = [
  {
    boardingPass: "FBFBBFFRLR",
    row: 44,
    column: 5,
    seatID: 357,
  },
  {
    boardingPass: "BFFFBBFRRR",
    row: 70,
    column: 7,
    seatID: 567,
  },
  {
    boardingPass: "FFFBBBFRRR",
    row: 14,
    column: 7,
    seatID: 119,
  },
  {
    boardingPass: "BBFFBBFRLL",
    row: 102,
    column: 4,
    seatID: 820,
  },
];

describe.each(passes)("Day-5 - Boarding passes", (pass) => {
  it(`Should calculate boarding pass ${pass.boardingPass}`, () => {
    expect(calculateRow(pass.boardingPass)).toEqual(E.right(pass.row));
    expect(calculateColumn(pass.boardingPass)).toEqual(E.right(pass.column));
    expect(calculateSeat(pass.boardingPass)).toEqual(
      E.right({
        id: pass.seatID,
        row: pass.row,
        column: pass.column,
      })
    );
  });
});

describe("Day-5", () => {
  it("Should resolve exercise 1", () => {
    const result = task5.DailyTask.exercise1([
      "FBFBBFFRLR",
      "BFFFBBFRRR",
      "FFFBBBFRRR",
      "BBFFBBFRLL",
    ]);

    expect(result).toEqual(E.right(820));
  });

  it("Should resolve exercise 2", () => {
    const result = task5.DailyTask.exercise2([
      "FBFBBFFLLL",
      "FBFBBFFLLR",
      // Missing 1
      "FBFBBFFLRR",
      "FBFBBFFRLL",
      "FBFBBFFRLR",
      "FBFBBFFRRL",
      "FBFBBFFRRR",
    ]);

    expect(result).toEqual(E.right(354));
  });

  it("Should fail exercise 1 on invalid boarding pass", () => {
    const result1 = task5.DailyTask.exercise1(["FBFBBFXRLR"]);

    expect(result1).toEqual(
      E.left(new FindSeatError("Unexpected rows count, expected only one."))
    );

    const result2 = task5.DailyTask.exercise1(["FBFBBFFRLX"]);

    expect(result2).toEqual(
      E.left(new FindSeatError("Unexpected columns count, expected only one."))
    );
  });

  it("Should fail exercise 2 on invalid boarding pass", () => {
    const result1 = task5.DailyTask.exercise2(["FBFBBFXRLR"]);

    expect(result1).toEqual(
      E.left(new FindSeatError("Unexpected rows count, expected only one."))
    );

    const result2 = task5.DailyTask.exercise2(["FBFBBFFRLX"]);

    expect(result2).toEqual(
      E.left(new FindSeatError("Unexpected columns count, expected only one."))
    );
  });

  it("Should fail exercise 2 on multiple missing seats", () => {
    const result1 = task5.DailyTask.exercise2([
      "FBFBBFFLLL",
      "FBFBBFFLLR",
      // Missing 2 continuous
      "FBFBBFFRLL",
      "FBFBBFFRLR",
      "FBFBBFFRRL",
      "FBFBBFFRRR",
    ]);

    expect(result1).toEqual(
      E.left(
        new FindSeatError("Unexpected missing seats count, expected only one.")
      )
    );

    const result2 = task5.DailyTask.exercise2([
      "FBFBBFFLLL",
      "FBFBBFFLLR",
      // Missing 1
      "FBFBBFFLRR",
      "FBFBBFFRLL",
      "FBFBBFFRLR",
      // Missing 1
      "FBFBBFFRRR",
    ]);

    expect(result2).toEqual(
      E.left(
        new FindSeatError("Unexpected missing seats count, expected only one.")
      )
    );
  });
});
