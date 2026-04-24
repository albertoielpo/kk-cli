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
            let settled = false;
            const done = (err?: Error) => {
                if (settled) return;
                settled = true;
                if (err) {
                    console.error(
                        "Requires: pbcopy (macOS), wl-copy (Wayland), xclip (X11), or clip (Windows)"
                    );
                    reject(err);
                } else {
                    resolve();
                }
            };

            const stderrChunks: Buffer[] = [];
            child.stderr.on("data", (chunk: Buffer) =>
                stderrChunks.push(chunk)
            );
            child.stderr.on("end", () => {
                if (stderrChunks.length > 0)
                    done(
                        new Error(
                            Buffer.concat(stderrChunks as any).toString("utf8")
                        )
                    );
            });

            child.stdin.on("error", done);
            child.on("error", done);
            child.on("exit", () => done());

            child.stdin.end(Buffer.from(content, "utf8"));
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
