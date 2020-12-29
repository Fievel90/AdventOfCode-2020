import * as IO from "io-ts";
import { PathReporter } from "io-ts/PathReporter";
import { right } from "fp-ts/Either";
import { GreaterThanOrEqual } from "@app/Days/Day-4/Types/GreaterThanOrEqual";
import { LesserThanOrEqual } from "@app/Days/Day-4/Types/LesserThanOrEqual";
import { RegEx } from "@app/Days/Day-4/Types/RegEx";

describe("Types", () => {
  it("Should test GreaterThanOrEqual type", () => {
    expect(GreaterThanOrEqual(3).decode(3)).toEqual(right(3));
    expect(GreaterThanOrEqual(3).decode(7)).toEqual(right(7));

    expect(PathReporter.report(GreaterThanOrEqual(3).decode(1))).toEqual([
      "Invalid value 1 supplied to : GreaterThanOrEqual",
    ]);
  });

  it("Should test LesserThanOrEqual type", () => {
    expect(LesserThanOrEqual(3).decode(3)).toEqual(right(3));
    expect(LesserThanOrEqual(3).decode(1)).toEqual(right(1));

    expect(PathReporter.report(LesserThanOrEqual(3).decode(7))).toEqual([
      "Invalid value 7 supplied to : LesserThanOrEqual",
    ]);
  });

  it("Should test GreaterThanOrEqual & LesserThanOrEqual type", () => {
    expect(
      IO.intersection([GreaterThanOrEqual(3), LesserThanOrEqual(9)]).decode(3)
    ).toEqual(right(3));
    expect(
      IO.intersection([GreaterThanOrEqual(3), LesserThanOrEqual(9)]).decode(5)
    ).toEqual(right(5));
    expect(
      IO.intersection([GreaterThanOrEqual(3), LesserThanOrEqual(9)]).decode(9)
    ).toEqual(right(9));

    expect(
      PathReporter.report(
        IO.intersection([GreaterThanOrEqual(3), LesserThanOrEqual(9)]).decode(1)
      )
    ).toEqual([
      "Invalid value 1 supplied to : (GreaterThanOrEqual & LesserThanOrEqual)/0: GreaterThanOrEqual",
    ]);
    expect(
      PathReporter.report(
        IO.intersection([GreaterThanOrEqual(3), LesserThanOrEqual(9)]).decode(
          11
        )
      )
    ).toEqual([
      "Invalid value 11 supplied to : (GreaterThanOrEqual & LesserThanOrEqual)/1: LesserThanOrEqual",
    ]);
  });

  it("Should test GreaterThanOrEqual | LesserThanOrEqual type", () => {
    expect(
      IO.union([GreaterThanOrEqual(3), LesserThanOrEqual(9)]).decode(1)
    ).toEqual(right(1));
    expect(
      IO.union([GreaterThanOrEqual(3), LesserThanOrEqual(9)]).decode(3)
    ).toEqual(right(3));
    expect(
      IO.union([GreaterThanOrEqual(3), LesserThanOrEqual(9)]).decode(5)
    ).toEqual(right(5));
    expect(
      IO.union([GreaterThanOrEqual(3), LesserThanOrEqual(9)]).decode(9)
    ).toEqual(right(9));
    expect(
      IO.union([GreaterThanOrEqual(3), LesserThanOrEqual(9)]).decode(11)
    ).toEqual(right(11));

    expect(
      IO.union([LesserThanOrEqual(3), GreaterThanOrEqual(9)]).decode(1)
    ).toEqual(right(1));
    expect(
      IO.union([LesserThanOrEqual(3), GreaterThanOrEqual(9)]).decode(3)
    ).toEqual(right(3));
    expect(
      IO.union([LesserThanOrEqual(3), GreaterThanOrEqual(9)]).decode(9)
    ).toEqual(right(9));
    expect(
      IO.union([LesserThanOrEqual(3), GreaterThanOrEqual(9)]).decode(11)
    ).toEqual(right(11));

    expect(
      PathReporter.report(
        IO.union([LesserThanOrEqual(3), GreaterThanOrEqual(9)]).decode(5)
      )
    ).toEqual([
      "Invalid value 5 supplied to : (LesserThanOrEqual | GreaterThanOrEqual)/0: LesserThanOrEqual",
      "Invalid value 5 supplied to : (LesserThanOrEqual | GreaterThanOrEqual)/1: GreaterThanOrEqual",
    ]);
  });

  it("Should test RegEx type", () => {
    expect(RegEx(/[0-9]+/).decode("31")).toEqual(right("31"));
    expect(RegEx(/^h/).decode("hello")).toEqual(right("hello"));

    expect(PathReporter.report(RegEx(/d$/).decode("hello"))).toEqual([
      'Invalid value "hello" supplied to : RegEx',
    ]);
  });
});
