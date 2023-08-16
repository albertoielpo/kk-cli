import { randomUUID } from "crypto";
import { Types } from "mongoose";

export class RandomCli {
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
}
