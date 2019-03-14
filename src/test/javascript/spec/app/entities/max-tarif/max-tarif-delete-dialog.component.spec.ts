/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TarifCalculatorTestModule } from '../../../test.module';
import { MaxTarifDeleteDialogComponent } from 'app/entities/max-tarif/max-tarif-delete-dialog.component';
import { MaxTarifService } from 'app/entities/max-tarif/max-tarif.service';

describe('Component Tests', () => {
    describe('MaxTarif Management Delete Component', () => {
        let comp: MaxTarifDeleteDialogComponent;
        let fixture: ComponentFixture<MaxTarifDeleteDialogComponent>;
        let service: MaxTarifService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TarifCalculatorTestModule],
                declarations: [MaxTarifDeleteDialogComponent]
            })
                .overrideTemplate(MaxTarifDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MaxTarifDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaxTarifService);
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
