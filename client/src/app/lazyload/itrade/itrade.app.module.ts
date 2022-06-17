import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../varthagam.material.module';

import { itradeRoutes } from './itrade.routes';

import { TradeSession, DashboardComponent,
    HeaderComponent, FooterComponent,
    BasicDashboardInfo, UserHoldings,
    ScripChart } from './itrade.index';

import { SessionActivateGuardService, DashboardActivateGuardService,
    SessionService, CustomerDetailsService,
    ChartServices, CustomerFundsService } from './itradeSharedServices';

@NgModule ({
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild (itradeRoutes),
        MaterialModule
    ],
    declarations: [
        TradeSession, DashboardComponent,
        HeaderComponent, FooterComponent,
        BasicDashboardInfo, UserHoldings,
        ScripChart
    ],
    providers: [
        SessionActivateGuardService, DashboardActivateGuardService,
        SessionService, CustomerDetailsService,
        ChartServices, CustomerFundsService
    ]
})
export class IcTradeAppModule { }
