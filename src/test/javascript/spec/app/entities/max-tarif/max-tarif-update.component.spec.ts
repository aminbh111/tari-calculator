/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TarifCalculatorTestModule } from '../../../test.module';
import { MaxTarifUpdateComponent } from 'app/entities/max-tarif/max-tarif-update.component';
import { MaxTarifService } from 'app/entities/max-tarif/max-tarif.service';
import { MaxTarif } from 'app/shared/model/max-tarif.model';

describe('Component Tests', () => {
    describe('MaxTarif Management Update Component', () => {
        let comp: MaxTarifUpdateComponent;
        let fixture: ComponentFixture<MaxTarifUpdateComponent>;
        let service: MaxTarifService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TarifCalculatorTestModule],
                declarations: [MaxTarifUpdateComponent]
            })
                .overrideTemplate(MaxTarifUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MaxTarifUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaxTarifService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MaxTarif(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.maxTarif = entity;
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
                    const entity = new MaxTarif();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.maxTarif = entity;
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
