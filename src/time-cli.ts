const TimeFormats = ["timestamp", "iso8601"] as const;
type TimeFormat = (typeof TimeFormats)[number];

/**
 * @author Alberto Ielpo
 */
export class TimeCli {
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
                console.warn(`invalid timeFormat. Try one of [${TimeFormats}]`);
                break;
        }
    }
}
