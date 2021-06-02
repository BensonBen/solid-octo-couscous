import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RexComponent } from './rex/rex.component';

@NgModule({
  imports: [CommonModule],
  declarations: [RexComponent],
  exports: [RexComponent],
})
export class UiModule {}
