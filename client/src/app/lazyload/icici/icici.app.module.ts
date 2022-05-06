import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { iciciRoutes } from './icici.routes';

import { DashboardComponent } from './icici.index';

@NgModule ({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild (iciciRoutes)
    ],
    declarations: [
        DashboardComponent
    ]
})
export class ICICIAppModule { }
