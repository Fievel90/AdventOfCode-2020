import * as fs from "fs";
import * as path from "path";
import * as T from "@effect-ts/system/Effect";
import * as Ex from "@effect-ts/system/Exit";
import { pipe } from "fp-ts/function";
import { FileSystemInputProvider } from "@app/Provider/Input/FileSystemInputProvider";
import { Day } from "@app/Days";
import { ReadInputError } from "@app/Provider/Input/Error/ReadInputError";

describe("FileSystemInputProvider", () => {
  it("Should parse correctly an existing input file", async () => {
    const filename = path.join(__dirname, "/../../../src/Inputs/day-1.txt");
    const expected = await fs.promises
      .readFile(filename, { encoding: "utf-8" })
      .then((data) => data.split("\n"));

    const result = await pipe(
      T.do,
      T.chain(() => FileSystemInputProvider.InputProvider.getInput("day-1")),
      T.result,
      T.map(Ex.untraced),
      T.runPromise
    );

    expect(result).toEqual(Ex.succeed(expected));
  });

  it("Should fail on non existing input file", async () => {
    const day0 = "day-0" as Day;

    const result = await pipe(
      T.do,
      T.chain(() => FileSystemInputProvider.InputProvider.getInput(day0)),
      T.result,
      T.map(Ex.untraced),
      T.runPromise
    );

    expect(result).toEqual(
      Ex.fail(
        new ReadInputError(
          "ENOENT: no such file or directory, open '/projects/src/Inputs/day-0.txt'"
        )
      )
    );
  });
});
