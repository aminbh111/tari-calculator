import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TarifCalculatorSharedModule } from 'app/shared';
import {
    MaxTarifComponent,
    MaxTarifDetailComponent,
    MaxTarifUpdateComponent,
    MaxTarifDeletePopupComponent,
    MaxTarifDeleteDialogComponent,
    maxTarifRoute,
    maxTarifPopupRoute
} from './';

const ENTITY_STATES = [...maxTarifRoute, ...maxTarifPopupRoute];

@NgModule({
    imports: [TarifCalculatorSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MaxTarifComponent,
        MaxTarifDetailComponent,
        MaxTarifUpdateComponent,
        MaxTarifDeleteDialogComponent,
        MaxTarifDeletePopupComponent
    ],
    entryComponents: [MaxTarifComponent, MaxTarifUpdateComponent, MaxTarifDeleteDialogComponent, MaxTarifDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TarifCalculatorMaxTarifModule {}
