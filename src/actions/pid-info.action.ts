const find = require("find-process");
/**
 * @author Alberto Ielpo
 */
export class PidInfoAction {
    protected static async findPid(
        name: "name" | "pid",
        value: string | number | RegExp,
        strict?: boolean
    ) {
        const list: PidInfo[] = await find(name, value, strict);
        const res = new Map<string, PidInfo[]>();
        for (const cur of list) {
            if (!res.get(cur.name)) {
                res.set(cur.name, []);
            }
            res.get(cur.name)?.push(cur);
        }
        if (res.size === 0) {
            console.warn(`No running program found for ${name} ${value}`);
        } else {
            console.log(res);
        }
        return res;
    }

    public static async getInfo(
        value: string | number | RegExp,
        matchAny?: boolean | string
    ) {
        /** !matchAny == strict */
        const strict = !matchAny || matchAny === "false";

        const nValue = Number(value);
        if (isNaN(nValue)) {
            /** value is not a number then it's a name */
            await PidInfoAction.findPid("name", value, strict);
        } else {
            /** value is a pid number */
            await PidInfoAction.findPid("pid", value, strict);
        }
    }
}

export type PidInfo = {
    pid: number;
    ppid?: number;
    uid?: number;
    gid?: number;
    name: string;
    cmd: string;
    bin?: string;
};
