import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    EventEmitter,
    inject,
    Input,
    NgZone,
    Output,
    PLATFORM_ID,
    signal,
    Signal,
    WritableSignal
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { fromEvent, Subscription, throttleTime } from "rxjs";
import { TPreferredSidePanelView } from "@/pages/catalog/types/TPreferredSidePanelView";

@Component({
    imports: [ CommonModule, RouterLinkActive, RouterLink ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    // encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-inserts";
        $end-column-width: 300px;
        $breakpoint: 1000px;
        :host {
            grid-column: 1/-1;
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, $base-max-width - $end-column-width) $end-column-width minmax(0, 1fr);
        }
        [data-e="main-column"] {
            grid-column: 2/4;
            grid-row: 1;
            // padding-inline-start: var(--side-padding);
            // padding-inline-end: calc($end-column-width + var(--side-padding));
            padding-inline-end: $end-column-width;
            &.full-width {
                // padding-inline-end: var(--side-padding);
                padding-inline-end: 0;
            }
            @media (max-width: $breakpoint) {
                // padding-inline-end: var(--side-padding);
                padding-inline-end: 0;
            }
            transition-property: padding-inline-end;
            transition-duration: 200ms;
        }
        [data-e="button-row"] {
            display: flex;
            height: 56px;
        }
        [data-e="end-column-backdrop"] {
            @media (max-width: $breakpoint) { // For Mobile.
                z-index: $side-panel-fixed-z-index - 1;
                contain: layout paint size style;
                position: fixed;
                inset: 0;
                background-color: black;
                opacity: 0;
                visibility: hidden;
                transition-property: opacity, visibility;
                transition-duration: 200ms;
                &.visible-on-mobile {
                    opacity: 0.5;
                    visibility: visible;
                }
            }
        }
        [data-e="end-column"] {
            grid-column: 3;
            grid-row: 1;
            contain: layout size style;
            border-block: 1px solid var(--md-sys-color-surface-container);
            background-color: var(--md-sys-color-surface-container-low);
            transition-property: transform, opacity, visibility;
            transition-duration: 200ms;
            @media (min-width: $breakpoint + 0.01px) { // For Tablet.
                z-index: $side-panel-base-z-index;
                opacity: 1;
                pointer-events: auto;
                visibility: visible;
                &.hidden-on-tablets {
                    opacity: 0;
                    visibility: hidden;
                    pointer-events: none;
                    transform: translateX($end-column-width);
                }
            }
            @media (max-width: $breakpoint) { // For Mobile.
                z-index: $side-panel-fixed-z-index;
                position: fixed;
                top: 0;
                right: calc(var(--sw) - $end-column-width);
                // right: -$end-column-width;
                width: 300px;
                // height: 100dvh;
                bottom: 0;
                overflow-y: auto;
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                &.visible-on-mobile {
                    opacity: 1;
                    pointer-events: auto;
                    visibility: visible;
                    transform: translateX(0px - $end-column-width);
                }
            }
        }
        [data-e="open-button"] {
            grid-column: 3;
            grid-row: 1;
            margin-top: 8px;
            position: sticky;
            top: var(--open-button-top-indent, 70px);
            width: min-content;
            height: min-content;
            justify-self: end;
            margin-inline-end: var(--side-padding);
            transition-property: top;
            transition-duration: 400ms;
        }
        [data-e="close-button"] {
            grid-column: 3;
            grid-row: 1;
            transition-property: transform, opacity, visibility;
            transition-duration: 200ms;
            @media (min-width: $breakpoint + 0.01px) { // For Tablet.
                z-index: $side-panel-base-z-index + 1;
                margin-top: 8px;
                position: sticky;
                top: 70px;
                margin-inline-start: -20px;
                opacity: 1;
                visibility: visible;
                pointer-events: auto;
                &.hidden-on-tablets {
                    opacity: 0;
                    visibility: hidden;
                    pointer-events: none;
                    transform: translateX($end-column-width);
                }
            }
            @media (max-width: $breakpoint) { // For Mobile.
                z-index: $side-panel-fixed-z-index + 1;
                position: fixed;
                top: 120px;
                right: calc(var(--sw) - 20px);
                // right: -20px;
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                &.visible-on-mobile {
                    opacity: 1;
                    pointer-events: auto;
                    visibility: visible;
                    // transform: translateX(0px - $end-column-width - 24px);
                    transform: translateX(0px - $end-column-width);
                }
            }
        }
    `,
    selector: 'two-column-template',
    host: {},
    template: `
        <div data-e="main-column" [class.full-width]="preferredSidePanelView() == 'hidden'" >
            <div data-e="button-row" ></div >
            <ng-content select="main-column-slot" />
        </div >
        <div data-e="end-column-backdrop"
             [class.visible-on-mobile]="isSidePanelOpenInMobile()"
             (click)="closeSidePanel()" >
        </div >
        <div data-e="end-column"
             [class.hidden-on-tablets]="preferredSidePanelView() == 'hidden'"
             [class.visible-on-mobile]="isSidePanelOpenInMobile()" >
            <ng-content select="end-column-slot" />
        </div >
        <md-filled-button data-e="open-button"
                          [style.--open-button-top-indent]="openButtonTopIndent()"
                          (click)="openSidePanel()" >
            Показать Фильтр
        </md-filled-button >
        <md-filled-icon-button data-e="close-button"
                               [class.hidden-on-tablets]="preferredSidePanelView() == 'hidden'"
                               [class.visible-on-mobile]="isSidePanelOpenInMobile()"
                               (click)="closeSidePanel()" >
            <md-icon >double_arrow</md-icon >
        </md-filled-icon-button >
    `,
})
export class TwoColumnTemplate {
    @Input() preferredSidePanelView!: Signal<TPreferredSidePanelView>
    @Output() setPreferredSidePanelView: EventEmitter<TPreferredSidePanelView> = new EventEmitter()


    isSidePanelOpenInMobile: WritableSignal<boolean> = signal(false)
    openButtonTopIndent: WritableSignal<"0px" | "70px"> = signal("70px")

    openSidePanel(): void {
        // Этот метод открывает боковую панель на мобильном, либо меняет предпочтение видимости панели на планшете.
        if (window.innerWidth <= 1000) { // Синхронно с @media (max-width: 1000px).
            this.isSidePanelOpenInMobile.set(true)
        } else {
            this.setPreferredSidePanelView.emit('visible')
        }
    }

    closeSidePanel(): void {
        // Этот метод закрывает боковую панель на мобильном, либо меняет предпочтение видимости панели на планшете.
        if (window.innerWidth <= 1000) { // Синхронно с @media (max-width: 1000px).
            this.isSidePanelOpenInMobile.set(false)
        } else {
            this.setPreferredSidePanelView.emit('hidden')
        }
    }

    #_platformId: Object = inject(PLATFORM_ID)
    #_ngZone: NgZone = inject(NgZone)
    #_closeSidePanelOnMobileByResizeWindow: Subscription | undefined

    constructor() {
        if (isPlatformBrowser(this.#_platformId)) {
            document.addEventListener('scroll', this.#_changeOpenButtonIndentByChangingScrollDirection)
            this.#_closeSidePanelOnMobileByResizeWindow =
                  // Это функция закрывает боковую панель на мобильном при ресайзе окна.
                  fromEvent(window, 'resize').pipe(throttleTime(400)).subscribe(() => {
                      if (window.innerWidth > 1000) { // Синхронно с @media (min-width: 1000.01px).
                          this.isSidePanelOpenInMobile.set(false)
                      }
                  })
        }
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.#_platformId)) {
            document.removeEventListener('scroll', this.#_changeOpenButtonIndentByChangingScrollDirection)
            this.#_closeSidePanelOnMobileByResizeWindow?.unsubscribe()
        }
    }


    #_scrollY: number = 0
    #_scrollDirection: number = 0
    #_changeOpenButtonIndentByChangingScrollDirection = (): void => {
        if (window.scrollY > this.#_scrollY) { // scrollDirection: down
            if (this.#_scrollDirection !== 1) {
                this.#_scrollDirection = 1
                this.#_ngZone.run(() => {
                    this.openButtonTopIndent.set("0px")
                })
            }
        } else { // scrollDirection: up
            if (this.#_scrollDirection !== -1) {
                this.#_scrollDirection = -1
                this.#_ngZone.run(() => {
                    this.openButtonTopIndent.set("70px")
                })
            }
        }
        this.#_scrollY = window.scrollY
    }
}
