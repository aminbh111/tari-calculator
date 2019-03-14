import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IMaxTarif } from 'app/shared/model/max-tarif.model';
import { MaxTarifService } from './max-tarif.service';

@Component({
    selector: 'jhi-max-tarif-update',
    templateUrl: './max-tarif-update.component.html'
})
export class MaxTarifUpdateComponent implements OnInit {
    maxTarif: IMaxTarif;
    isSaving: boolean;

    constructor(protected maxTarifService: MaxTarifService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ maxTarif }) => {
            this.maxTarif = maxTarif;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.maxTarif.id !== undefined) {
            this.subscribeToSaveResponse(this.maxTarifService.update(this.maxTarif));
        } else {
            this.subscribeToSaveResponse(this.maxTarifService.create(this.maxTarif));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaxTarif>>) {
        result.subscribe((res: HttpResponse<IMaxTarif>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
