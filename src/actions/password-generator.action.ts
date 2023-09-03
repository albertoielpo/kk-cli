import { createHash } from "crypto";

export class PasswordGeneratorAction {
    private static DEFAULT_SEED = "ielpo.net";

    /**
     * SHA-1 computation
     * @param inputVal
     */
    public static SHA(inputVal: string) {
        let res = "";
        if (!!inputVal) {
            let shasum = createHash("sha1");
            shasum.update(inputVal);
            res = shasum.digest("hex");
        }
        return res;
    }

    /**
     * Compute v1 password
     * @param inputVal
     */
    private static computeV1(inputVal: string) {
        let res = "";
        const textSHA = PasswordGeneratorAction.SHA(inputVal);
        if (!!textSHA) {
            let charSum = 0;
            for (let ii = 0; ii < inputVal.length; ii++) {
                charSum = inputVal.charCodeAt(ii) + textSHA.charCodeAt(ii);
                charSum = charSum % 127;
                if (!(charSum > 32 && charSum < 127)) {
                    charSum += 33;
                }
                res = res + String.fromCharCode(charSum);
            }
        }
        return res;
    }

    /**
     * Compute v2 password
     * @param inputVal
     */
    private static computeV2(inputVal: string) {
        const tmp = PasswordGeneratorAction.computeV1(inputVal);
        let res = "";
        for (let ii = 0; ii < tmp.length; ii++) {
            res += ii % 2 == 0 ? tmp[ii].toLowerCase() : tmp[ii].toUpperCase();
        }

        res = res + ((res.length % 10) - 9) * -1;
        return res.split("").reverse().join("");
    }

    /**
     * Compute v3 password that uses input and seed
     * @param inputVal
     * @param seed
     */
    private static computeV3(inputVal: string, seed: string) {
        let a = PasswordGeneratorAction.computeV2(inputVal);
        let b = PasswordGeneratorAction.computeV2(
            PasswordGeneratorAction.SHA(seed)
        );
        let c = "";
        for (let ii = 0; ii < a.length; ii++) {
            c += ii % 2 == 0 ? a[ii].toUpperCase() : b[ii].toLowerCase();
        }

        return c;
    }

    /**
     * Generate password
     * If passphrase is used kk pwd passphrase the strenght of the password depends on passphrase. An additional seed is used to enforce security
     * If no passphrase is set the random flag should be set
     *
     * With no length maximum security
     * With length == 5 is detected 1 collision every 1_000
     * With length == 8, 1 collision every 100_000
     *
     * @param passphrase
     * @param options
     * @returns
     */
    public static generate(
        passphrase: string | undefined | null,
        options: PasswordGeneratorOptions
    ) {
        if (options.random) {
            /** generate random password */
            const rnd = Math.random().toString();
            const res = PasswordGeneratorAction.computeV3(
                rnd,
                rnd.split("").reverse().join("")
            );
            const pwdLength = Number(options.length);
            if (!isNaN(pwdLength) && pwdLength > 0) {
                console.log(res.substring(0, pwdLength));
            } else {
                console.log(res);
            }
            return;
        }

        /** generate password from passphrase */
        if (!passphrase) {
            console.error("Invalid passphrase");
            return;
        }
        switch (Number(options.version)) {
            case 1:
                console.log(PasswordGeneratorAction.computeV1(passphrase));
                return;
            case 2:
                console.log(PasswordGeneratorAction.computeV2(passphrase));
                return;
            case 3:
            default:
                console.log(
                    PasswordGeneratorAction.computeV3(
                        passphrase,
                        options.seed ?? PasswordGeneratorAction.DEFAULT_SEED
                    )
                );
                return;
        }
    }
}

type PasswordGeneratorOptions = {
    random?: boolean;
    length?: number;
    seed?: string;
    version?: 1 | 2 | 3;
};
