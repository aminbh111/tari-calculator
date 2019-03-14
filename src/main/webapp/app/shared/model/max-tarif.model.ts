import { ITarifMask } from 'app/shared/model/tarif-mask.model';

export interface IMaxTarif {
    id?: number;
    duration?: number;
    tarif?: number;
    currency?: string;
    tarifMasks?: ITarifMask[];
}

export class MaxTarif implements IMaxTarif {
    constructor(
        public id?: number,
        public duration?: number,
        public tarif?: number,
        public currency?: string,
        public tarifMasks?: ITarifMask[]
    ) {}
}
