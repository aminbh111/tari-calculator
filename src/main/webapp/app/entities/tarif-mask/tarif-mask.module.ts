import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TarifCalculatorSharedModule } from 'app/shared';
import {
    TarifMaskComponent,
    TarifMaskDetailComponent,
    TarifMaskUpdateComponent,
    TarifMaskDeletePopupComponent,
    TarifMaskDeleteDialogComponent,
    tarifMaskRoute,
    tarifMaskPopupRoute
} from './';

const ENTITY_STATES = [...tarifMaskRoute, ...tarifMaskPopupRoute];

@NgModule({
    imports: [TarifCalculatorSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TarifMaskComponent,
        TarifMaskDetailComponent,
        TarifMaskUpdateComponent,
        TarifMaskDeleteDialogComponent,
        TarifMaskDeletePopupComponent
    ],
    entryComponents: [TarifMaskComponent, TarifMaskUpdateComponent, TarifMaskDeleteDialogComponent, TarifMaskDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TarifCalculatorTarifMaskModule {}
