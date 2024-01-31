import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA, ElementRef, EventEmitter, inject,
    Input,
    Output,
    signal,
    Signal, ViewChild
} from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { SpacerBlock } from "../../../shared/display/blocks/spacer-block";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdSwitch } from "@material/web/all";

@Component({
    imports: [ CommonModule, RouterModule, SpacerBlock, FormsModule, ReactiveFormsModule ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    // encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-inserts";
        :host {
            display: flex;
            flex-direction: column;
            padding-top: 4px;
            padding-bottom: 16px;
        }
        :host > div:not([class]) {
            margin: 4px 12px;
            padding-inline-start: 16px;
        }
        [data-e="title"] {
            // color: var(--md-sys-color-on-surface-variant);
            @include MD3_TITLE_M_FONT_RULE_SET;
            margin: 14px 28px;
        }
        hr {
            margin-inline: 28px;
            margin-block: 1px;
        }
        [data-e="dark-theme-switch-label"] {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 40px;
            margin: 4px 12px;
            padding-inline-start: 16px;
        }
    `,
    selector: 'nav-drawer-content',
    host: {},
    template: `
        <h3 data-e="title" >Catalog</h3 >
        <hr />
        <h3 data-e="title" >Contacts</h3 >
        <hr />
        <div >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, magnam, voluptatum. Architecto
            consectetur debitis deserunt rerum ut! Accusantium, alias aliquid consequuntur, deserunt iure nisi nobis
            porro rerum sequi tempora, veritatis?
        </div >
        <div >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, magnam, voluptatum. Architecto
            consectetur debitis deserunt rerum ut! Accusantium, alias aliquid consequuntur, deserunt iure nisi nobis
            porro rerum sequi tempora, veritatis?
        </div >
        <div >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, magnam, voluptatum. Architecto
            consectetur debitis deserunt rerum ut! Accusantium, alias aliquid consequuntur, deserunt iure nisi nobis
            porro rerum sequi tempora, veritatis?
        </div >
        <div >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, magnam, voluptatum. Architecto
            consectetur debitis deserunt rerum ut! Accusantium, alias aliquid consequuntur, deserunt iure nisi nobis
            porro rerum sequi tempora, veritatis?
        </div >
        <div >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, magnam, voluptatum. Architecto
            consectetur debitis deserunt rerum ut! Accusantium, alias aliquid consequuntur, deserunt iure nisi nobis
            porro rerum sequi tempora, veritatis?
        </div >
        <div >
            <input type="text" style="height: 36px;" >
        </div >
        <div >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, magnam, voluptatum. Architecto
            consectetur debitis deserunt rerum ut! Accusantium, alias aliquid consequuntur, deserunt iure nisi nobis
            porro rerum sequi tempora, veritatis?
        </div >
        <div >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, magnam, voluptatum. Architecto
            consectetur debitis deserunt rerum ut! Accusantium, alias aliquid consequuntur, deserunt iure nisi nobis
            porro rerum sequi tempora, veritatis?
        </div >
        <div >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, magnam, voluptatum. Architecto
            consectetur debitis deserunt rerum ut! Accusantium, alias aliquid consequuntur, deserunt iure nisi nobis
            porro rerum sequi tempora, veritatis?
        </div >
        <div >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, magnam, voluptatum. Architecto
            consectetur debitis deserunt rerum ut! Accusantium, alias aliquid consequuntur, deserunt iure nisi nobis
            porro rerum sequi tempora, veritatis?
        </div >
        <div >isDarkTheme: {{ colorScheme() | uppercase }}</div >
        <hr />
        <h3 data-e="title" >Настройки</h3 >
        <label data-e="dark-theme-switch-label" >
            Тёмная тема
            <!-- <input type="checkbox" [(ngModel)]="isDarkTheme" checked> -->
            <!-- <md-checkbox touch-target="wrapper"></md-checkbox> -->
            <md-switch
                  [attr.selected]="this.colorScheme() == 'dark' ? '' : null"
                  aria-label="Dark Theme"
                  (input)="inputHandler($event)"
            ></md-switch >
            <!-- <md-switch aria-label="Dark Theme" [formControl]="isDarkTheme"></md-switch> -->
            <!-- <input type="checkbox" [formControl]="isDarkTheme" checked> -->
        </label >
        <hr />
        <h3 data-e="title" >Lorem</h3 >
        <div >
            <input type="text" style="height: 36px;" >
        </div >
        <!-- <div> -->
        <!--     <md-radio name="animals" value="cats"></md-radio> -->
        <!--     <md-radio name="animals" value="dogs"></md-radio> -->
        <!--     <md-radio name="animals" value="birds" checked></md-radio> -->
        <!-- </div> -->
    `,
})
export class NavDrawerContent {
    @Input() colorScheme!: Signal<"auto" | "light" | "dark">
    @Output() setColorScheme: EventEmitter<"auto" | "light" | "dark"> = new EventEmitter()
    // isDarkTheme: FormControl<boolean | null> = new FormControl(false)
    //document.querySelector("md-switch").shadowRoot.querySelector("div")

    elementRef: ElementRef = inject(ElementRef)

    constructor() {
        // afterNextRender(() => {
        //     elementRef
        //           .nativeElement.querySelector('[data-e="dark-theme-switch-label"] > md-switch')
        //           .shadowRoot.querySelector("div > input").className =
        //           this.colorScheme() == 'dark' ? "switch selected" : "switch unselected"
        // })
    }

    inputHandler(event: Event): void {
        //@ts-ignore
        const value = !!event.target?.shadowRoot?.querySelector("div.unselected") ? "dark" : "light"
        this.setColorScheme.emit(value)
    }
}
