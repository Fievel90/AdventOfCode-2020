import * as E from "@effect-ts/system/Either";
import { task6 } from "@app/Days/Day-6";

describe("Day-6", () => {
  it("Should resolve exercise 1", () => {
    const result = task6.DailyTask.exercise1([
      'abc',
      '',
      'a',
      'b',
      'c',
      '',
      'ab',
      'ac',
      '',
      'a',
      'a',
      'a',
      'a',
      '',
      'b',
    ]);

    expect(result).toEqual(E.right(11));
  });

  it("Should resolve exercise 2", () => {
    const result = task6.DailyTask.exercise2([
      'abc',
      '',
      'a',
      'b',
      'c',
      '',
      'ab',
      'ac',
      '',
      'a',
      'a',
      'a',
      'a',
      '',
      'b',
    ]);

    expect(result).toEqual(E.right(6));
  });
});
