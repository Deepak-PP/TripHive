// shared.module.ts
import { NgModule } from '@angular/core';

import { appImageFileValidator } from '../directives/fileValidation.directive';
import { appNoLeadingSpace } from '../directives/trimValidation.directive';

@NgModule({
  declarations: [appNoLeadingSpace, appImageFileValidator],
  exports: [appNoLeadingSpace,appImageFileValidator],
})
export class SharedModule {}
