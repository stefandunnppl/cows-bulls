import { CheckResponse } from "@/types";
import clsx from "clsx";

export const Attempt = ({
  attempt,
  correctPositions,
  correctDigits,
}: CheckResponse) => {
  const characters: {
    letter: string;
    correctPosition: boolean;
    correctDigit: boolean;
  }[] = attempt.split("").map((character, index) => ({
    letter: character,
    correctPosition: correctPositions.includes(index),
    correctDigit: correctDigits.includes(index),
  }));

  return (
    <li className="flex gap-2">
      {characters.map(({ correctDigit, correctPosition, letter }, index) => (
        <div
          key={index}
          className={clsx(
            "p-2 min-w-[4ch] text-center rounded-full",
            correctPosition && "bull bg-green-600 text-white",
            correctDigit && "cow bg-purple-700 text-white"
          )}
        >
          {letter}
        </div>
      ))}
    </li>
  );
};
