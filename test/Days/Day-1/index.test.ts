import * as E from "@effect-ts/system/Either";
import { task } from "@app/Days/Day-1";
import { TooManyResultsError } from "@app/Days/Day-1/Error/TooManyResultsError";

describe("Day-1", () => {
  it("Should resolve exercise 1", () => {
    const result = task.DailyTask.exercise1([
      "1721",
      "979",
      "366",
      "299",
      "675",
      "1456",
    ]);

    expect(result).toEqual(E.right(514579));
  });

  it("Should resolve exercise 2", () => {
    const result = task.DailyTask.exercise2([
      "1721",
      "979",
      "366",
      "299",
      "675",
      "1456",
    ]);

    expect(result).toEqual(E.right(241861950));
  });

  it("Should fail exercise 1 on multiple entry sum to 2020", () => {
    const result = task.DailyTask.exercise1([
      "1721",
      "979",
      "366",
      "299",
      "675",
      "1456",
      "1000",
      "1020",
    ]);

    expect(result).toEqual(
      E.left(
        new TooManyResultsError("Unexpected results count, expected only one.")
      )
    );
  });

  it("Should fail exercise 2 on multiple entry sum to 2020", () => {
    const result = task.DailyTask.exercise2([
      "1721",
      "979",
      "366",
      "299",
      "675",
      "1456",
      "500",
      "500",
      "1020",
    ]);

    expect(result).toEqual(
      E.left(
        new TooManyResultsError("Unexpected results count, expected only one.")
      )
    );
  });
});
