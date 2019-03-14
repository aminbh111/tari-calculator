import { ITarifMask } from 'app/shared/model/tarif-mask.model';
import { IDayProfile } from 'app/shared/model/day-profile.model';

export interface IWeekProfile {
    id?: number;
    tarifMask?: ITarifMask;
    dayProfile?: IDayProfile;
}

export class WeekProfile implements IWeekProfile {
    constructor(public id?: number, public tarifMask?: ITarifMask, public dayProfile?: IDayProfile) {}
}
