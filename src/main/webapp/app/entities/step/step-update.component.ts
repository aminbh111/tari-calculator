import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IStep } from 'app/shared/model/step.model';
import { StepService } from './step.service';

@Component({
    selector: 'jhi-step-update',
    templateUrl: './step-update.component.html'
})
export class StepUpdateComponent implements OnInit {
    step: IStep;
    isSaving: boolean;

    constructor(protected stepService: StepService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ step }) => {
            this.step = step;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.step.id !== undefined) {
            this.subscribeToSaveResponse(this.stepService.update(this.step));
        } else {
            this.subscribeToSaveResponse(this.stepService.create(this.step));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IStep>>) {
        result.subscribe((res: HttpResponse<IStep>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
