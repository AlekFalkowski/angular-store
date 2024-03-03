import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    computed,
    CUSTOM_ELEMENTS_SCHEMA,
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
import { ObservePreferredColorSchemeOption } from "../options/ObservePreferredColorSchemeOption";
import { SetPreferredColorSchemeOption } from "../options/SetPreferredColorSchemeOption";
import { LocalStorage } from "../resources/LocalStorage";
import { SpacerBlock } from "@/shared/display/spacer-block/spacer-block";

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
        SpacerBlock
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'app-layout.scss',
    selector: 'app-layout',
    host: { '[class.dark]': 'colorScheme() === "dark"' },
    templateUrl: 'app-layout.html',
    providers: [
        ViewModel,
        ObservePreferredColorSchemeOption,
        SetPreferredColorSchemeOption,
        LocalStorage
    ]
})
export class AppLayout {
    @ViewChild('navDrawer', { static: true }) navDrawer: ElementRef<HTMLDialogElement> | undefined
    readonly windowStateProvider: WindowStateProvider = inject(WindowStateProvider)
    readonly viewModel: ViewModel = inject(ViewModel)
    #_platformId: Object = inject(PLATFORM_ID)
    #_controller: AbortController = new AbortController()
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
                this.#_controller.abort()
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
        this.#_controller.abort()
        this.#_controller = new AbortController()
        this.navDrawer?.nativeElement.addEventListener("keydown", (event) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                this.closeNavDrawer()
            }
        }, { signal: this.#_controller.signal })
        this.navDrawer?.nativeElement.showModal()
        this.navDrawer?.nativeElement.classList.remove("is-starting")
        this.navDrawer?.nativeElement.animate(
            [
                { opacity: '0', transform: `translateX(${ -this.#_navDrawerContentWidth }px)` },
                { opacity: '1', transform: 'translateX(0)' },
            ],
            { duration: 200, iterations: 1, easing: 'ease-out' }
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
                { opacity: '1', transform: 'translateX(0)' },
                { opacity: '0', transform: `translateX(${ -this.#_navDrawerContentWidth }px)` },
            ],
            { duration: 200, iterations: 1, easing: 'ease-out' }
        ).finished.then(() => {
            this.navDrawer?.nativeElement.close()
            this.navDrawer?.nativeElement.classList.remove("is-closing")
        })
    }
}
