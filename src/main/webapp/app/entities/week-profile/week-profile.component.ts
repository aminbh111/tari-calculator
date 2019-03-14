import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWeekProfile } from 'app/shared/model/week-profile.model';
import { AccountService } from 'app/core';
import { WeekProfileService } from './week-profile.service';

@Component({
    selector: 'jhi-week-profile',
    templateUrl: './week-profile.component.html'
})
export class WeekProfileComponent implements OnInit, OnDestroy {
    weekProfiles: IWeekProfile[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected weekProfileService: WeekProfileService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.weekProfileService
            .query()
            .pipe(
                filter((res: HttpResponse<IWeekProfile[]>) => res.ok),
                map((res: HttpResponse<IWeekProfile[]>) => res.body)
            )
            .subscribe(
                (res: IWeekProfile[]) => {
                    this.weekProfiles = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWeekProfiles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWeekProfile) {
        return item.id;
    }

    registerChangeInWeekProfiles() {
        this.eventSubscriber = this.eventManager.subscribe('weekProfileListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
