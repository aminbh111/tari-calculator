import { Moment } from 'moment';
import { IWeekProfile } from 'app/shared/model/week-profile.model';

export const enum WeekDay {
    Sunday = 'Sunday',
    Monday = 'Monday',
    Thursday = 'Thursday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Friday = 'Friday',
    Saturday = 'Saturday'
}

export interface IDayProfile {
    id?: number;
    weekday?: WeekDay;
    fromTime?: Moment;
    toTime?: Moment;
    weekProfiles?: IWeekProfile[];
}

export class DayProfile implements IDayProfile {
    constructor(
        public id?: number,
        public weekday?: WeekDay,
        public fromTime?: Moment,
        public toTime?: Moment,
        public weekProfiles?: IWeekProfile[]
    ) {}
}
