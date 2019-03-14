import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWeekProfile } from 'app/shared/model/week-profile.model';
import { WeekProfileService } from './week-profile.service';

@Component({
    selector: 'jhi-week-profile-delete-dialog',
    templateUrl: './week-profile-delete-dialog.component.html'
})
export class WeekProfileDeleteDialogComponent {
    weekProfile: IWeekProfile;

    constructor(
        protected weekProfileService: WeekProfileService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.weekProfileService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'weekProfileListModification',
                content: 'Deleted an weekProfile'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-week-profile-delete-popup',
    template: ''
})
export class WeekProfileDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ weekProfile }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(WeekProfileDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.weekProfile = weekProfile;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/week-profile', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/week-profile', { outlets: { popup: null } }]);
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
