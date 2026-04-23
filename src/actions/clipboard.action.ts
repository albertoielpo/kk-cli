/**
 * @author Alberto Ielpo
 */
import { spawn } from "child_process";
import { promises } from "fs";

function getClipboardCommand(): { command: string; args: string[] } {
    switch (process.platform) {
        case "darwin":
            return { command: "pbcopy", args: [] };
        case "win32":
            return { command: "clip", args: [] };
        default:
            if (process.env.WAYLAND_DISPLAY) {
                return { command: "wl-copy", args: [] };
            }
            return { command: "xclip", args: ["-selection", "clipboard"] };
    }
}

export class ClipboardAction {
    private static copyToClipboard(content: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const { command, args } = getClipboardCommand();
            const child = spawn(command, args);

            child.on("error", (err) => {
                console.error(
                    "Requires: pbcopy (macOS), wl-copy (Wayland), xclip (X11), or clip (Windows)"
                );
                reject(err);
            });

            child.stdin.end(content, "utf8");
            child.on("close", (code) => {
                if (code === 0) resolve();
                else reject(new Error(`${command} exited with code ${code}`));
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
