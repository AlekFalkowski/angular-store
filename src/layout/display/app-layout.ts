import {
    ChangeDetectionStrategy,
    Component,
    computed,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    inject,
    Injector,
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
    readonly windowStateProvider: WindowStateProvider = inject(WindowStateProvider)
    readonly viewModel: ViewModel = inject(ViewModel)
    #_platformId: Object = inject(PLATFORM_ID)
    #_injector: Injector = inject(Injector)

    @ViewChild('navDrawer', { static: true }) navDrawer: ElementRef<HTMLDialogElement> | undefined

    constructor() {
        if (isPlatformBrowser(this.#_platformId)) {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                this.#_browserColorScheme.set("dark")
            }
            window.matchMedia('(prefers-color-scheme: dark)')
                  .addEventListener('change', (event) => {
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

    openNavDrawer(): void {
        this.navDrawer?.nativeElement.showModal()
    }

    closeNavDrawer(): void {
        this.navDrawer?.nativeElement.close()
    }

    closeNavDrawerOnClickByBackdrop(event: Event): void {
        if (event.target === this.navDrawer?.nativeElement) {
            this.closeNavDrawer()
        }
    }
}
