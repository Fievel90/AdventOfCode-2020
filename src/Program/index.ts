import * as T from "@effect-ts/system/Effect";
import * as Ex from "@effect-ts/system/Exit";
import { pipe } from "fp-ts/function";
import { getInput } from "@app/Provider/Input/InputProvider";
import { Day, getTask } from "@app/Days";

export const main = (day: Day) =>
  pipe(
    T.do,
    T.bind("input", () => pipe(day, getInput)),
    T.bind("task", () => getTask()),
    T.chain(({ input, task }) =>
      T.tuple(
        pipe(
          input,
          T.map((a) => task.exercise1(a)),
          T.absolve,
          T.fold(
            (e) => Ex.fail(e),
            (a) => Ex.succeed(a)
          )
        ),
        pipe(
          input,
          T.map((a) => task.exercise2(a)),
          T.absolve,
          T.fold(
            (e) => Ex.fail(e),
            (a) => Ex.succeed(a)
          )
        )
      )
    )
  );
