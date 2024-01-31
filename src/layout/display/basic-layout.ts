import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA, effect,
    inject, Injector, PLATFORM_ID,
    signal,
    WritableSignal
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from "@angular/common";
import {
    ActivatedRoute,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router, RouterEvent,
    RouterModule,
    RouterOutlet
} from '@angular/router';
import { LayoutTopLine } from "./rows/layout-top-line";
import { LayoutTopToolbar } from "./rows/layout-top-toolbar";
import { LayoutFooter } from "./rows/layout-footer";
import { NavDrawer } from "./panels/nav-drawer";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import "@material/web/all"
import { LayoutViewModel } from "../model/LayoutViewModel";
import { ServiceInfo } from "./rows/service-info";
import { IndexStateProvider } from "../../frame/IndexStateProvider";
import { debounceTime, filter, fromEvent, startWith, throttleTime } from "rxjs";
import { ObservePreferredColorSchemeOption } from "../options/ObservePreferredColorSchemeOption";
import { SetPreferredColorSchemeOption } from "../options/SetPreferredColorSchemeOption";
import { NavDrawerContent } from "./panels/nav-drawer-content";

@Component({
    imports: [ CommonModule, RouterModule, RouterOutlet, LayoutTopLine, LayoutTopToolbar, LayoutFooter, LayoutFooter, NavDrawer, ServiceInfo, NavDrawerContent ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    // encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-inserts";
        :host {
            @include LAYOUT_SIDE_PADDING_RULE_SET;
            overflow-x: clip;
            min-width: $app-min-width;
            min-height: 100lvh;
            display: grid;
            grid-template-columns: $layout-template-columns;
            grid-template-rows: auto auto auto 1fr auto auto;
            background-color: var(--md-sys-color-surface);
        }
        [data-e="loading-cover"] {
            z-index: $loading-cover-z-index;
            grid-column: 1/-1;
            grid-row: 1/-1;
            display: flex;
            justify-content: center;
            padding-top: 20lvh;
            background-color: var(--md-sys-color-surface);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition-property: opacity, visibility;
            transition-duration: 200ms;
            &.visible {
                opacity: 1;
                pointer-events: auto;
                visibility: visible;
            }
        }
        layout-top-line {
            grid-row: 1;
        }
        layout-top-toolbar {
            grid-row: 2;
        }
        router-outlet {
            grid-column: 1/-1;
            grid-row: 3;
        }
        layout-footer {
            grid-row: 5;
            margin-top: 56px;
        }
        service-info {
            grid-row: 6;
        }
        nav-drawer {
            grid-column: 1;
            // grid-column: -2;
            grid-row: 1/-1;
        }
    `,
    selector: 'basic-layout',
    host: {},
    template: `
        <div data-e="loading-cover" >Loading...</div >
        <layout-top-line />
        <layout-top-toolbar
              (clickOnMainMenu)="indexStateProvider.navDrawerShown.set(true)"
        />
        <router-outlet />
        <layout-footer />
        <service-info
              [windowInnerWidth]="indexStateProvider.windowInnerWidth"
              [windowInnerHeight]="indexStateProvider.windowInnerHeight"
              [documentOffsetWidth]="indexStateProvider.documentOffsetWidth"
              [documentClientHeight]="indexStateProvider.documentClientHeight"
              [documentScrollbarWidth]="indexStateProvider.documentScrollbarWidth"
              [isMobileInPortraitOnly]="indexStateProvider.isMobileInPortraitOnly"
              [isMobileInLandscapeOnly]="indexStateProvider.isMobileInLandscapeOnly"
              [isMobileInAllOrientations]="indexStateProvider.isMobileInAllOrientations"
              [isDesktopOrTablet]="indexStateProvider.isDesktopOrTablet"
        />
        <nav-drawer
              [visible]="indexStateProvider.navDrawerShown"
              (closeNavDrawer)="indexStateProvider.navDrawerShown.set(false)"
        >
            <nav-drawer-content
                  [colorScheme]="viewModel.colorScheme"
                  (setColorScheme)="viewModel.setColorScheme($event)"
            />
        </nav-drawer >
    `,
    providers: [
        LayoutViewModel,
        ObservePreferredColorSchemeOption,
        SetPreferredColorSchemeOption
    ]
})
export class BasicLayout {

    readonly indexStateProvider: IndexStateProvider = inject(IndexStateProvider)
    readonly viewModel: LayoutViewModel = inject(LayoutViewModel)
    #_platformId: Object = inject(PLATFORM_ID)
    #_injector: Injector = inject(Injector)
    #_router: Router = inject(Router)

    constructor() {
        if (isPlatformBrowser(this.#_platformId)) {
        }
        // this.#_router.events.pipe(
        //       filter((e: Event | RouterEvent): e is RouterEvent => e instanceof RouterEvent)
        // ).subscribe((e: RouterEvent) => {
        //     // Do something
        // })
        afterNextRender(() => {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
                this.#_onChangeColorSchemeInBrowser(event)
            })
            effect(() => {
                this.#_onChangeColorSchemeInApp(this.viewModel.colorScheme())
            }, { injector: this.#_injector })
        })
    }

    // ngOnInit() {
    //     this.#_router.events.subscribe((event) => {
    //         // console.log(event)
    //         if (event instanceof NavigationStart) {
    //             // Navigation is starting... show a loading spinner perhaps?
    //             // blog on that here: ultimatecourses.com/blog/angular-loading-spinners-with-router-events
    //         }
    //         if (event instanceof NavigationEnd) {
    //             // We've finished navigating
    //         }
    //         if (event instanceof NavigationError) {
    //             // something went wrong, log the error
    //             console.log(event.error);
    //         }
    //     });
    // }
    // ngOnInit() {
    //     this.#_router.events.pipe(
    //           filter((event) => event instanceof NavigationStart)
    //     ).subscribe((event) => {
    //         // this only fires for `NavigationStart` and no other events
    //     });
    // }

    #_onChangeColorSchemeInApp(colorScheme: string): void {
        if (colorScheme === 'dark' || colorScheme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-color-scheme', 'dark')
        } else {
            document.documentElement.removeAttribute('data-color-scheme')
        }
    }

    #_onChangeColorSchemeInBrowser(event: MediaQueryListEvent): void {
        if (this.viewModel.colorScheme() === 'light' || this.viewModel.colorScheme() === 'dark') {
            return
        }
        if (event.matches) {
            document.documentElement.setAttribute('data-color-scheme', 'dark')
        } else {
            document.documentElement.removeAttribute('data-color-scheme')
        }
    }
}
