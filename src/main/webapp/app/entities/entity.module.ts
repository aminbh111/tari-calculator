import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'tarif-mask',
                loadChildren: './tarif-mask/tarif-mask.module#TarifCalculatorTarifMaskModule'
            },
            {
                path: 'week-profile',
                loadChildren: './week-profile/week-profile.module#TarifCalculatorWeekProfileModule'
            },
            {
                path: 'day-profile',
                loadChildren: './day-profile/day-profile.module#TarifCalculatorDayProfileModule'
            },
            {
                path: 'step',
                loadChildren: './step/step.module#TarifCalculatorStepModule'
            },
            {
                path: 'max-tarif',
                loadChildren: './max-tarif/max-tarif.module#TarifCalculatorMaxTarifModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TarifCalculatorEntityModule {}
