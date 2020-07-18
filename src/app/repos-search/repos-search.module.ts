import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ReposSearchComponent } from './repos-search.component';


@NgModule({
  declarations: [ReposSearchComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: ReposSearchComponent }
    ]),
    CommonModule
  ]
})
export class ReposSearchModule { }
