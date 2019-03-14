import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMaxTarif } from 'app/shared/model/max-tarif.model';

type EntityResponseType = HttpResponse<IMaxTarif>;
type EntityArrayResponseType = HttpResponse<IMaxTarif[]>;

@Injectable({ providedIn: 'root' })
export class MaxTarifService {
    public resourceUrl = SERVER_API_URL + 'api/max-tarifs';

    constructor(protected http: HttpClient) {}

    create(maxTarif: IMaxTarif): Observable<EntityResponseType> {
        return this.http.post<IMaxTarif>(this.resourceUrl, maxTarif, { observe: 'response' });
    }

    update(maxTarif: IMaxTarif): Observable<EntityResponseType> {
        return this.http.put<IMaxTarif>(this.resourceUrl, maxTarif, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMaxTarif>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMaxTarif[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
