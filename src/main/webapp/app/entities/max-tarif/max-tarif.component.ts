import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMaxTarif } from 'app/shared/model/max-tarif.model';
import { AccountService } from 'app/core';
import { MaxTarifService } from './max-tarif.service';

@Component({
    selector: 'jhi-max-tarif',
    templateUrl: './max-tarif.component.html'
})
export class MaxTarifComponent implements OnInit, OnDestroy {
    maxTarifs: IMaxTarif[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected maxTarifService: MaxTarifService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.maxTarifService
            .query()
            .pipe(
                filter((res: HttpResponse<IMaxTarif[]>) => res.ok),
                map((res: HttpResponse<IMaxTarif[]>) => res.body)
            )
            .subscribe(
                (res: IMaxTarif[]) => {
                    this.maxTarifs = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMaxTarifs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMaxTarif) {
        return item.id;
    }

    registerChangeInMaxTarifs() {
        this.eventSubscriber = this.eventManager.subscribe('maxTarifListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
