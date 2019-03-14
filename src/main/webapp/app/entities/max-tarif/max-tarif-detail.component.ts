import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMaxTarif } from 'app/shared/model/max-tarif.model';

@Component({
    selector: 'jhi-max-tarif-detail',
    templateUrl: './max-tarif-detail.component.html'
})
export class MaxTarifDetailComponent implements OnInit {
    maxTarif: IMaxTarif;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ maxTarif }) => {
            this.maxTarif = maxTarif;
        });
    }

    previousState() {
        window.history.back();
    }
}
