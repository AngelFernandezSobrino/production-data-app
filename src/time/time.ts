
type Seconds = number;
type Milliseconds = number;
type Minutes = number;
type Hours = number;
type Days = number;
type Weeks = number;

type CompleteTime = {
    seconds?: Seconds;
    milliseconds?: Milliseconds;
    minutes?: Minutes;
    hours?: Hours;
    days?: Days;
    weeks?: Weeks;
}

type TimeSelector = Array<'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks'>;

export default class Time {

    time: Milliseconds = 0;

    constructor(times: CompleteTime) {
        for (let [key, value] of Object.entries(times)) {
            this.time += Time.getMilliseconds(key, value);
        }
    }

    private static getMilliseconds(type: string, time: number): Milliseconds {
        switch (type) {
            case 'seconds':
                return time * 1000;
            case 'minutes':
                return time * 60000;
            case 'hours':
                return time * 3600000;
            case 'days':
                return time * 86400000;
            case 'weeks':
                return time * 604800000;
            default:
                return time;
        }
    }


    getTimeAs(config: TimeSelector): CompleteTime {
        
        let time = this.time;
        let timeObject: CompleteTime = {
            milliseconds: 0,
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0,
            weeks: 0
        };

        if (config.includes('weeks')) {
            timeObject.weeks = Math.floor(time / 604800000);
            time -= timeObject.weeks * 604800000;
        }

        if (config.includes('days')) {
            timeObject.days = Math.floor(time / 86400000);
            time -= timeObject.days * 86400000;
        }

        if (config.includes('hours')) {
            timeObject.hours = Math.floor(time / 3600000);
            time -= timeObject.hours * 3600000;
        }

        if (config.includes('minutes')) {
            timeObject.minutes = Math.floor(time / 60000);
            time -= timeObject.minutes * 60000;
        }

        if (config.includes('seconds')) {
            timeObject.seconds = Math.floor(time / 1000);
            time -= timeObject.seconds * 1000;
        }

        if (config.includes('milliseconds')) {
            timeObject.milliseconds = time;
        }
        
        return timeObject;
    }

    toTimeString(config: TimeSelector, format: string): string {

        let timeObject = this.getTimeAs(config);

        let timeString = format;

        // For loop of timeObject with key and value
        for (let [key, value] of Object.entries(timeObject)) {
            timeString = timeString.replace(`{${key}}`, value.toString());
        }

        return timeString;
    }
}