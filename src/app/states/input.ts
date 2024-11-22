import { WritableAtom } from "jotai";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";
import deepEqual from "fast-deep-equal";
import { CheckResponse } from "@/types";

export const codeAtom = atom<string | undefined>();

export const isGameReadyAtom = atom<boolean>(
  (get) => typeof get(codeAtom) !== "undefined"
);

export const inputValuesAtom = atom<string[]>(["", "", "", ""]);
export const previousAttemptsAtom = atom<CheckResponse[]>([]);

export const inputAtom = atomFamily<
  number,
  WritableAtom<string, string[], void>
>(
  (index) =>
    atom(
      (get) => get(inputValuesAtom)[index],
      (get, set, value) => {
        const values = [...get(inputValuesAtom)];
        values[index] = value;
        set(inputValuesAtom, () => values);
      }
    ),
  deepEqual
);

export const isCorrectAtom = atom<boolean>(false);
export const isSubmittingAtom = atom<boolean>(false);
