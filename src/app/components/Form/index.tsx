"use client";

import { FormEvent, useCallback, useEffect } from "react";
import { Inputs } from "../Inputs";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  codeAtom,
  inputValuesAtom,
  isCorrectAtom,
  isGameReadyAtom,
  isSubmittingAtom,
  previousAttemptsAtom,
} from "@/app/states/input";
import { CheckResponse, ObtainResponse } from "@/types";
import { FaCow } from "react-icons/fa6";
import { FaCircleNotch } from "react-icons/fa";
import { Attempts } from "../Attempts";
import JSConfetti from "js-confetti";

export const Form = () => {
  const [submitting, setSubmitting] = useAtom(isSubmittingAtom);
  const [code, setCode] = useAtom(codeAtom);
  const isGameReady = useAtomValue(isGameReadyAtom);
  const inputValues = useAtomValue(inputValuesAtom);
  const [attempts, setAttempts] = useAtom(previousAttemptsAtom);
  const setInput = useSetAtom(inputValuesAtom);
  const [isSuccess, setIsSuccess] = useAtom(isCorrectAtom);

  const getNumber = useCallback(
    () =>
      fetch("/api/number")
        .then((response) => response.json())
        .then(({ code }: ObtainResponse) => setCode(code)),
    [setCode]
  );

  useEffect(() => {
    getNumber();
  }, [getNumber]);

  useEffect(() => {
    const playMusic = () => {
      const bgMusic = new Audio("/bg.mp3");
      bgMusic.loop = true;
      bgMusic.play();
      document.removeEventListener("click", playMusic);
      document.removeEventListener("keydown", playMusic);
    };

    document.addEventListener("click", playMusic);
    document.addEventListener("keydown", playMusic);
  }, []);

  const handleSuccess = () => {
    setIsSuccess(true);
    new Audio("/cow.mp3").play();
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti();
  };

  const handleReset = () => {
    setIsSuccess(false);
    setAttempts([]);
    setInput(["", "", "", ""]);
    setCode(undefined);
    getNumber();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) {
      return;
    }
    setSubmitting(true);
    const attempt = inputValues.join("");
    fetch("/api/number", {
      method: "post",
      body: JSON.stringify({ code, attempt }),
    })
      .then((response) => response.json())
      .then((response: CheckResponse) => {
        setAttempts((prev) => {
          const newAttempts = [...prev];
          newAttempts.push(response);
          return newAttempts;
        });
        setInput(["", "", "", ""]);
        if (response.correctPositions.length === 4) {
          handleSuccess();
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (!isGameReady) {
    return (
      <div className="inline-block p-8 text-center bg-white dark:bg-slate-900 dark:text-white rounded-md shadow-2xl">
        Loading game...
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="inline-flex flex-col items-center gap-4 p-8 text-center bg-white dark:bg-slate-900 dark:text-white rounded-md shadow-2xl">
        <p>
          Congratulations! You found the right answer in {attempts.length}{" "}
          attempt
          {attempts.length === 1 ? "" : "s"}!
        </p>
        <button
          className="px-8 py-2 text-white bg-sky-800 hover:bg-sky-900 rounded shadow-md"
          onClick={handleReset}
        >
          Play Again!
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex flex-col gap-4 p-8 bg-white dark:bg-slate-900 dark:text-white rounded-md shadow-2xl min-h-[300px]"
    >
      <div className="flex gap-4 justify-center">
        <Inputs />
        <button
          type="submit"
          className="w-[4ch] bg-green-600 hover:bg-green-700 active:bg-teal-600 text-white rounded shadow text-center p-2"
          disabled={submitting}
        >
          {submitting ? (
            <FaCircleNotch scale={1.4} className="inline-block animate-spin" />
          ) : (
            <FaCow scale={1.4} className="inline-block" />
          )}
        </button>
      </div>
      <Attempts />
      <div className="border-t border-slate-400 py-4 mt-auto">
        <h2 className="font-bold mb-2">Instructions</h2>
        <p className="my-2">
          Guess a 4 digit number (no digit can be used more than once).
        </p>
        <p>
          <span className="inline-block bg-purple-700 h-4 w-4 rounded-full" /> -
          Correct number, wrong position
        </p>
        <p>
          <span className="inline-block bg-green-600 h-4 w-4 rounded-full" /> -
          Correct number & position
        </p>
      </div>
    </form>
  );
};
