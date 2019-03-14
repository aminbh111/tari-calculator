import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TarifCalculatorSharedModule } from 'app/shared';
import {
    DayProfileComponent,
    DayProfileDetailComponent,
    DayProfileUpdateComponent,
    DayProfileDeletePopupComponent,
    DayProfileDeleteDialogComponent,
    dayProfileRoute,
    dayProfilePopupRoute
} from './';

const ENTITY_STATES = [...dayProfileRoute, ...dayProfilePopupRoute];

@NgModule({
    imports: [TarifCalculatorSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DayProfileComponent,
        DayProfileDetailComponent,
        DayProfileUpdateComponent,
        DayProfileDeleteDialogComponent,
        DayProfileDeletePopupComponent
    ],
    entryComponents: [DayProfileComponent, DayProfileUpdateComponent, DayProfileDeleteDialogComponent, DayProfileDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TarifCalculatorDayProfileModule {}
