/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TarifCalculatorTestModule } from '../../../test.module';
import { DayProfileUpdateComponent } from 'app/entities/day-profile/day-profile-update.component';
import { DayProfileService } from 'app/entities/day-profile/day-profile.service';
import { DayProfile } from 'app/shared/model/day-profile.model';

describe('Component Tests', () => {
    describe('DayProfile Management Update Component', () => {
        let comp: DayProfileUpdateComponent;
        let fixture: ComponentFixture<DayProfileUpdateComponent>;
        let service: DayProfileService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TarifCalculatorTestModule],
                declarations: [DayProfileUpdateComponent]
            })
                .overrideTemplate(DayProfileUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DayProfileUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DayProfileService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new DayProfile(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dayProfile = entity;
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
                    const entity = new DayProfile();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dayProfile = entity;
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
