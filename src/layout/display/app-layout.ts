import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    computed,
    CUSTOM_ELEMENTS_SCHEMA,
    effect,
    ElementRef,
    inject,
    PLATFORM_ID,
    signal,
    Signal,
    ViewChild,
    ViewEncapsulation,
    WritableSignal
} from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { RouterModule, RouterOutlet } from '@angular/router';
import "@material/web/all"
import { WindowStateProvider } from "@/frame/WindowStateProvider";
import { HeadBar } from "./head-bar/head-bar";
import { NavBar } from "./nav-bar/nav-bar";
import { ContentInfo } from "./content-info/content-info";
import { ServiceInfo } from "./service-info/service-info";
import { NavDrawerContent } from "./nav-drawer-content/nav-drawer-content";
import { ViewModel } from "../model/ViewModel";
import { GetStableContentOption } from "../options/GetStableContentOption";
import { ObservePreferredColorSchemeOption } from "../options/ObservePreferredColorSchemeOption";
import { SetPreferredColorSchemeOption } from "../options/SetPreferredColorSchemeOption";
import { LocalStorage } from "../resources/LocalStorage";
import { RemoteStorage } from "../resources/RemoteStorage";
import { SpacerBlock } from "@/shared/display/spacer-block/spacer-block";
import { LoadingErrorCover } from "./loading-error-cover/loading-error-cover";
import { LoadingProcessCover } from "./loading-process-cover/loading-process-cover";
import { PageBreadcrumbs } from "@/shared/display/page-breadcrumbs/page-breadcrumbs";
import { PageTitle } from "@/shared/display/page-title/page-title";
import { StoreAssortment } from "@/nodes/home/display/store-assortment/store-assortment";

@Component({
    imports: [
        RouterModule,
        RouterOutlet,
        HeadBar,
        NavBar,
        ContentInfo,
        ContentInfo,
        ServiceInfo,
        NavDrawerContent,
        SpacerBlock,
        LoadingErrorCover,
        LoadingProcessCover,
        PageBreadcrumbs,
        PageTitle,
        StoreAssortment
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'app-layout.scss',
    selector: 'app-layout',
    host: {
        '[class.loading]': 'viewModel.stableContentState() !== "success"',
        '[class.dark]': 'colorScheme() === "dark"'
    },
    templateUrl: 'app-layout.html',
    providers: [
        ViewModel,
        GetStableContentOption,
        ObservePreferredColorSchemeOption,
        SetPreferredColorSchemeOption,
        LocalStorage,
        RemoteStorage
    ]
})
export class AppLayout {
    @ViewChild('navDrawer', { static: true }) navDrawer: ElementRef<HTMLDialogElement> | undefined
    readonly windowStateProvider: WindowStateProvider = inject(WindowStateProvider)
    readonly viewModel: ViewModel = inject(ViewModel)
    #_platformId: Object = inject(PLATFORM_ID)
    #_keydownListenerRemover: AbortController = new AbortController()
    #_navDrawerContentWidth: number = 320 // RELATED CONST in SCSS: $nav-drawer-content-width
    #_browserColorScheme: WritableSignal<"light" | "dark"> = signal("light")

    constructor() {
        if (isPlatformBrowser(this.#_platformId)) {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                this.#_browserColorScheme.set("dark")
            }
            window.matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', (event) => {
                    this.#_browserColorScheme.set(event.matches ? "dark" : "light")
                })
            window.addEventListener('keydown', (event) => {
                // Отменить скролл по нажатию пробела.
                //@ts-ignore
                if (event.key === ' ' && (event.target.nodeName === 'BODY' || event.target.nodeName === 'A')) {
                    event.preventDefault()
                }
            })
            effect(() => {
                this.colorScheme()
                // Отменить переходы при смене цветовой схемы.
                document.documentElement.classList.add("disable-transitions")
                setTimeout(() => {
                    document.documentElement.classList.remove("disable-transitions")
                }, 400)
            });
        }
        afterNextRender(() => {
            this.navDrawer?.nativeElement.addEventListener("close", () => {
                this.navDrawer?.nativeElement.querySelectorAll(':modal').forEach((popup) => {
                    //@ts-ignore
                    popup.close()
                })
                this.navDrawer?.nativeElement.querySelectorAll(':popover-open').forEach((popup) => {
                    //@ts-ignore
                    popup.hidePopover()
                })
                this.#_keydownListenerRemover.abort()
            })
        })
    }

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

    openNavDrawer(): void {
        this.navDrawer?.nativeElement.classList.add("is-starting")
        this.#_keydownListenerRemover.abort()
        this.#_keydownListenerRemover = new AbortController()
        this.navDrawer?.nativeElement.addEventListener("keydown", (event) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                this.closeNavDrawer()
            }
        }, { signal: this.#_keydownListenerRemover.signal })
        this.navDrawer?.nativeElement.showModal()
        this.navDrawer?.nativeElement.classList.remove("is-starting")
        this.navDrawer?.nativeElement.animate(
            [
                { transform: `translateX(${ -this.#_navDrawerContentWidth }px)` },
                { transform: 'translateX(0)' },
            ],
            { duration: 300, iterations: 1, easing: 'ease-in-out' }
        )
    }

    closeNavDrawerOnClickByBackdrop(event: Event): void {
        if (event.target === this.navDrawer?.nativeElement) {
            this.closeNavDrawer()
        }
    }

    closeNavDrawer(): void {
        this.navDrawer?.nativeElement.classList.add("is-closing")
        this.navDrawer?.nativeElement.animate(
            [
                { transform: 'translateX(0)' },
                { transform: `translateX(${ -this.#_navDrawerContentWidth }px)` },
            ],
            { duration: 300, iterations: 1, easing: 'ease-in-out' }
        ).finished.then(() => {
            this.navDrawer?.nativeElement.close()
            this.navDrawer?.nativeElement.classList.remove("is-closing")
        })
    }
}
