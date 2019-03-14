import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWeekProfile } from 'app/shared/model/week-profile.model';

type EntityResponseType = HttpResponse<IWeekProfile>;
type EntityArrayResponseType = HttpResponse<IWeekProfile[]>;

@Injectable({ providedIn: 'root' })
export class WeekProfileService {
    public resourceUrl = SERVER_API_URL + 'api/week-profiles';

    constructor(protected http: HttpClient) {}

    create(weekProfile: IWeekProfile): Observable<EntityResponseType> {
        return this.http.post<IWeekProfile>(this.resourceUrl, weekProfile, { observe: 'response' });
    }

    update(weekProfile: IWeekProfile): Observable<EntityResponseType> {
        return this.http.put<IWeekProfile>(this.resourceUrl, weekProfile, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IWeekProfile>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IWeekProfile[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
