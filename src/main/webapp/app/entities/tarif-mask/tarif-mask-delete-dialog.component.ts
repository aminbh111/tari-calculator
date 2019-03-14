import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITarifMask } from 'app/shared/model/tarif-mask.model';
import { TarifMaskService } from './tarif-mask.service';

@Component({
    selector: 'jhi-tarif-mask-delete-dialog',
    templateUrl: './tarif-mask-delete-dialog.component.html'
})
export class TarifMaskDeleteDialogComponent {
    tarifMask: ITarifMask;

    constructor(
        protected tarifMaskService: TarifMaskService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tarifMaskService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tarifMaskListModification',
                content: 'Deleted an tarifMask'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tarif-mask-delete-popup',
    template: ''
})
export class TarifMaskDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tarifMask }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TarifMaskDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.tarifMask = tarifMask;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/tarif-mask', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/tarif-mask', { outlets: { popup: null } }]);
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
