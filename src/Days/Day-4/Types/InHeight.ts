import * as IO from "io-ts";
import { either } from "fp-ts/Either";

export const InHeight = new IO.Type<string, string, unknown>(
  "InHeight",
  IO.string.is,
  (u, c) =>
    either.chain(IO.string.validate(u, c), (s) => {
      if (s.indexOf("in") !== -1) {
        const hgtValue = parseInt(s.replace("in", ""), 10);
        return hgtValue >= 59 && hgtValue <= 76
          ? IO.success(s)
          : IO.failure(s, c);
      }

      return IO.success(s);
    }),
  String
);
