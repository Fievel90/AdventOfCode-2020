import * as IO from "io-ts";
import { either } from "fp-ts/Either";

export const RegEx = (a: RegExp) =>
  new IO.Type<string, string, unknown>(
    "RegEx",
    IO.string.is,
    (u, c) =>
      either.chain(IO.string.validate(u, c), (s) =>
        a.test(s) ? IO.success(s) : IO.failure(s, c)
      ),
    String
  );
