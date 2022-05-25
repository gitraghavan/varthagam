import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { itradeRoutes } from './itrade.routes';

import { DashboardComponent } from './itrade.index';

@NgModule ({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild (itradeRoutes)
    ],
    declarations: [
        DashboardComponent
    ]
})
export class ItradeAppModule { }
