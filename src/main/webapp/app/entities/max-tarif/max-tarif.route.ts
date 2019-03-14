import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { MaxTarif } from 'app/shared/model/max-tarif.model';
import { MaxTarifService } from './max-tarif.service';
import { MaxTarifComponent } from './max-tarif.component';
import { MaxTarifDetailComponent } from './max-tarif-detail.component';
import { MaxTarifUpdateComponent } from './max-tarif-update.component';
import { MaxTarifDeletePopupComponent } from './max-tarif-delete-dialog.component';
import { IMaxTarif } from 'app/shared/model/max-tarif.model';

@Injectable({ providedIn: 'root' })
export class MaxTarifResolve implements Resolve<IMaxTarif> {
    constructor(private service: MaxTarifService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMaxTarif> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<MaxTarif>) => response.ok),
                map((maxTarif: HttpResponse<MaxTarif>) => maxTarif.body)
            );
        }
        return of(new MaxTarif());
    }
}

export const maxTarifRoute: Routes = [
    {
        path: '',
        component: MaxTarifComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MaxTarifs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: MaxTarifDetailComponent,
        resolve: {
            maxTarif: MaxTarifResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MaxTarifs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: MaxTarifUpdateComponent,
        resolve: {
            maxTarif: MaxTarifResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MaxTarifs'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: MaxTarifUpdateComponent,
        resolve: {
            maxTarif: MaxTarifResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MaxTarifs'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const maxTarifPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: MaxTarifDeletePopupComponent,
        resolve: {
            maxTarif: MaxTarifResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MaxTarifs'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
