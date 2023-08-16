import { randomUUID } from "crypto";
import { Types } from "mongoose";

/**
 * @author Alberto Ielpo
 */
export class RandomAction {
    /**
     * Generate random uuid
     */
    public static uuid() {
        console.log(randomUUID());
    }

    /**
     * Generate random mongoId
     */
    public static mongoId() {
        console.log(new Types.ObjectId().toString());
    }

    /**
     * Generate pseudo-random string
     */
    public static str() {
        console.log(
            Number(Math.random().toString().split(".")[1]).toString(36)
        );
    }

    /**
     * Generate pseudo-random integer
     */
    public static int(maxDigitsArgs?: number) {
        const number = Math.random().toString().split(".")[1];
        const maxDigits = Number(maxDigitsArgs);
        if (isNaN(maxDigits) || maxDigits < 0) {
            console.log(Number(number));
        } else {
            console.log(Number(number.substring(0, maxDigits)));
        }
    }
}
