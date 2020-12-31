import * as E from "@effect-ts/system/Either";
import { task } from "@app/Days/Day-8";

describe("Day-8", () => {
  it("Should resolve exercise 1", () => {
    const result = task.DailyTask.exercise1([
      'nop +0',
      'acc +1',
      'jmp +4',
      'acc +3',
      'jmp -3',
      'acc -99',
      'acc +1',
      'jmp -4',
      'acc +6',
    ]);

    expect(result).toEqual(E.right(5));
  });

  it("Should resolve exercise 2", () => {
    const result = task.DailyTask.exercise2([
      'nop +0',
      'acc +1',
      'jmp +4',
      'acc +3',
      'jmp -3',
      'acc -99',
      'acc +1',
      'jmp -4',
      'acc +6',
    ]);

    expect(result).toEqual(E.right(8));
  });
});
