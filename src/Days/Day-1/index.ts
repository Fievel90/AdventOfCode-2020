import * as E from "@effect-ts/system/Either";
import { pipe } from "fp-ts/function";
import { DailyTask } from "@app/Days";
import { cartesianProduct } from "@app/Days/Day-1/cartesian-product";
import { TooManyResultsError } from "@app/Days/Day-1/Error/TooManyResultsError";

const calculate = (...a: number[][]) =>
  pipe(
    a,
    (a) => cartesianProduct(...a),
    (a) =>
      a.map((item) => ({
        tot: item.reduce((acc, value) => acc + value),
        prod: item.reduce((acc, value) => acc * value),
      })),
    (a) => a.filter(({ tot }) => tot === 2020),
    (a) => {
      const products = [...new Set(a.map(({ prod }) => prod))];

      if (products.length === 1) {
        return E.right(a[0].prod);
      }
      return E.left(
        new TooManyResultsError("Unexpected results count, expected only one.")
      );
    }
  );

export const task1: DailyTask = {
  DailyTask: {
    exercise1: (params: string[]) =>
      pipe(
        params,
        (a) => a.map((item) => parseInt(item, 10)),
        (a) => calculate(a, a)
      ),
    exercise2: (params: string[]) =>
      pipe(
        params,
        (a) => a.map((item) => parseInt(item, 10)),
        (a) => calculate(a, a, a)
      ),
  },
};
