import { NgModule } from '@angular/core';

import { TarifCalculatorSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [TarifCalculatorSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [TarifCalculatorSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class TarifCalculatorSharedCommonModule {}
