import * as IO from "io-ts";
import { either } from "fp-ts/Either";

export const CmHeight = new IO.Type<string, string, unknown>(
  "CmHeight",
  IO.string.is,
  (u, c) =>
    either.chain(IO.string.validate(u, c), (s) => {
      if (s.indexOf("cm") !== -1) {
        const hgtValue = parseInt(s.replace("cm", ""), 10);
        return hgtValue >= 150 && hgtValue <= 193
          ? IO.success(s)
          : IO.failure(s, c);
      }

      return IO.success(s);
    }),
  String
);
