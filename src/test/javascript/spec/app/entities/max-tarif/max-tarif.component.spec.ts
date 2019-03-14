/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TarifCalculatorTestModule } from '../../../test.module';
import { MaxTarifComponent } from 'app/entities/max-tarif/max-tarif.component';
import { MaxTarifService } from 'app/entities/max-tarif/max-tarif.service';
import { MaxTarif } from 'app/shared/model/max-tarif.model';

describe('Component Tests', () => {
    describe('MaxTarif Management Component', () => {
        let comp: MaxTarifComponent;
        let fixture: ComponentFixture<MaxTarifComponent>;
        let service: MaxTarifService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TarifCalculatorTestModule],
                declarations: [MaxTarifComponent],
                providers: []
            })
                .overrideTemplate(MaxTarifComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MaxTarifComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaxTarifService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MaxTarif(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.maxTarifs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
