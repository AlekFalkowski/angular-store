import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    effect,
    inject,
    Injector,
    PLATFORM_ID,
    ViewEncapsulation
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
    host: {},
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
                  [colorScheme]="viewModel.colorScheme"
                  (setColorScheme)="viewModel.setColorScheme($event)"
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
    // ngOnInit() { // Запускается один раз после того, как Angular инициализирует все входные данные компонента.
    //     console.log("NG_ON_INIT")
    // }
    // ngOnChanges() { // Запускается каждый раз, когда входные данные компонента изменяются.
    //     console.log("NG_ON_CHANGES")
    // }
    // ngDoCheck() { // Запускается каждый раз, когда этот компонент проверяется на наличие изменений.
    //     console.log("NG_DO_CHECK")
    // }
    // ngAfterViewInit() { // Запускается один раз после инициализации представления компонента.
    //     console.log("NG_AFTER_VIEW_INIT")
    // }
    // ngAfterContentInit() { // Запускается один раз после инициализации содержимого компонента.
    //     console.log("NG_AFTER_CONTENT_INIT")
    // }
    // ngAfterViewChecked() { // Запускается каждый раз, когда представление компонента проверяется на наличие изменений.
    //     console.log("NG_AFTER_VIEW_CHECKED")
    // }
    // ngAfterContentChecked() { // Запускается каждый раз, когда содержимое этого компонента проверяется на наличие изменений.
    //     console.log("NG_AFTER_CONTENT_CHECKED")
    // }
    // afterNextRender() { // Запускается один раз, когда в следующий раз **все* компоненты будут отображены в DOM.
    //     console.log("NG_AFTER_NEXT_RENDER")
    // }
    // afterRender() { // Запускается каждый раз, когда **все** компоненты визуализируются в DOM.
    //     console.log("NG_AFTER_RENDER")
    // }
    // ngOnDestroy() { // Запускается один раз, прежде чем компонент будет уничтожен.
    //     console.log("NG_ON_DESTROY")
    // }
}
