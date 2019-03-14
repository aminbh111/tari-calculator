/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TarifCalculatorTestModule } from '../../../test.module';
import { TarifMaskUpdateComponent } from 'app/entities/tarif-mask/tarif-mask-update.component';
import { TarifMaskService } from 'app/entities/tarif-mask/tarif-mask.service';
import { TarifMask } from 'app/shared/model/tarif-mask.model';

describe('Component Tests', () => {
    describe('TarifMask Management Update Component', () => {
        let comp: TarifMaskUpdateComponent;
        let fixture: ComponentFixture<TarifMaskUpdateComponent>;
        let service: TarifMaskService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TarifCalculatorTestModule],
                declarations: [TarifMaskUpdateComponent]
            })
                .overrideTemplate(TarifMaskUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TarifMaskUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TarifMaskService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TarifMask(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tarifMask = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TarifMask();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tarifMask = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
