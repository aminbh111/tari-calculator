/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TarifCalculatorTestModule } from '../../../test.module';
import { DayProfileComponent } from 'app/entities/day-profile/day-profile.component';
import { DayProfileService } from 'app/entities/day-profile/day-profile.service';
import { DayProfile } from 'app/shared/model/day-profile.model';

describe('Component Tests', () => {
    describe('DayProfile Management Component', () => {
        let comp: DayProfileComponent;
        let fixture: ComponentFixture<DayProfileComponent>;
        let service: DayProfileService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TarifCalculatorTestModule],
                declarations: [DayProfileComponent],
                providers: []
            })
                .overrideTemplate(DayProfileComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DayProfileComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DayProfileService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new DayProfile(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.dayProfiles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
