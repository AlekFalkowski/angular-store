import {
    ChangeDetectionStrategy,
    Component, computed,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    Output,
    Signal,
    ViewEncapsulation
} from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { SpacerBlock } from "@/shared/display/spacer-block/spacer-block";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PopupFieldset } from "@/shared/display/popup-fieldset/popup-fieldset";

@Component({
    imports: [
        CommonModule,
        RouterModule,
        SpacerBlock,
        FormsModule,
        ReactiveFormsModule,
        PopupFieldset
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        nav-drawer-content {
            contain: inline-size style;
            display: flex;
            flex-direction: column;
            padding-top: 4px;
            padding-bottom: 16px;

            & > [data-e="title"] {
                @include MD3_TITLE_M_FONT_RULE_SET;
                margin: 14px 28px;
            }
            & > [data-e="lorem"] {
                margin: 4px 12px;
                padding-bottom: 96px;
                padding-inline-start: 16px;
            }
            & > hr {
                margin-inline: 28px;
                margin-block: 1px;
            }
            & > [data-e="color-theme-switch-label"] {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 40px;
                margin: 4px 12px;
                padding-inline-start: 16px;
            }
        }
    `,
    selector: 'nav-drawer-content',
    host: {},
    template: `
        <h3 data-e="title" >О магазине</h3 >
        <div data-e="lorem" >
            <!-- <popup-fieldset label="About"> -->
            <!--     <div style="height: 300px; width: 200px; background-color: white;" ></div> -->
            <!-- </popup-fieldset> -->
        </div >
        <hr />
        <h3 data-e="title" >Каталог</h3 >
        <div data-e="lorem" ></div >
        <hr />
        <h3 data-e="title" >Аккаунт</h3 >
        <div data-e="lorem" ></div >
        <hr />
        <h3 data-e="title" >Настройки</h3 >
        <!-- <label data-e="color-theme-switch-label" > -->
        <!--     Тёмная тема -->
        <!--     <md-checkbox -->
        <!--           [attr.checked]="colorScheme() === 'dark' ? '' : null" -->
        <!--           (change)="setColorScheme.emit(colorScheme() === 'dark' ? 'light' : 'dark')" -->
        <!--           touch-target="wrapper" -->
        <!--     ></md-checkbox> -->
        <!-- </label > -->
        <label data-e="color-theme-switch-label" >
            Тёмная тема
            <md-switch
                  [attr.selected]="colorScheme() === 'dark' ? '' : null"
                  (change)="setColorScheme.emit(colorScheme() === 'dark' ? 'light' : 'dark')"
                  aria-label="Dark Theme"
            ></md-switch >
        </label >
        <!-- <mat-slide-toggle -->
        <!--       [ngModel]="colorScheme() === 'dark'" -->
        <!--       (ngModelChange)="setColorScheme.emit(colorScheme() === 'dark' ? 'light' : 'dark')" -->
        <!-- > -->
        <!--     Slide Toggle Checked: {{ colorScheme() | uppercase }} -->
        <!-- </mat-slide-toggle > -->
        <!-- <mat-checkbox -->
        <!--       [ngModel]="colorScheme() === 'dark'" -->
        <!--       (ngModelChange)="setColorScheme.emit(colorScheme() === 'dark' ? 'light' : 'dark')" -->
        <!-- > -->
        <!--     Dark theme -->
        <!-- </mat-checkbox> -->
        <div data-e="lorem" >isDarkTheme: {{ colorScheme() | uppercase }}</div >
        <div data-e="lorem" >
            <!-- <popup-fieldset label="bottom"> -->
            <!--     <div style="height: 300px; width: 200px; background-color: white;" ></div> -->
            <!-- </popup-fieldset> -->
        </div >
    `,
})
export class NavDrawerContent {
    @Input() colorScheme!: Signal<"auto" | "light" | "dark">
    @Output() setColorScheme: EventEmitter<"auto" | "light" | "dark"> = new EventEmitter()

    constructor() {
    }
}
