export class TooManyResultsError {
  readonly _tag = "TooManyResultsError";

  constructor(readonly message: string) {}
}
