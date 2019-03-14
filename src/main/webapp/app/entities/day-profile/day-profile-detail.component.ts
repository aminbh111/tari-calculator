import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDayProfile } from 'app/shared/model/day-profile.model';

@Component({
    selector: 'jhi-day-profile-detail',
    templateUrl: './day-profile-detail.component.html'
})
export class DayProfileDetailComponent implements OnInit {
    dayProfile: IDayProfile;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dayProfile }) => {
            this.dayProfile = dayProfile;
        });
    }

    previousState() {
        window.history.back();
    }
}
