import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    inject,
    Input,
    NgZone,
    PLATFORM_ID,
    signal,
    ViewEncapsulation,
    WritableSignal
} from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { fromEvent, Subscription, throttleTime } from "rxjs";
import { SharedViewModel } from "@/shared/model/SharedViewModel";

@Component({
    imports: [
        RouterLinkActive,
        RouterLink
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'two-column-template.scss',
    selector: 'two-column-template',
    host: {},
    templateUrl: 'two-column-template.html',
})
export class TwoColumnTemplate {
    @Input() openButtonText!: string
    @Input() isSidePanelOpenInMobile: WritableSignal<boolean> = signal(false)
    readonly viewModel: SharedViewModel = inject(SharedViewModel)
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

    openButtonTopIndent: WritableSignal<"0px" | "70px"> = signal("70px")

    openSidePanel(): void {
        // Этот метод открывает боковую панель на мобильном, либо меняет предпочтение видимости панели на планшете.
        if (window.innerWidth <= 1000) { // Синхронно с @media (max-width: 1000px).
            this.isSidePanelOpenInMobile.set(true)
        } else {
            this.viewModel.setPreferredSidePanelView('visible')
        }
    }

    closeSidePanel(): void {
        // Этот метод закрывает боковую панель на мобильном, либо меняет предпочтение видимости панели на планшете.
        if (window.innerWidth <= 1000) { // Синхронно с @media (max-width: 1000px).
            this.isSidePanelOpenInMobile.set(false)
        } else {
            this.viewModel.setPreferredSidePanelView('hidden')
        }
    }
}
