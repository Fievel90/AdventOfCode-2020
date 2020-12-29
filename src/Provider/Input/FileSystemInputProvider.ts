import * as fs from "fs";
import * as path from "path";
import * as T from "@effect-ts/system/Effect";
import * as E from "@effect-ts/system/Either";
import { pipe } from "fp-ts/function";
import { InputProvider } from "@app/Provider/Input/InputProvider";
import { Day } from "@app/Days";
import { ReadInputError } from "@app/Provider/Input/Error/ReadInputError";

const getInputFileName = (day: Day): string =>
  path.join(__dirname, `/../../Inputs/${day}.txt`);

const readFile = (path: string) =>
  T.fromPromise(() =>
    fs.promises
      .readFile(path, { encoding: "utf-8" })
      .then((a: string) => E.right(a.split("\n")))
      .catch((e: NodeJS.ErrnoException) =>
        E.left(new ReadInputError(e.message))
      )
  );

export const FileSystemInputProvider: InputProvider = {
  InputProvider: {
    getInput: (day): T.Effect<any, any, any> =>
      pipe(
        day,
        getInputFileName,
        readFile,
        T.chain((a) => T.fromEither(() => a))
      ),
  },
};
