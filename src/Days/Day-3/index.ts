import * as E from "@effect-ts/system/Either";
import * as L from "@effect-ts/system/List";
import { pipe } from "fp-ts/function";
import { DailyTask } from "@app/Days";

interface Movement {
  right: number;
  down: number;
}

const calculate = (params: string[], { right, down }: Movement): number => {
  let x = 0;
  let y = 0;
  let trees = 0;

  while (y <= params.length) {
    x += right;
    y += down;

    if (y >= params.length) {
      break;
    }

    const row = params[y];
    if (x >= row.length) {
      x -= row.length;
    }

    const cell = row.charAt(x);

    if (cell === "#") {
      ++trees;
    }
  }

  return trees;
};

export const task3: DailyTask = {
  DailyTask: {
    exercise1: (params: string[]) =>
      pipe(
        E.right(params),
        E.map((a) => calculate(a, { right: 3, down: 1 }))
      ),
    exercise2: (params: string[]) => {
      const iterations: Movement[] = [
        { right: 1, down: 1 },
        { right: 3, down: 1 },
        { right: 5, down: 1 },
        { right: 7, down: 1 },
        { right: 1, down: 2 },
      ];

      return pipe(
        iterations,
        L.from,
        L.reduce(1, (acc, movement) => {
          acc *= calculate(params, movement);

          return acc;
        }),
        E.right
      );
    },
  },
};
