import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDayProfile } from 'app/shared/model/day-profile.model';
import { DayProfileService } from './day-profile.service';

@Component({
    selector: 'jhi-day-profile-delete-dialog',
    templateUrl: './day-profile-delete-dialog.component.html'
})
export class DayProfileDeleteDialogComponent {
    dayProfile: IDayProfile;

    constructor(
        protected dayProfileService: DayProfileService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dayProfileService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'dayProfileListModification',
                content: 'Deleted an dayProfile'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-day-profile-delete-popup',
    template: ''
})
export class DayProfileDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dayProfile }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DayProfileDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.dayProfile = dayProfile;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/day-profile', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/day-profile', { outlets: { popup: null } }]);
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
