/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TarifCalculatorTestModule } from '../../../test.module';
import { WeekProfileUpdateComponent } from 'app/entities/week-profile/week-profile-update.component';
import { WeekProfileService } from 'app/entities/week-profile/week-profile.service';
import { WeekProfile } from 'app/shared/model/week-profile.model';

describe('Component Tests', () => {
    describe('WeekProfile Management Update Component', () => {
        let comp: WeekProfileUpdateComponent;
        let fixture: ComponentFixture<WeekProfileUpdateComponent>;
        let service: WeekProfileService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TarifCalculatorTestModule],
                declarations: [WeekProfileUpdateComponent]
            })
                .overrideTemplate(WeekProfileUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WeekProfileUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeekProfileService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new WeekProfile(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.weekProfile = entity;
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
                    const entity = new WeekProfile();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.weekProfile = entity;
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
