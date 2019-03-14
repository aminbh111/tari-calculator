import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITarifMask } from 'app/shared/model/tarif-mask.model';
import { AccountService } from 'app/core';
import { TarifMaskService } from './tarif-mask.service';

@Component({
    selector: 'jhi-tarif-mask',
    templateUrl: './tarif-mask.component.html'
})
export class TarifMaskComponent implements OnInit, OnDestroy {
    tarifMasks: ITarifMask[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected tarifMaskService: TarifMaskService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.tarifMaskService
            .query()
            .pipe(
                filter((res: HttpResponse<ITarifMask[]>) => res.ok),
                map((res: HttpResponse<ITarifMask[]>) => res.body)
            )
            .subscribe(
                (res: ITarifMask[]) => {
                    this.tarifMasks = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTarifMasks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITarifMask) {
        return item.id;
    }

    registerChangeInTarifMasks() {
        this.eventSubscriber = this.eventManager.subscribe('tarifMaskListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
