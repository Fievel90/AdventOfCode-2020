import * as E from "@effect-ts/system/Either";
import { task2 } from "@app/Days/Day-2";

describe("Day-2", () => {
  it("Should resolve exercise 1", () => {
    const result = task2.DailyTask.exercise1([
      "1-3 a: abcde",
      "1-3 b: cdefg",
      "2-9 c: ccccccccc",
    ]);

    expect(result).toEqual(E.right(2));
  });

  it("Should resolve exercise 2", () => {
    const result = task2.DailyTask.exercise2([
      "1-3 a: abcde",
      "1-3 b: cdefg",
      "2-9 c: ccccccccc",
    ]);

    expect(result).toEqual(E.right(1));
  });

  it("Should fail exercise 1 on invalid input, returning 0 valid password", () => {
    const result = task2.DailyTask.exercise1([
      "1-3 a abcde",
      "1 b: cdefg",
      "2-9 c:",
    ]);

    expect(result).toEqual(E.right(0));
  });

  it("Should fail exercise 2 on invalid input, returning 0 valid password", () => {
    const result = task2.DailyTask.exercise2([
      "1-3 a abcde",
      "1 b: cdefg",
      "2-9 c:",
    ]);

    expect(result).toEqual(E.right(0));
  });
});
