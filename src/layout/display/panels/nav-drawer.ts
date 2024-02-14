import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    EventEmitter,
    Input,
    Output,
    signal,
    Signal,
    ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { SpacerBlock } from "@/shared/display/blocks/spacer-block";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
    imports: [
        CommonModule,
        RouterModule,
        SpacerBlock,
        FormsModule,
        ReactiveFormsModule
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        $nav-drawer-width: 300px;
        nav-drawer {
            z-index: $nav-drawer-z-index - 1;
            contain: layout paint size style;
            position: fixed;
            inset: 0;
            display: grid;
            grid-template-columns: 0 $nav-drawer-width auto;
            pointer-events: none;

            & > [data-e="backdrop"] {
                z-index: $nav-drawer-z-index - 1;
                contain: layout paint size style;
                position: absolute;
                inset: 0;
                background-color: black;
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                transition-property: opacity, visibility;
                transition-duration: 200ms;
            }
            & > [data-e="slot"] {
                z-index: $nav-drawer-z-index;
                contain: size style;
                position: absolute;
                top: 0;
                width: $nav-drawer-width;
                height: 100dvh;
                margin-inline-start: -$nav-drawer-width;
                overflow-y: auto;
                background-color: var(--md-sys-color-surface-container-low);
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                transition-property: transform, opacity, visibility;
                transition-duration: 200ms;
            }
            & > [data-e="close-button"] {
                z-index: $nav-drawer-z-index + 1;
                position: absolute;
                top: 120px;
                margin-inline-start: 4px;
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                transition-property: transform, opacity, visibility;
                transition-duration: 200ms;

                & > [data-e="icon"] {
                    transform: scaleX(-1);
                }
            }
        }
        nav-drawer.visible {

            & > [data-e="backdrop"] {
                opacity: 0.5;
                visibility: visible;
                pointer-events: auto;
            }
            & > [data-e="slot"] {
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
                transform: translateX($nav-drawer-width);
            }
            & > [data-e="close-button"] {
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
                transform: translateX($nav-drawer-width);
            }
        }
    `,
    selector: 'nav-drawer',
    host: { '[class.visible]': "visible()" },
    template: `
        <div data-e="backdrop" (click)="closeNavDrawer.emit()" ></div >
        <div data-e="slot" role="navigation" aria-label="Site" >
            <ng-content />
        </div >
        <md-filled-icon-button data-e="close-button" (click)="closeNavDrawer.emit()" >
            <md-icon data-e="icon" >double_arrow</md-icon >
        </md-filled-icon-button >
    `,
})
export class NavDrawer {
    @Input() visible: Signal<boolean> = signal(false)
    @Output() closeNavDrawer: EventEmitter<void> = new EventEmitter()

    constructor() {
    }
}
