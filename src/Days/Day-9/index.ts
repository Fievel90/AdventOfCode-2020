import * as L from "@effect-ts/system/List";
import * as E from "@effect-ts/system/Either";
import { pipe } from "fp-ts/function";
import { DailyTask } from "@app/Days";
import { cartesianProduct } from "@app/Days/Day-1/cartesian-product";

const iterate = (params: number[]) => {
  const preambleLength = params.length <= 25 ? 5 : 25;

  for (let i = preambleLength; i < params.length; ++i) {
    const prev = params.slice(i - preambleLength, i);
    const check = params[i];

    const found = cartesianProduct(prev, prev)
      .map((a) => a.reduce((acc, value) => {
          acc += value;
          return acc;
        }, 0)
      )
      .find((a) => a === check);

    if (! found) {
      return E.right(check);
    }
  }

  return E.left("");
}

const contiguous = (invalidNumber: number, params: number[]) => {
  while (params.length > 0) {
    const arr = pipe(
      params,
      L.from,
      L.reduceWhile(
        [] as number[],
        (acc, value) => acc.reduce((i, v) => i + v, 0) + value <= invalidNumber,
        (acc, value) => {
          acc.push(value);
          return acc;
        }
      ),
    );

    if (arr.length > 1 && arr.reduce((i, v) => i + v, 0) === invalidNumber) {
      return Math.max(...arr) + Math.min(...arr);
    }

    params.shift();
  }

  return 0;
};

export const task: DailyTask = {
  DailyTask: {
    exercise1: (params: string[]) => {
      const list = params.map((s) => parseInt(s, 10));

      return pipe(
        list,
        iterate
      );
    },
    exercise2: (params: string[]) => {
      const list = params.map((s) => parseInt(s, 10));

      return pipe(
        list,
        iterate,
        E.map((a) => contiguous(a, list))
      );
    },
  },
};
