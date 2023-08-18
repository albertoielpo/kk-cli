/**
 * @author Alberto Ielpo
 */
const ncp = require("copy-paste");
import { promises } from "fs";

export class ClipboardAction {
    /**
     * Copy string content to clipboard
     *
     * @param content
     * @returns
     */
    public static copyToClipboard(content: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            ncp.copy(content, function (err: unknown) {
                if (err) {
                    console.error(
                        "Requires: pbcopy/pbpaste (for OSX), xclip (for Linux, FreeBSD, and OpenBSD) or clip (for Windows)"
                    );
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    /**
     * Copy file content to clipboard
     *
     * @param filename
     */
    public static async c2c(filename: string) {
        try {
            const content = await promises.readFile(filename, "utf-8");
            await ClipboardAction.copyToClipboard(content);
            console.log(`File ${filename} copied`);
        } catch (error) {
            console.error(error);
        } finally {
            // close with success
            process.exit(0);
        }
    }
}
