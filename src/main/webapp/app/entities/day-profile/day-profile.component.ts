import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDayProfile } from 'app/shared/model/day-profile.model';
import { AccountService } from 'app/core';
import { DayProfileService } from './day-profile.service';

@Component({
    selector: 'jhi-day-profile',
    templateUrl: './day-profile.component.html'
})
export class DayProfileComponent implements OnInit, OnDestroy {
    dayProfiles: IDayProfile[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected dayProfileService: DayProfileService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.dayProfileService
            .query()
            .pipe(
                filter((res: HttpResponse<IDayProfile[]>) => res.ok),
                map((res: HttpResponse<IDayProfile[]>) => res.body)
            )
            .subscribe(
                (res: IDayProfile[]) => {
                    this.dayProfiles = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDayProfiles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDayProfile) {
        return item.id;
    }

    registerChangeInDayProfiles() {
        this.eventSubscriber = this.eventManager.subscribe('dayProfileListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
