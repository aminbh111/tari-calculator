/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { DayProfileService } from 'app/entities/day-profile/day-profile.service';
import { IDayProfile, DayProfile, WeekDay } from 'app/shared/model/day-profile.model';

describe('Service Tests', () => {
    describe('DayProfile Service', () => {
        let injector: TestBed;
        let service: DayProfileService;
        let httpMock: HttpTestingController;
        let elemDefault: IDayProfile;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(DayProfileService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new DayProfile(0, WeekDay.Sunday, currentDate, currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        fromTime: currentDate.format(DATE_TIME_FORMAT),
                        toTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a DayProfile', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        fromTime: currentDate.format(DATE_TIME_FORMAT),
                        toTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        fromTime: currentDate,
                        toTime: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new DayProfile(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a DayProfile', async () => {
                const returnedFromService = Object.assign(
                    {
                        weekday: 'BBBBBB',
                        fromTime: currentDate.format(DATE_TIME_FORMAT),
                        toTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        fromTime: currentDate,
                        toTime: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of DayProfile', async () => {
                const returnedFromService = Object.assign(
                    {
                        weekday: 'BBBBBB',
                        fromTime: currentDate.format(DATE_TIME_FORMAT),
                        toTime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        fromTime: currentDate,
                        toTime: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a DayProfile', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
