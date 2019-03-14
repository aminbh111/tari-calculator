import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TarifCalculatorSharedModule } from 'app/shared';
import {
    WeekProfileComponent,
    WeekProfileDetailComponent,
    WeekProfileUpdateComponent,
    WeekProfileDeletePopupComponent,
    WeekProfileDeleteDialogComponent,
    weekProfileRoute,
    weekProfilePopupRoute
} from './';

const ENTITY_STATES = [...weekProfileRoute, ...weekProfilePopupRoute];

@NgModule({
    imports: [TarifCalculatorSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WeekProfileComponent,
        WeekProfileDetailComponent,
        WeekProfileUpdateComponent,
        WeekProfileDeleteDialogComponent,
        WeekProfileDeletePopupComponent
    ],
    entryComponents: [WeekProfileComponent, WeekProfileUpdateComponent, WeekProfileDeleteDialogComponent, WeekProfileDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TarifCalculatorWeekProfileModule {}
