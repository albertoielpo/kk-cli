const TimeFormats = ["timestamp", "iso8601"] as const;
type TimeFormat = (typeof TimeFormats)[number];

/**
 * @author Alberto Ielpo
 */
export class TimeAction {
    /**
     * Print current timestamp in milliseconds
     */
    public static time(timeFormat: TimeFormat = "timestamp") {
        const d = new Date();
        switch (timeFormat) {
            case "timestamp":
                console.log(d.getTime());
                break;
            case "iso8601":
                console.log(d.toISOString());
                break;
            default:
                console.warn(
                    `invalid time format. try one of [${TimeFormats}]`
                );
                break;
        }
    }
}
