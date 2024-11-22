import Cryptr from "cryptr";

import { NextRequest, NextResponse } from "next/server";
import { randomInt } from "node:crypto";

const salt = process.env.SALT;
const cryptr = new Cryptr(salt);

export const GET = async () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let randomNumber = "";

  for (let i = 0; i < 4; i++) {
    const index = randomInt(numbers.length - 1);
    const num = numbers.splice(index, 1)[0];
    randomNumber += `${num}`;
  }

  const encrypted = cryptr.encrypt(randomNumber);

  return NextResponse.json({ code: encrypted });
};

export const POST = async (request: NextRequest) => {
  const { attempt, code } = (await request.json()) as Awaited<{
    attempt: string;
    code: string;
  }>;

  if (!attempt || attempt.length !== 4 || !code) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const randomNumber = cryptr.decrypt(code);

  const correctPositions = (() => {
    const correctPositions: number[] = [];
    for (let i = 0; i < randomNumber.length; i++) {
      if (randomNumber[i] === attempt[i]) {
        correctPositions.push(i);
      }
    }
    return correctPositions;
  })();

  const correctDigits = (() => {
    const digits = randomNumber.split("");
    const correctDigits: number[] = [];

    for (let c = 0; c < attempt.length; c++) {
      if (digits.includes(attempt[c])) {
        if (!correctPositions.includes(c)) {
          correctDigits.push(c);
        }
      }
    }

    return correctDigits;
  })();

  return NextResponse.json({
    descrypted: randomNumber,
    attempt,
    correctDigits,
    correctPositions,
  });
};
