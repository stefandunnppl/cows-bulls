import {
  inputAtom,
  inputValuesAtom,
  isSubmittingAtom,
} from "@/app/states/input";
import clsx from "clsx";
import { useAtom, useAtomValue } from "jotai";
import { ChangeEvent, FocusEvent, forwardRef, useState } from "react";

import animations from "./animation.module.scss";

export type InputProps = { index: number };

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ index }, ref) => {
    const [value, setValue] = useAtom(inputAtom(index));
    const isSubmitting = useAtomValue(isSubmittingAtom);
    const inputValues = useAtomValue(inputValuesAtom);
    const [isInvalid, setIsInvalid] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const { currentTarget } = e;
      const { value } = currentTarget;
      setIsInvalid(false);
      if (inputValues.includes(value)) {
        setIsInvalid(true);
        return;
      }
      setValue(value);
      if (value) {
        if (index < 3) {
          (currentTarget.nextSibling as HTMLInputElement | undefined)?.focus();
        }
      } else {
        if (index > 0) {
          (
            currentTarget.previousSibling as HTMLInputElement | undefined
          )?.focus();
        }
      }
    };

    const handleFocus = () => {
      setIsInvalid(false);
    };

    return (
      <input
        className={clsx(
          "p-2 rounded shadow w-[4ch] border outline-none text-center dark:bg-slate-950 dark:text-white focus:shadow-md focus:border-cyan-400",
          isInvalid && animations.shake
        )}
        ref={ref}
        maxLength={1}
        pattern="\d"
        required
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        disabled={isSubmitting}
      />
    );
  }
);

Input.displayName = "Input";
