/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TarifCalculatorTestModule } from '../../../test.module';
import { WeekProfileComponent } from 'app/entities/week-profile/week-profile.component';
import { WeekProfileService } from 'app/entities/week-profile/week-profile.service';
import { WeekProfile } from 'app/shared/model/week-profile.model';

describe('Component Tests', () => {
    describe('WeekProfile Management Component', () => {
        let comp: WeekProfileComponent;
        let fixture: ComponentFixture<WeekProfileComponent>;
        let service: WeekProfileService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TarifCalculatorTestModule],
                declarations: [WeekProfileComponent],
                providers: []
            })
                .overrideTemplate(WeekProfileComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WeekProfileComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WeekProfileService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new WeekProfile(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.weekProfiles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
