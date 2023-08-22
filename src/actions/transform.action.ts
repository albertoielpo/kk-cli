const Base64Actions = ["encode", "decode"] as const;
type Base64Action = (typeof Base64Actions)[number];

/**
 * @author Alberto Ielpo
 */
export class TransformAction {
    /**
     * encode / decode base64 data
     * @param action
     * @param data
     */
    public static base64(action: Base64Action, data: string) {
        switch (action) {
            case "encode":
                console.log(Buffer.from(data).toString("base64"));
                break;
            case "decode":
                console.log(Buffer.from(data, "base64").toString("utf-8"));
                break;
            default:
                console.warn(
                    `invalid action '${action}'. try one of [${Base64Actions}]`
                );
                break;
        }
    }

    public static jwtDecode(token: string) {
        const parts = token.split(".");
        if (parts.length !== 3) {
            console.warn("Invalid jwt token");
            return;
        }

        console.log(Buffer.from(parts[0], "base64").toString("utf-8"));
        console.log(Buffer.from(parts[1], "base64").toString("utf-8"));
    }
}
