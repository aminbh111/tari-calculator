/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TarifCalculatorTestModule } from '../../../test.module';
import { DayProfileDetailComponent } from 'app/entities/day-profile/day-profile-detail.component';
import { DayProfile } from 'app/shared/model/day-profile.model';

describe('Component Tests', () => {
    describe('DayProfile Management Detail Component', () => {
        let comp: DayProfileDetailComponent;
        let fixture: ComponentFixture<DayProfileDetailComponent>;
        const route = ({ data: of({ dayProfile: new DayProfile(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TarifCalculatorTestModule],
                declarations: [DayProfileDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DayProfileDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DayProfileDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.dayProfile).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
