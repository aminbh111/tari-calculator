/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TarifCalculatorTestModule } from '../../../test.module';
import { TarifMaskDetailComponent } from 'app/entities/tarif-mask/tarif-mask-detail.component';
import { TarifMask } from 'app/shared/model/tarif-mask.model';

describe('Component Tests', () => {
    describe('TarifMask Management Detail Component', () => {
        let comp: TarifMaskDetailComponent;
        let fixture: ComponentFixture<TarifMaskDetailComponent>;
        const route = ({ data: of({ tarifMask: new TarifMask(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TarifCalculatorTestModule],
                declarations: [TarifMaskDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TarifMaskDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TarifMaskDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tarifMask).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
