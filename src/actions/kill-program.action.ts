import { kill } from "process";
import { PidInfoAction } from "./pid-info.action";

/**
 * @author Alberto Ielpo
 */
export class KillProgramAction extends PidInfoAction {
    private static async killByPid(pid: number) {
        const res = await PidInfoAction.findPid("pid", pid);
        if (res.size === 0) {
            return;
        }
        kill(pid);
    }

    private static async killByName(name: string) {
        const res = await PidInfoAction.findPid("name", name, true);
        if (res.size === 0) {
            return;
        }
        for (const entry of res.entries()) {
            if (Array.isArray(entry[1])) {
                for (const cur of entry[1]) {
                    kill(cur.pid);
                }
            }
        }
    }

    public static async kill(value: number | string) {
        const nValue = Number(value);
        if (isNaN(nValue)) {
            await KillProgramAction.killByName(value as string);
        } else {
            await KillProgramAction.killByPid(nValue);
        }
    }
}
