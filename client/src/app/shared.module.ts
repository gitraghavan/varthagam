import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialModule } from './varthagam.material.module';

import { LoadingModal } from "./index";

import { LoadingService } from "./commonServices/index";

@NgModule ({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [
        LoadingModal
    ],
    exports: [
        LoadingModal
    ],
    providers: [
        LoadingService
    ]
})
export class SharedModule { }
