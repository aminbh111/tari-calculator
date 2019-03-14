import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDayProfile } from 'app/shared/model/day-profile.model';

type EntityResponseType = HttpResponse<IDayProfile>;
type EntityArrayResponseType = HttpResponse<IDayProfile[]>;

@Injectable({ providedIn: 'root' })
export class DayProfileService {
    public resourceUrl = SERVER_API_URL + 'api/day-profiles';

    constructor(protected http: HttpClient) {}

    create(dayProfile: IDayProfile): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(dayProfile);
        return this.http
            .post<IDayProfile>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(dayProfile: IDayProfile): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(dayProfile);
        return this.http
            .put<IDayProfile>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IDayProfile>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IDayProfile[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(dayProfile: IDayProfile): IDayProfile {
        const copy: IDayProfile = Object.assign({}, dayProfile, {
            fromTime: dayProfile.fromTime != null && dayProfile.fromTime.isValid() ? dayProfile.fromTime.toJSON() : null,
            toTime: dayProfile.toTime != null && dayProfile.toTime.isValid() ? dayProfile.toTime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.fromTime = res.body.fromTime != null ? moment(res.body.fromTime) : null;
            res.body.toTime = res.body.toTime != null ? moment(res.body.toTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((dayProfile: IDayProfile) => {
                dayProfile.fromTime = dayProfile.fromTime != null ? moment(dayProfile.fromTime) : null;
                dayProfile.toTime = dayProfile.toTime != null ? moment(dayProfile.toTime) : null;
            });
        }
        return res;
    }
}
