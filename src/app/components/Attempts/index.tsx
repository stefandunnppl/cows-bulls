import { isCorrectAtom, previousAttemptsAtom } from "@/app/states/input";
import { useAtomValue } from "jotai";
import { Attempt } from "../Attempt";

export const Attempts = () => {
  const attempts = useAtomValue(previousAttemptsAtom);
  const isCorrect = useAtomValue(isCorrectAtom);

  if (!attempts.length) {
    return <div className="text-center">Take your first guess</div>;
  }

  if (isCorrect) {
    return (
      <div className="text-center">
        Congrats! You found the number in {attempts.length} attempts.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2 dark:text-white mb-4">
      {attempts.map((attempt, index) => (
        <Attempt {...attempt} key={index} />
      ))}
    </ul>
  );
};
