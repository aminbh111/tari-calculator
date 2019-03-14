import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DayProfile } from 'app/shared/model/day-profile.model';
import { DayProfileService } from './day-profile.service';
import { DayProfileComponent } from './day-profile.component';
import { DayProfileDetailComponent } from './day-profile-detail.component';
import { DayProfileUpdateComponent } from './day-profile-update.component';
import { DayProfileDeletePopupComponent } from './day-profile-delete-dialog.component';
import { IDayProfile } from 'app/shared/model/day-profile.model';

@Injectable({ providedIn: 'root' })
export class DayProfileResolve implements Resolve<IDayProfile> {
    constructor(private service: DayProfileService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDayProfile> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<DayProfile>) => response.ok),
                map((dayProfile: HttpResponse<DayProfile>) => dayProfile.body)
            );
        }
        return of(new DayProfile());
    }
}

export const dayProfileRoute: Routes = [
    {
        path: '',
        component: DayProfileComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DayProfiles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DayProfileDetailComponent,
        resolve: {
            dayProfile: DayProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DayProfiles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DayProfileUpdateComponent,
        resolve: {
            dayProfile: DayProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DayProfiles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DayProfileUpdateComponent,
        resolve: {
            dayProfile: DayProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DayProfiles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dayProfilePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DayProfileDeletePopupComponent,
        resolve: {
            dayProfile: DayProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DayProfiles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
