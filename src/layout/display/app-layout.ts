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
import { DocumentSizeProvider } from "@/document/DocumentSizeProvider";
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
import { IconButton } from "@/shared/display/icon-button/icon-button";

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
        StoreAssortment,
        IconButton
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'app-layout',
    host: {
        '[class.loading]': 'viewModel.stableContentState() !== "success"',
        '[class.dark]': 'colorScheme() === "dark"',
        '(window:popstate)': 'closeNavDrawer()'
    },
    templateUrl: 'app-layout.html',
    styleUrl: 'app-layout.scss',
    encapsulation: ViewEncapsulation.None,
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
    @ViewChild('navDrawerRef', { static: true }) navDrawerRef: ElementRef<HTMLDialogElement> | undefined
    readonly documentSizeProvider: DocumentSizeProvider = inject(DocumentSizeProvider)
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
                if (event.key === ' ' && (
                    //@ts-ignore
                    event.target?.nodeName === 'BODY' ||
                    //@ts-ignore
                    event.target?.nodeName === 'DIALOG' ||
                    //@ts-ignore
                    event.target?.nodeName === 'A'
                )) {
                    // Отменить скролл по нажатию пробела.
                    event.preventDefault()
                }
                if (event.key === 'Escape') {
                    // Закрыть самый глубокий открытый details (если фокус находиться внутри details) или dialog или popover.
                    const nodeList = document.documentElement.querySelectorAll(':where(dialog:modal, [popover]:popover-open, details[open])')
                    if (nodeList.length) {
                        event.preventDefault()
                        event.stopPropagation()
                    }
                    for (let i = nodeList.length - 1; i >= 0; i--) {
                        if (nodeList[i].matches('details[open]')) {
                            //@ts-ignore
                            if (event.target && nodeList[i].contains(event.target)) {
                                // Отбросить details, если фокус не внутри этого details.
                                nodeList[i].removeAttribute('open')
                                break
                            }
                            continue
                        }
                        if (nodeList[i].matches('dialog:modal')) {
                            //@ts-ignore
                            nodeList[i].close()
                        }
                        if (nodeList[i].matches('[popover]:popover-open')) {
                            //@ts-ignore
                            nodeList[i].hidePopover()
                        }
                        break
                    }
                }
            }, { capture: true })
            effect(() => {
                // Отменить css-transitions при смене цветовой схемы.
                this.colorScheme()
                document.documentElement.classList.add("disable-transitions")
                setTimeout(() => {
                    document.documentElement.classList.remove("disable-transitions")
                }, 400)
            });
        }
        afterNextRender(() => {
            this.navDrawerRef?.nativeElement.addEventListener("close", () => {
                // При закрытии navDrawer закрыть вложенные модальные диалоги.
                this.navDrawerRef?.nativeElement.querySelectorAll(':modal').forEach((popup) => {
                    //@ts-ignore
                    popup.close()
                })
                // При закрытии navDrawer закрыть вложенные popovers.
                this.navDrawerRef?.nativeElement.querySelectorAll(':popover-open').forEach((popup) => {
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
        this.navDrawerRef?.nativeElement.classList.add("before-opening")
        this.#_keydownListenerRemover.abort()
        this.#_keydownListenerRemover = new AbortController()
        this.navDrawerRef?.nativeElement.addEventListener("keydown", (event) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                this.closeNavDrawer()
            }
        }, { signal: this.#_keydownListenerRemover.signal })
        this.navDrawerRef?.nativeElement.showModal()
        this.navDrawerRef?.nativeElement.classList.remove("before-opening")
        if (this.navDrawerRef?.nativeElement.querySelector('.link-to-current-route')) {
            // Перевести фокус внутри nawDrawer на ссылку текущего маршрута, либо ее видимого summary-предка.
            // @ts-ignore
            if (this.navDrawerRef?.nativeElement.querySelector('.link-to-current-route').checkVisibility()) {
                // @ts-ignore
                this.navDrawerRef?.nativeElement.querySelector('.link-to-current-route').focus()
            } else {
                // @ts-ignore
                var summary: HTMLElement | null = this.navDrawerRef?.nativeElement.querySelector('.link-to-current-route').parentElement.closest('details').querySelector('summary')
                // @ts-ignore
                while (summary !== null && !summary.checkVisibility()) {
                    // @ts-ignore
                    summary = summary?.parentElement.closest('details').querySelector('summary')
                }
                if (summary !== null) {
                    summary.focus()
                }
            }
        }
        this.navDrawerRef?.nativeElement.animate(
            [
                { transform: `translateX(${ -this.#_navDrawerContentWidth }px)` },
                { transform: 'translateX(0)' },
            ],
            { duration: 300, iterations: 1, easing: 'ease-in-out' }
        )
    }

    closeNavDrawerOnClickByBackdrop(event: Event): void {
        if (event.target === this.navDrawerRef?.nativeElement) {
            this.closeNavDrawer()
        }
    }

    closeNavDrawer(): void {
        this.navDrawerRef?.nativeElement.classList.add("before-closing")
        this.navDrawerRef?.nativeElement.animate(
            [
                { transform: 'translateX(0)' },
                { transform: `translateX(${ -this.#_navDrawerContentWidth }px)` },
            ],
            { duration: 300, iterations: 1, easing: 'ease-in-out' }
        ).finished.then(() => {
            this.navDrawerRef?.nativeElement.close()
            this.navDrawerRef?.nativeElement.classList.remove("before-closing")
        })
    }
}
