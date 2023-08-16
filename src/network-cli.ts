import { checkPortStatus } from "portscanner";

/**
 * @author Alberto Ielpo
 */
export class NetworkCli {
    /**
     * Scan a port range given an host and a comma separated ports
     *
     * @param host
     * @param commaSeparatedPorts
     */
    public static async scan(host: string, commaSeparatedPorts: string) {
        const ports = commaSeparatedPorts.split(","); //comma separated ports
        const statusPromises = [];
        for (const port of ports) {
            statusPromises.push(checkPortStatus(Number(port), host));
        }

        const allSettled = await Promise.allSettled(statusPromises);
        let idx = 0;
        for (const res of allSettled) {
            if (res.status == "fulfilled") {
                switch (res.value) {
                    case "open":
                        console.log(`${host}:${ports[idx]} is busy`);
                        break;
                    case "closed":
                        console.log(`${host}:${ports[idx]} is available`);
                        break;
                    default:
                        console.error("${host}:${ports[idx]} invalid status");
                        break;
                }
            } else {
                console.error(`${host}:${ports[idx]} - ${res.reason}`);
            }
            idx++;
        }
    }
}
