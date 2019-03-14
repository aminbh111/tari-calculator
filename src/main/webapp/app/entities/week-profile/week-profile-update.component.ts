import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IWeekProfile } from 'app/shared/model/week-profile.model';
import { WeekProfileService } from './week-profile.service';
import { ITarifMask } from 'app/shared/model/tarif-mask.model';
import { TarifMaskService } from 'app/entities/tarif-mask';
import { IDayProfile } from 'app/shared/model/day-profile.model';
import { DayProfileService } from 'app/entities/day-profile';

@Component({
    selector: 'jhi-week-profile-update',
    templateUrl: './week-profile-update.component.html'
})
export class WeekProfileUpdateComponent implements OnInit {
    weekProfile: IWeekProfile;
    isSaving: boolean;

    tarifmasks: ITarifMask[];

    dayprofiles: IDayProfile[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected weekProfileService: WeekProfileService,
        protected tarifMaskService: TarifMaskService,
        protected dayProfileService: DayProfileService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ weekProfile }) => {
            this.weekProfile = weekProfile;
        });
        this.tarifMaskService
            .query({ filter: 'weekprofile-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ITarifMask[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITarifMask[]>) => response.body)
            )
            .subscribe(
                (res: ITarifMask[]) => {
                    if (!this.weekProfile.tarifMask || !this.weekProfile.tarifMask.id) {
                        this.tarifmasks = res;
                    } else {
                        this.tarifMaskService
                            .find(this.weekProfile.tarifMask.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ITarifMask>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ITarifMask>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ITarifMask) => (this.tarifmasks = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.dayProfileService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IDayProfile[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDayProfile[]>) => response.body)
            )
            .subscribe((res: IDayProfile[]) => (this.dayprofiles = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.weekProfile.id !== undefined) {
            this.subscribeToSaveResponse(this.weekProfileService.update(this.weekProfile));
        } else {
            this.subscribeToSaveResponse(this.weekProfileService.create(this.weekProfile));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IWeekProfile>>) {
        result.subscribe((res: HttpResponse<IWeekProfile>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTarifMaskById(index: number, item: ITarifMask) {
        return item.id;
    }

    trackDayProfileById(index: number, item: IDayProfile) {
        return item.id;
    }
}
