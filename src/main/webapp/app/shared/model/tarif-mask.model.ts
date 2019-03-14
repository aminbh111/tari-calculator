import { Moment } from 'moment';
import { IStep } from 'app/shared/model/step.model';
import { IMaxTarif } from 'app/shared/model/max-tarif.model';

export interface ITarifMask {
    id?: number;
    validFrom?: Moment;
    validTo?: Moment;
    step?: IStep;
    maxTarif?: IMaxTarif;
}

export class TarifMask implements ITarifMask {
    constructor(public id?: number, public validFrom?: Moment, public validTo?: Moment, public step?: IStep, public maxTarif?: IMaxTarif) {}
}
