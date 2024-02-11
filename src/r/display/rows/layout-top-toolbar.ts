import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    EventEmitter,
    inject, Injector, NgZone,
    Output, PLATFORM_ID
} from '@angular/core';
import { RouterModule } from '@angular/router';
// import { SpacerBlock } from "@/shared/display/blocks/spacer-block";
import { SpacerBlock } from "@/shared/display/blocks/spacer-block";
import { isPlatformBrowser } from "@angular/common";

@Component({
    imports: [ RouterModule, RouterModule, SpacerBlock ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    // encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-inserts";
        :host {
            z-index: $header-toolbar-row-z-index;
            @include LONG_ROW_IN_LAYOUT_RULE_SET;
            position: sticky;
            top: -1px;
            contain: layout paint;
            height: 56px;
            display: flex;
            align-items: center;
            gap: 4px; // или 0 ?
            // box-shadow: var(--md-sys-elevation-1);
            border-block: 1px solid var(--md-sys-color-surface-container-high);
            background-color: var(--md-sys-color-surface-container);
            color: var(--md-sys-color-on-surface);
            //@include body-large;
        }
        :host > :first-child {
            margin-inline-start: -10px;
        }
        :host > :last-child {
            margin-inline-end: -10px;
        }
        :host > md-filled-tonal-icon-button {
            --md-filled-tonal-icon-button-container-color: transparent;
            --md-filled-tonal-icon-button-focus-icon-color: var(--md-sys-color-primary);
            --md-filled-tonal-icon-button-hover-icon-color: var(--md-sys-color-primary);
            --md-filled-tonal-icon-button-hover-state-layer-color: var(--md-sys-color-primary);
            --md-filled-tonal-icon-button-icon-color: var(--md-sys-color-primary);
            --md-filled-tonal-icon-button-pressed-icon-color: var(--md-sys-color-primary);
            --md-filled-tonal-icon-button-pressed-state-layer-color: var(--md-sys-color-primary);
        }
        :host > md-filled-tonal-icon-button.active {
            --md-filled-tonal-icon-button-container-color: var(--md-sys-color-secondary-container);
        }
    `,
    selector: 'layout-top-toolbar',
    host: {
        'role': 'banner',
        'aria-label': 'Toolbar',
    },
    template: `
        <md-icon-button aria-label="Menu"
                        (click)="clickOnMainMenu.emit()" >
            <md-icon translate="no" >menu</md-icon >
        </md-icon-button >
        <spacer-block />
        <md-filled-tonal-icon-button aria-label="Search" >
            <md-icon translate="no" >search</md-icon >
        </md-filled-tonal-icon-button >
        <md-filled-tonal-icon-button aria-label="Bookmarks"
                                     routerLink="/bookmarks"
                                     routerLinkActive="active"
                                     ariaCurrentWhenActive="page" >
            <md-icon translate="no" >bookmarks</md-icon >
        </md-filled-tonal-icon-button >
        <md-filled-tonal-icon-button aria-label="Shopping cart"
                                     routerLink="/cart"
                                     routerLinkActive="active"
                                     ariaCurrentWhenActive="page" >
            <md-icon translate="no" >shopping_cart</md-icon >
        </md-filled-tonal-icon-button >
        <md-filled-tonal-icon-button aria-label="Person"
                                     routerLink="/account"
                                     routerLinkActive="active"
                                     ariaCurrentWhenActive="page" >
            <md-icon translate="no" >person</md-icon >
        </md-filled-tonal-icon-button >
    `,
})
export class LayoutTopToolbar {
    @Output() clickOnMainMenu: EventEmitter<void> = new EventEmitter()
}
