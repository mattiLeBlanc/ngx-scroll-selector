import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollSelectorColummComponent, ScrollSelectorColummTitleComponent, ScrollSelectorComponent, ScrollSelectorIconComponent, ScrollSelectorItemComponent } from './scroll-selector.component';



@NgModule({
  declarations: [
    ScrollSelectorColummComponent,
    ScrollSelectorColummTitleComponent,
    ScrollSelectorComponent,
    ScrollSelectorIconComponent,
    ScrollSelectorItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScrollSelectorColummComponent,
    ScrollSelectorColummTitleComponent,
    ScrollSelectorComponent,
    ScrollSelectorIconComponent,
    ScrollSelectorItemComponent
  ]
})
export class NgXScrollSelectorModule { }
