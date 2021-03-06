import * as IO from "io-ts";
import { either } from "fp-ts/Either";

export const LesserThanOrEqual = (a: number) =>
  new IO.Type<number, number, unknown>(
    "LesserThanOrEqual",
    IO.number.is,
    (u, c) =>
      either.chain(IO.number.validate(u, c), (s) =>
        s <= a ? IO.success(s) : IO.failure(s, c)
      ),
    Number
  );
