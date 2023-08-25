import { kill } from "process";
import { PidInfo, PidInfoAction } from "./pid-info.action";

/**
 * @author Alberto Ielpo
 */
export class KillProgramAction extends PidInfoAction {
    private static doKill(res: Map<string, PidInfo[]>) {
        if (!res || res.size === 0) {
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
        let res;
        const nValue = Number(value);
        if (isNaN(nValue)) {
            res = await PidInfoAction.findPid("name", value, true);
        } else {
            res = await PidInfoAction.findPid("pid", nValue, true);
        }
        KillProgramAction.doKill(res);
    }

    public static async killPort(value: number) {
        KillProgramAction.doKill(
            await PidInfoAction.findPid("port", value, true)
        );
    }
}
