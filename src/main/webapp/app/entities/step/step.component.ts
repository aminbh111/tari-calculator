import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStep } from 'app/shared/model/step.model';
import { AccountService } from 'app/core';
import { StepService } from './step.service';

@Component({
    selector: 'jhi-step',
    templateUrl: './step.component.html'
})
export class StepComponent implements OnInit, OnDestroy {
    steps: IStep[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected stepService: StepService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.stepService
            .query()
            .pipe(
                filter((res: HttpResponse<IStep[]>) => res.ok),
                map((res: HttpResponse<IStep[]>) => res.body)
            )
            .subscribe(
                (res: IStep[]) => {
                    this.steps = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSteps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStep) {
        return item.id;
    }

    registerChangeInSteps() {
        this.eventSubscriber = this.eventManager.subscribe('stepListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}