import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMaxTarif } from 'app/shared/model/max-tarif.model';
import { MaxTarifService } from './max-tarif.service';

@Component({
    selector: 'jhi-max-tarif-delete-dialog',
    templateUrl: './max-tarif-delete-dialog.component.html'
})
export class MaxTarifDeleteDialogComponent {
    maxTarif: IMaxTarif;

    constructor(protected maxTarifService: MaxTarifService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.maxTarifService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'maxTarifListModification',
                content: 'Deleted an maxTarif'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-max-tarif-delete-popup',
    template: ''
})
export class MaxTarifDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ maxTarif }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MaxTarifDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.maxTarif = maxTarif;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/max-tarif', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/max-tarif', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
