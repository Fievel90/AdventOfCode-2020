import * as E from "@effect-ts/system/Either";
import { task } from "@app/Days/Day-9";

describe("Day-9", () => {
  it("Should resolve exercise 1", () => {
    const result = task.DailyTask.exercise1([
      '35',
      '20',
      '15',
      '25',
      '47',
      '40',
      '62',
      '55',
      '65',
      '95',
      '102',
      '117',
      '150',
      '182',
      '127',
      '219',
      '299',
      '277',
      '309',
      '576',
    ]);

    expect(result).toEqual(E.right(127));
  });

  it("Should resolve exercise 2", () => {
    const result = task.DailyTask.exercise2([
      '35',
      '20',
      '15',
      '25',
      '47',
      '40',
      '62',
      '55',
      '65',
      '95',
      '102',
      '117',
      '150',
      '182',
      '127',
      '219',
      '299',
      '277',
      '309',
      '576',
    ]);

    expect(result).toEqual(E.right(62));
  });
});
