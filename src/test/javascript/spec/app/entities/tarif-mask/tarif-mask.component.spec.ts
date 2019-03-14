/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TarifCalculatorTestModule } from '../../../test.module';
import { TarifMaskComponent } from 'app/entities/tarif-mask/tarif-mask.component';
import { TarifMaskService } from 'app/entities/tarif-mask/tarif-mask.service';
import { TarifMask } from 'app/shared/model/tarif-mask.model';

describe('Component Tests', () => {
    describe('TarifMask Management Component', () => {
        let comp: TarifMaskComponent;
        let fixture: ComponentFixture<TarifMaskComponent>;
        let service: TarifMaskService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TarifCalculatorTestModule],
                declarations: [TarifMaskComponent],
                providers: []
            })
                .overrideTemplate(TarifMaskComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TarifMaskComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TarifMaskService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TarifMask(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tarifMasks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
