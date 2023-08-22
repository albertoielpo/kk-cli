const find = require("find-process");
/**
 * @author Alberto Ielpo
 */
export class PidInfoAction {
    protected static async findPid(
        name: "name" | "pid" | "port",
        value: string | number | RegExp,
        strict: boolean,
        shortMode?: boolean
    ) {
        const list: PidInfo[] = await find(name, value, strict);
        const res = new Map<string, PidInfo[] & number[]>();
        for (const cur of list) {
            if (!res.get(cur.name)) {
                res.set(cur.name, []);
            }
            if (shortMode) {
                res.get(cur.name)?.push(cur.pid);
            } else {
                res.get(cur.name)?.push(cur);
            }
        }
        if (res.size === 0) {
            console.warn(`No running program found for ${name} ${value}`);
        } else {
            console.log(res);
        }
        return res;
    }

    public static async getInfo(
        value: string | number,
        strict: string | boolean = true,
        options?: { short: boolean }
    ) {
        /** strict is true by default */
        const strictMode = !(strict === "false" || strict === false);

        const nValue = Number(value);
        if (isNaN(nValue)) {
            /** value is not a number then it's a name */
            await PidInfoAction.findPid(
                "name",
                value,
                strictMode,
                options?.short
            );
        } else {
            /** value is a pid number */
            await PidInfoAction.findPid(
                "pid",
                value,
                strictMode,
                options?.short
            );
        }
    }

    public static async getInfoByPort(
        value: number,
        options?: { short: boolean }
    ) {
        await PidInfoAction.findPid("port", value, true, options?.short);
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
