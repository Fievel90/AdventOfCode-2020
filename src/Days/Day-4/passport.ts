import * as IO from "io-ts";
import { NonEmptyString, NumberFromString } from "io-ts-types";
import { GreaterThanOrEqual } from "@app/Days/Day-4/Types/GreaterThanOrEqual";
import { LesserThanOrEqual } from "@app/Days/Day-4/Types/LesserThanOrEqual";
import { RegEx } from "@app/Days/Day-4/Types/RegEx";
import { CmHeight } from "@app/Days/Day-4/Types/CmHeight";
import { InHeight } from "@app/Days/Day-4/Types/InHeight";

export const decoderExercise1 = IO.intersection(
  [
    IO.type({
      byr: NonEmptyString,
      iyr: NonEmptyString,
      eyr: NonEmptyString,
      hgt: NonEmptyString,
      hcl: NonEmptyString,
      ecl: NonEmptyString,
      pid: NonEmptyString,
    }),
    IO.partial({
      cid: IO.string,
    }),
  ],
  "Passport"
);

export const decoderExercise2 = IO.intersection(
  [
    IO.type({
      byr: NumberFromString.pipe(GreaterThanOrEqual(1920))
        .pipe(LesserThanOrEqual(2002))
        .pipe(IO.Int),
      iyr: NumberFromString.pipe(GreaterThanOrEqual(2010))
        .pipe(LesserThanOrEqual(2020))
        .pipe(IO.Int),
      eyr: NumberFromString.pipe(GreaterThanOrEqual(2020))
        .pipe(LesserThanOrEqual(2030))
        .pipe(IO.Int),
      hgt: IO.intersection([
        NonEmptyString,
        RegEx(/^[0-9]+(cm|in)$/),
        CmHeight,
        InHeight,
      ]),
      hcl: IO.intersection([NonEmptyString, RegEx(/^#([0-9a-f]){6}$/)]),
      ecl: IO.intersection([
        NonEmptyString,
        RegEx(/^(amb|blu|brn|gry|grn|hzl|oth)$/),
      ]),
      pid: IO.intersection([NonEmptyString, RegEx(/^([0-9]){9}$/)]),
    }),
    IO.partial({
      cid: IO.string,
    }),
  ],
  "Passport"
);
