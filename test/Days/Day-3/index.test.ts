import * as E from "@effect-ts/system/Either";
import { task3 } from "@app/Days/Day-3";

describe("Day-3", () => {
  it("Should resolve exercise 1", async () => {
    const result = task3.DailyTask.exercise1([
      "..##.......",
      "#...#...#..",
      ".#....#..#.",
      "..#.#...#.#",
      ".#...##..#.",
      "..#.##.....",
      ".#.#.#....#",
      ".#........#",
      "#.##...#...",
      "#...##....#",
      ".#..#...#.#",
    ]);

    expect(result).toEqual(E.right(7));
  });

  it("Should resolve exercise 2", async () => {
    const result = task3.DailyTask.exercise2([
      "..##.......",
      "#...#...#..",
      ".#....#..#.",
      "..#.#...#.#",
      ".#...##..#.",
      "..#.##.....",
      ".#.#.#....#",
      ".#........#",
      "#.##...#...",
      "#...##....#",
      ".#..#...#.#",
    ]);

    expect(result).toEqual(E.right(336));
  });
});
