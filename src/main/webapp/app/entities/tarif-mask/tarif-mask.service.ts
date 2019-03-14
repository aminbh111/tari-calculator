import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITarifMask } from 'app/shared/model/tarif-mask.model';

type EntityResponseType = HttpResponse<ITarifMask>;
type EntityArrayResponseType = HttpResponse<ITarifMask[]>;

@Injectable({ providedIn: 'root' })
export class TarifMaskService {
    public resourceUrl = SERVER_API_URL + 'api/tarif-masks';

    constructor(protected http: HttpClient) {}

    create(tarifMask: ITarifMask): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tarifMask);
        return this.http
            .post<ITarifMask>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(tarifMask: ITarifMask): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tarifMask);
        return this.http
            .put<ITarifMask>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITarifMask>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITarifMask[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(tarifMask: ITarifMask): ITarifMask {
        const copy: ITarifMask = Object.assign({}, tarifMask, {
            validFrom: tarifMask.validFrom != null && tarifMask.validFrom.isValid() ? tarifMask.validFrom.format(DATE_FORMAT) : null,
            validTo: tarifMask.validTo != null && tarifMask.validTo.isValid() ? tarifMask.validTo.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.validFrom = res.body.validFrom != null ? moment(res.body.validFrom) : null;
            res.body.validTo = res.body.validTo != null ? moment(res.body.validTo) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((tarifMask: ITarifMask) => {
                tarifMask.validFrom = tarifMask.validFrom != null ? moment(tarifMask.validFrom) : null;
                tarifMask.validTo = tarifMask.validTo != null ? moment(tarifMask.validTo) : null;
            });
        }
        return res;
    }
}
