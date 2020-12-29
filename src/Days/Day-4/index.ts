import * as E from "fp-ts/Either";
import * as L from "@effect-ts/system/List";
import { pipe } from "fp-ts/function";
import { DailyTask } from "@app/Days";
import { decoderExercise1, decoderExercise2 } from "@app/Days/Day-4/passport";

const passportSeparator = "|";
const fieldSeparator = " ";
const keyValueSeparator = ":";

const createPassports = (params: string[]) =>
  pipe(
    params,
    L.from,
    L.reduce("", (acc, value) => {
      if (value.length === 0) {
        acc = acc.trim() + passportSeparator;
      } else {
        acc += value.trim() + fieldSeparator;
      }

      return acc;
    }),
    (a) => a.trim().split(passportSeparator),
    L.from,
    L.map((a) => a.split(fieldSeparator)),
    L.map((a) =>
      a.reduce((acc: any, value) => {
        const [k, v] = value.split(keyValueSeparator);
        acc[k] = v;

        return acc;
      }, {})
    )
  );

export const task4: DailyTask = {
  DailyTask: {
    exercise1: (params: string[]) =>
      pipe(
        params,
        createPassports,
        L.map((a) => decoderExercise1.decode(a)),
        L.filter((a) => E.isRight(a)),
        L.length,
        E.right
      ),
    exercise2: (params: string[]) =>
      pipe(
        params,
        createPassports,
        L.map((a) => decoderExercise2.decode(a)),
        L.filter((a) => E.isRight(a)),
        L.length,
        E.right
      ),
  },
};
