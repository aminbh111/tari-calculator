import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ITarifMask } from 'app/shared/model/tarif-mask.model';
import { TarifMaskService } from './tarif-mask.service';
import { IStep } from 'app/shared/model/step.model';
import { StepService } from 'app/entities/step';
import { IMaxTarif } from 'app/shared/model/max-tarif.model';
import { MaxTarifService } from 'app/entities/max-tarif';

@Component({
    selector: 'jhi-tarif-mask-update',
    templateUrl: './tarif-mask-update.component.html'
})
export class TarifMaskUpdateComponent implements OnInit {
    tarifMask: ITarifMask;
    isSaving: boolean;

    steps: IStep[];

    maxtarifs: IMaxTarif[];
    validFromDp: any;
    validToDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected tarifMaskService: TarifMaskService,
        protected stepService: StepService,
        protected maxTarifService: MaxTarifService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tarifMask }) => {
            this.tarifMask = tarifMask;
        });
        this.stepService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IStep[]>) => mayBeOk.ok),
                map((response: HttpResponse<IStep[]>) => response.body)
            )
            .subscribe((res: IStep[]) => (this.steps = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.maxTarifService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMaxTarif[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMaxTarif[]>) => response.body)
            )
            .subscribe((res: IMaxTarif[]) => (this.maxtarifs = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tarifMask.id !== undefined) {
            this.subscribeToSaveResponse(this.tarifMaskService.update(this.tarifMask));
        } else {
            this.subscribeToSaveResponse(this.tarifMaskService.create(this.tarifMask));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITarifMask>>) {
        result.subscribe((res: HttpResponse<ITarifMask>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackStepById(index: number, item: IStep) {
        return item.id;
    }

    trackMaxTarifById(index: number, item: IMaxTarif) {
        return item.id;
    }
}
