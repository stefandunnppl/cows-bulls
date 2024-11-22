export type ObtainResponse = {
  code: string;
};

export type CheckResponse = {
  attempt: string;
  correctDigits: number[];
  correctPositions: number[];
};

export interface CheckRequest extends ObtainResponse {
  attempt: string;
}
