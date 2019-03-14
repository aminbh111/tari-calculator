import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWeekProfile } from 'app/shared/model/week-profile.model';

@Component({
    selector: 'jhi-week-profile-detail',
    templateUrl: './week-profile-detail.component.html'
})
export class WeekProfileDetailComponent implements OnInit {
    weekProfile: IWeekProfile;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ weekProfile }) => {
            this.weekProfile = weekProfile;
        });
    }

    previousState() {
        window.history.back();
    }
}
