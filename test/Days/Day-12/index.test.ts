import * as E from "@effect-ts/system/Either";
import { task } from "@app/Days/Day-12";

describe("Day-12", () => {
  it("Should resolve exercise 1", () => {
    const result = task.DailyTask.exercise1([]);

    expect(result).toEqual(E.right(0));
  });

  it("Should resolve exercise 2", () => {
    const result = task.DailyTask.exercise2([]);

    expect(result).toEqual(E.right(0));
  });
});
