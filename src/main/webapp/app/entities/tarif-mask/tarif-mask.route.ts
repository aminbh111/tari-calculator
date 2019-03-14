import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TarifMask } from 'app/shared/model/tarif-mask.model';
import { TarifMaskService } from './tarif-mask.service';
import { TarifMaskComponent } from './tarif-mask.component';
import { TarifMaskDetailComponent } from './tarif-mask-detail.component';
import { TarifMaskUpdateComponent } from './tarif-mask-update.component';
import { TarifMaskDeletePopupComponent } from './tarif-mask-delete-dialog.component';
import { ITarifMask } from 'app/shared/model/tarif-mask.model';

@Injectable({ providedIn: 'root' })
export class TarifMaskResolve implements Resolve<ITarifMask> {
    constructor(private service: TarifMaskService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITarifMask> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TarifMask>) => response.ok),
                map((tarifMask: HttpResponse<TarifMask>) => tarifMask.body)
            );
        }
        return of(new TarifMask());
    }
}

export const tarifMaskRoute: Routes = [
    {
        path: '',
        component: TarifMaskComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TarifMasks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TarifMaskDetailComponent,
        resolve: {
            tarifMask: TarifMaskResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TarifMasks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TarifMaskUpdateComponent,
        resolve: {
            tarifMask: TarifMaskResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TarifMasks'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TarifMaskUpdateComponent,
        resolve: {
            tarifMask: TarifMaskResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TarifMasks'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tarifMaskPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TarifMaskDeletePopupComponent,
        resolve: {
            tarifMask: TarifMaskResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TarifMasks'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
