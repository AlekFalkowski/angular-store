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
import { SpacerBlock } from "@/shared/display/blocks/spacer-block";
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
        $nav-drawer-width: 300px;
        :host {
            justify-self: end;
            // justify-self: start;
            position: relative;
            display: grid;
            grid-template-columns: $nav-drawer-width 0;
            // grid-template-columns: 0 $nav-drawer-width;
        }
        [data-e="nav-drawer-backdrop"] {
            grid-column: 1;
            grid-row: 1;
            z-index: $nav-drawer-z-index - 1;
            contain: layout paint size style;
            position: fixed;
            inset: 0;
            background-color: black;
            opacity: 0;
            visibility: hidden;
            transition-property: opacity, visibility;
            transition-duration: 200ms;
            &.visible {
                opacity: 0.5;
                visibility: visible;
            }
        }
        [data-e="nav-drawer-slot"] {
            grid-column: 1;
            // grid-column: 2;
            grid-row: 1;
            z-index: $nav-drawer-z-index;
            position: sticky;
            top: 0;
            width: $nav-drawer-width;
            height: 100dvh;
            contain: layout size style;
            overflow-y: auto;
            background-color: var(--md-sys-color-surface-container-low);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition-property: transform, opacity, visibility;
            transition-duration: 200ms;
            &.visible {
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
                transform: translateX($nav-drawer-width);
                // transform: translateX(calc(0px - $nav-drawer-width));
            }
        }
        [data-e="close-button"] {
            grid-column: 2;
            // grid-column: 1;
            grid-row: 1;
            z-index: $nav-drawer-z-index + 1;
            position: sticky;
            top: 120px;
            margin-inline-start: -20px;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition-property: transform, opacity, visibility;
            transition-duration: 200ms;
            &.visible {
                opacity: 1;
                pointer-events: auto;
                visibility: visible;
                // transform: translateX($nav-drawer-width + 24px);
                transform: translateX($nav-drawer-width);
                // transform: translateX(0px - $nav-drawer-width);
            }
        }
        [data-e="close-button-icon"] {
            transform: scaleX(-1);
        }
    `,
    selector: 'nav-drawer',
    host: {},
    template: `
        <div data-e="nav-drawer-backdrop"
             [class.visible]="visible()"
             (click)="closeNavDrawer.emit()" >
        </div >
        <div data-e="nav-drawer-slot" role="navigation" aria-label="Site" [class.visible]="visible()" >
            <ng-content/>
        </div >
        <md-filled-icon-button data-e="close-button"
                               [class.visible]="visible()"
                               (click)="closeNavDrawer.emit()" >
            <md-icon data-e="close-button-icon">double_arrow</md-icon >
        </md-filled-icon-button >
    `,
})
export class NavDrawer {
    @Input() visible: Signal<boolean> = signal(false)
    @Output() closeNavDrawer: EventEmitter<void> = new EventEmitter()

    constructor() {
    }
}
