import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { WeekProfile } from 'app/shared/model/week-profile.model';
import { WeekProfileService } from './week-profile.service';
import { WeekProfileComponent } from './week-profile.component';
import { WeekProfileDetailComponent } from './week-profile-detail.component';
import { WeekProfileUpdateComponent } from './week-profile-update.component';
import { WeekProfileDeletePopupComponent } from './week-profile-delete-dialog.component';
import { IWeekProfile } from 'app/shared/model/week-profile.model';

@Injectable({ providedIn: 'root' })
export class WeekProfileResolve implements Resolve<IWeekProfile> {
    constructor(private service: WeekProfileService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IWeekProfile> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<WeekProfile>) => response.ok),
                map((weekProfile: HttpResponse<WeekProfile>) => weekProfile.body)
            );
        }
        return of(new WeekProfile());
    }
}

export const weekProfileRoute: Routes = [
    {
        path: '',
        component: WeekProfileComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WeekProfiles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: WeekProfileDetailComponent,
        resolve: {
            weekProfile: WeekProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WeekProfiles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: WeekProfileUpdateComponent,
        resolve: {
            weekProfile: WeekProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WeekProfiles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: WeekProfileUpdateComponent,
        resolve: {
            weekProfile: WeekProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WeekProfiles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const weekProfilePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: WeekProfileDeletePopupComponent,
        resolve: {
            weekProfile: WeekProfileResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WeekProfiles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
