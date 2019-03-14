/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TarifCalculatorTestModule } from '../../../test.module';
import { MaxTarifDetailComponent } from 'app/entities/max-tarif/max-tarif-detail.component';
import { MaxTarif } from 'app/shared/model/max-tarif.model';

describe('Component Tests', () => {
    describe('MaxTarif Management Detail Component', () => {
        let comp: MaxTarifDetailComponent;
        let fixture: ComponentFixture<MaxTarifDetailComponent>;
        const route = ({ data: of({ maxTarif: new MaxTarif(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TarifCalculatorTestModule],
                declarations: [MaxTarifDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MaxTarifDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MaxTarifDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.maxTarif).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
