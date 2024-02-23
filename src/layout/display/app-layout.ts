import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component, computed,
    CUSTOM_ELEMENTS_SCHEMA,
    effect,
    inject,
    Injector,
    PLATFORM_ID, signal, Signal,
    ViewEncapsulation, WritableSignal
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import "@material/web/all"
import { IndexStateProvider } from "@/frame/IndexStateProvider";
import { AppTopLine } from "./rows/app-top-line";
import { AppTopToolbar } from "./rows/app-top-toolbar";
import { AppFooter } from "./rows/app-footer";
import { AppServiceInfo } from "./rows/app-service-info";
import { NavDrawer } from "./panels/nav-drawer";
import { NavDrawerContent } from "./panels/nav-drawer-content";
import { ViewModel } from "../model/ViewModel";
import { ObservePreferredColorSchemeOption } from "../options/ObservePreferredColorSchemeOption";
import { SetPreferredColorSchemeOption } from "../options/SetPreferredColorSchemeOption";
import { LocalStorage } from "../resources/LocalStorage";
import { SpacerBlock } from "@/shared/display/blocks/spacer-block";

@Component({
    imports: [
        CommonModule,
        RouterModule,
        RouterOutlet,
        AppTopLine,
        AppTopToolbar,
        AppFooter,
        AppFooter,
        NavDrawer,
        AppServiceInfo,
        NavDrawerContent,
        SpacerBlock
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrls: [],
    styles: `
        @import "all-config";
        app-layout {
            contain: inline-size style;
            overflow-x: clip;
            min-width: $app-min-width;
            min-height: 100dvh;
            display: flex;
            flex-direction: column;
            background-color: var(--md-sys-color-surface);

            & [data-e="loading-cover"] {
                z-index: $loading-cover-z-index;
                contain: layout paint size style;
                position: fixed;
                inset: 0;
                display: flex;
                justify-content: center;
                padding-top: 20lvh;
                background-color: var(--md-sys-color-surface);
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                transition-property: opacity, visibility;
                transition-duration: 200ms;
            }
        }
        app-layout.loading {

            & [data-e="loading-cover"] {
                opacity: 1;
                pointer-events: auto;
                visibility: visible;
            }
        }
    `,
    selector: 'app-layout',
    host: {
        '[class.dark]': 'colorScheme() === "dark"'
    },
    template: `
        <div data-e="loading-cover" >Loading...</div >
        <app-top-line />
        <app-top-toolbar
              (clickOnMainMenu)="indexStateProvider.navDrawerShown.set(true)" />
        <router-outlet />
        <spacer-block />
        <app-footer />
        <app-service-info
              [windowInnerWidth]="indexStateProvider.windowInnerWidth"
              [windowInnerHeight]="indexStateProvider.windowInnerHeight"
              [documentOffsetWidth]="indexStateProvider.documentOffsetWidth"
              [documentClientHeight]="indexStateProvider.documentClientHeight"
              [documentScrollbarWidth]="indexStateProvider.documentScrollbarWidth"
              [isMobileInPortraitOnly]="indexStateProvider.isMobileInPortraitOnly"
              [isMobileInLandscapeOnly]="indexStateProvider.isMobileInLandscapeOnly"
              [isMobileInAllOrientations]="indexStateProvider.isMobileInAllOrientations"
        />
        <nav-drawer
              [visible]="indexStateProvider.navDrawerShown"
              (closeNavDrawer)="indexStateProvider.navDrawerShown.set(false)"
        >
            <nav-drawer-content
                  [colorScheme]="colorScheme"
                  (setColorScheme)="viewModel.setPreferredColorScheme($event)"
            />
        </nav-drawer >
    `,
    providers: [
        ViewModel,
        ObservePreferredColorSchemeOption,
        SetPreferredColorSchemeOption,
        LocalStorage
    ]
})
export class AppLayout {
    readonly indexStateProvider: IndexStateProvider = inject(IndexStateProvider)
    readonly viewModel: ViewModel = inject(ViewModel)
    #_platformId: Object = inject(PLATFORM_ID)
    #_injector: Injector = inject(Injector)

    constructor() {
        if (isPlatformBrowser(this.#_platformId)) {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                this.#_browserColorScheme.set("dark")
            }
            window.matchMedia('(prefers-color-scheme: dark)')
                  .addEventListener('change', (event) => {
                      console.log("event")
                      this.#_browserColorScheme.set(event.matches ? "dark" : "light")
                      // this.#_setColorSchemeOnChangeColorSchemeInBrowser(event)
                  })
            // effect(() => {
            //     this.#_setColorSchemeOnChangeColorSchemeInApp(this.viewModel.preferredColorScheme())
            // }, { injector: this.#_injector })
        }
    }

    #_browserColorScheme: WritableSignal<"light" | "dark"> = signal("light")

    colorScheme: Signal<"light" | "dark"> = computed(() => {
        switch (this.viewModel.preferredColorScheme()) {
            case "light":
                return "light"
            case "dark":
                return "dark"
            default:
                return this.#_browserColorScheme()
        }
    })

    // #_setColorSchemeOnChangeColorSchemeInApp(preferredColorScheme: string): void {
    //     if (preferredColorScheme === 'dark' || preferredColorScheme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //         document.documentElement.setAttribute('data-color-scheme', 'dark')
    //     } else {
    //         document.documentElement.removeAttribute('data-color-scheme')
    //     }
    // }
    //
    // #_setColorSchemeOnChangeColorSchemeInBrowser(colorScheme: "light" | "dark"): void {
    //     this.#_browserPreferredColorScheme.set(colorScheme)
    //     if (this.viewModel.preferredColorScheme() === 'light' || this.viewModel.preferredColorScheme() === 'dark') {
    //         return
    //     }
    //     if (colorScheme === "dark") {
    //         document.documentElement.setAttribute('data-color-scheme', 'dark')
    //     } else {
    //         document.documentElement.removeAttribute('data-color-scheme')
    //     }
    // }
}
