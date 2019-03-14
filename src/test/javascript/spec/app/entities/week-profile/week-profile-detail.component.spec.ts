/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TarifCalculatorTestModule } from '../../../test.module';
import { WeekProfileDetailComponent } from 'app/entities/week-profile/week-profile-detail.component';
import { WeekProfile } from 'app/shared/model/week-profile.model';

describe('Component Tests', () => {
    describe('WeekProfile Management Detail Component', () => {
        let comp: WeekProfileDetailComponent;
        let fixture: ComponentFixture<WeekProfileDetailComponent>;
        const route = ({ data: of({ weekProfile: new WeekProfile(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TarifCalculatorTestModule],
                declarations: [WeekProfileDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WeekProfileDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WeekProfileDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.weekProfile).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
