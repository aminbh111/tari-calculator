import { ITarifMask } from 'app/shared/model/tarif-mask.model';

export interface IStep {
    id?: number;
    order?: number;
    duration?: number;
    tarif?: number;
    currency?: string;
    stepRepeater?: number;
    once?: boolean;
    tarifMasks?: ITarifMask[];
}

export class Step implements IStep {
    constructor(
        public id?: number,
        public order?: number,
        public duration?: number,
        public tarif?: number,
        public currency?: string,
        public stepRepeater?: number,
        public once?: boolean,
        public tarifMasks?: ITarifMask[]
    ) {
        this.once = this.once || false;
    }
}
