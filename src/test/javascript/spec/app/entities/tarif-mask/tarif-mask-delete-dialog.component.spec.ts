/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TarifCalculatorTestModule } from '../../../test.module';
import { TarifMaskDeleteDialogComponent } from 'app/entities/tarif-mask/tarif-mask-delete-dialog.component';
import { TarifMaskService } from 'app/entities/tarif-mask/tarif-mask.service';

describe('Component Tests', () => {
    describe('TarifMask Management Delete Component', () => {
        let comp: TarifMaskDeleteDialogComponent;
        let fixture: ComponentFixture<TarifMaskDeleteDialogComponent>;
        let service: TarifMaskService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TarifCalculatorTestModule],
                declarations: [TarifMaskDeleteDialogComponent]
            })
                .overrideTemplate(TarifMaskDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TarifMaskDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TarifMaskService);
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
