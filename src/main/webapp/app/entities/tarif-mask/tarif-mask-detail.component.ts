import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITarifMask } from 'app/shared/model/tarif-mask.model';

@Component({
    selector: 'jhi-tarif-mask-detail',
    templateUrl: './tarif-mask-detail.component.html'
})
export class TarifMaskDetailComponent implements OnInit {
    tarifMask: ITarifMask;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tarifMask }) => {
            this.tarifMask = tarifMask;
        });
    }

    previousState() {
        window.history.back();
    }
}
