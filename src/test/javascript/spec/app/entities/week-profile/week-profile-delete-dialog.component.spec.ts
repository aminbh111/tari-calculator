/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TarifCalculatorTestModule } from '../../../test.module';
import { WeekProfileDeleteDialogComponent } from 'app/entities/week-profile/week-profile-delete-dialog.component';
import { WeekProfileService } from 'app/entities/week-profile/week-profile.service';

describe('Component Tests', () => {
    describe('WeekProfile Management Delete Component', () => {
        let comp: WeekProfileDeleteDialogComponent;
        let fixture: ComponentFixture<WeekProfileDeleteDialogComponent>;
        let service: WeekProfileService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TarifCalculatorTestModule],
                declarations: [WeekProfileDeleteDialogComponent]
            })
                .overrideTemplate(WeekProfileDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WeekProfileDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeekProfileService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
