import { pipe } from "fp-ts/function";
import { DailyTask, dailyTaskMap, Day } from "@app/Days";
import { InputProvider } from "@app/Provider/Input/InputProvider";
import * as T from "@effect-ts/system/Effect";
import * as Ex from "@effect-ts/system/Exit";
import { main } from "@app/Program";
import { FileSystemInputProvider } from "@app/Provider/Input/FileSystemInputProvider";
import { ReadInputError } from "@app/Provider/Input/Error/ReadInputError";

const days = [
  {
    input: "day-1",
    expected: [928896, 295668576],
  },
  {
    input: "day-2",
    expected: [465, 294],
  },
  {
    input: "day-3",
    expected: [169, 7560370818],
  },
  {
    input: "day-4",
    expected: [208, 167],
  },
  {
    input: "day-5",
    expected: [974, 646],
  },
];

describe.each(days)("Program", (day) => {
  it(`Should resolve ${day.input}`, async () => {
    const program = await pipe(
      day.input as Day,
      main,
      T.provide<InputProvider>(FileSystemInputProvider),
      T.provide<DailyTask>(dailyTaskMap[day.input as Day]),
      T.result,
      T.map(Ex.untraced),
      T.runPromise
    );
    const expected = Ex.succeed(day.expected.map(Ex.succeed));

    expect(program).toEqual(expected);
  });
});

describe("Program", () => {
  it("Should fail on invalid day", async () => {
    const program = await pipe(
      "day-0" as Day,
      main,
      T.provide<InputProvider>(FileSystemInputProvider),
      T.provide<DailyTask>(dailyTaskMap["day-0" as Day]),
      T.result,
      T.map(Ex.untraced),
      T.runPromise
    );
    const error = new ReadInputError(
      "ENOENT: no such file or directory, open '/projects/src/Inputs/day-0.txt'"
    );
    const expected = Ex.succeed([Ex.fail(error), Ex.fail(error)]);

    expect(program).toEqual(expected);
  });
});
