import * as L from "@effect-ts/system/List";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { DailyTask } from "@app/Days";

export const task: DailyTask = {
  DailyTask: {
    exercise1: (params: string[]) => pipe(
      params,
      L.from,
      E.right
    ),
    exercise2: (params: string[]) => pipe(
      params,
      L.from,
      E.right
    ),
  },
};
