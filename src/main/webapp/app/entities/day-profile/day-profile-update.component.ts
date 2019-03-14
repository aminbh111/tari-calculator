import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IDayProfile } from 'app/shared/model/day-profile.model';
import { DayProfileService } from './day-profile.service';

@Component({
    selector: 'jhi-day-profile-update',
    templateUrl: './day-profile-update.component.html'
})
export class DayProfileUpdateComponent implements OnInit {
    dayProfile: IDayProfile;
    isSaving: boolean;
    fromTime: string;
    toTime: string;

    constructor(protected dayProfileService: DayProfileService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ dayProfile }) => {
            this.dayProfile = dayProfile;
            this.fromTime = this.dayProfile.fromTime != null ? this.dayProfile.fromTime.format(DATE_TIME_FORMAT) : null;
            this.toTime = this.dayProfile.toTime != null ? this.dayProfile.toTime.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.dayProfile.fromTime = this.fromTime != null ? moment(this.fromTime, DATE_TIME_FORMAT) : null;
        this.dayProfile.toTime = this.toTime != null ? moment(this.toTime, DATE_TIME_FORMAT) : null;
        if (this.dayProfile.id !== undefined) {
            this.subscribeToSaveResponse(this.dayProfileService.update(this.dayProfile));
        } else {
            this.subscribeToSaveResponse(this.dayProfileService.create(this.dayProfile));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDayProfile>>) {
        result.subscribe((res: HttpResponse<IDayProfile>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
