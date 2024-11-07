import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    inject,
    Input,
    NgZone,
    PLATFORM_ID,
    signal,
    ViewChild,
    ViewEncapsulation,
    WritableSignal
} from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { fromEvent, Subscription, throttleTime } from "rxjs";
import { SharedViewModel } from "@/shared/model/SharedViewModel";
import { BaseButton } from "@/shared/display/base-button/base-button";
import { IconButton } from "@/shared/display/icon-button/icon-button";

@Component({
    imports: [
        RouterLinkActive,
        RouterLink,
        BaseButton,
        IconButton
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'two-column-template',
    host: {
        '[class.start-side]': 'sideColumnPlacement === "start"',
        '[class.end-side]': 'sideColumnPlacement === "end"',
    },
    templateUrl: 'two-column-template.html',
    styleUrl: 'two-column-template.scss',
    encapsulation: ViewEncapsulation.None,
})
export class TwoColumnTemplate {
    @Input() sideColumnPlacement: "start" | "end" = "start"
    @Input() openButtonText!: string
    @Input() isSideColumnOpenInModal: WritableSignal<boolean> = signal(false)
    @ViewChild('sideColumnRef', { static: true }) sideColumnRef: ElementRef<HTMLDialogElement> | undefined
    readonly viewModel: SharedViewModel = inject(SharedViewModel)
    #_platformId: Object = inject(PLATFORM_ID)
    #_ngZone: NgZone = inject(NgZone)
    #_showOrCloseSideColumnOnWindowResize: Subscription | undefined
    #_keydownListenerRemover: AbortController = new AbortController()
    #_scrollY: number = 0
    #_scrollDirection: number = 0
    #_sideColumnWidth: number = 320 // RELATED CONST in SCSS: $side-column-width
    #_breakpoint: number = 1000 // RELATED CONST in SCSS: $breakpoint
    openButtonTopIndent: WritableSignal<"0px" | "70px"> = signal("70px")

    constructor() {
        afterNextRender(() => {
            document.addEventListener('scroll', this.#_changeOpenButtonIndentByChangingScrollDirection)
            if (this.viewModel.preferredSideColumnView() === 'hidden' || window.innerWidth < this.#_breakpoint) {
                this.sideColumnRef?.nativeElement.close()
            }
            this.sideColumnRef?.nativeElement.addEventListener("close", () => {
                this.sideColumnRef?.nativeElement.querySelectorAll(':modal').forEach((popup) => {
                    //@ts-ignore
                    popup.close()
                })
                this.sideColumnRef?.nativeElement.querySelectorAll(':popover-open').forEach((popup) => {
                    //@ts-ignore
                    popup.hidePopover()
                })
                if (window.innerWidth >= this.#_breakpoint && !this.isSideColumnOpenInModal()) {
                    this.viewModel.setPreferredSideColumnView('hidden')
                }
                this.isSideColumnOpenInModal.set(false)
                this.#_keydownListenerRemover.abort()
            })
            this.#_showOrCloseSideColumnOnWindowResize =
                fromEvent(window, 'resize')
                    .pipe(throttleTime(400, undefined, { leading: false, trailing: true }))
                    .subscribe(() => {
                        if (window.innerWidth >= this.#_breakpoint) {
                            if (this.sideColumnRef?.nativeElement.open && this.isSideColumnOpenInModal()) {
                                this.sideColumnRef?.nativeElement.close()
                            }
                            if (!this.sideColumnRef?.nativeElement.open && this.viewModel.preferredSideColumnView() !== 'hidden') {
                                this.sideColumnRef?.nativeElement.show()
                            }
                        } else if (this.sideColumnRef?.nativeElement.open && !this.isSideColumnOpenInModal()) {
                            this.sideColumnRef?.nativeElement.close()
                        }
                    })
        })
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.#_platformId)) {
            document.removeEventListener('scroll', this.#_changeOpenButtonIndentByChangingScrollDirection)
            this.#_showOrCloseSideColumnOnWindowResize?.unsubscribe()
        }
    }

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

    openSideColumn(): void {
        this.sideColumnRef?.nativeElement.classList.add("before-opening")
        if (window.innerWidth >= this.#_breakpoint) {
            this.sideColumnRef?.nativeElement.show()
            this.sideColumnRef?.nativeElement.classList.remove("before-opening")
            this.viewModel.setPreferredSideColumnView('visible')
            this.sideColumnRef?.nativeElement.animate(
                [
                    { opacity: '0', transform: `translateX(${ this.sideColumnPlacement === 'start' ? `${ -this.#_sideColumnWidth }px` : `${ this.#_sideColumnWidth }px` })` },
                    { opacity: '1', transform: 'translateX(0)' },
                ],
                { duration: 300, iterations: 1, easing: 'ease-in-out' }
            )
        } else {
            this.#_keydownListenerRemover.abort()
            this.#_keydownListenerRemover = new AbortController()
            this.sideColumnRef?.nativeElement.addEventListener("keydown", (event) => {
                if (event.key === 'Escape') {
                    event.preventDefault()
                    this.closeSideColumn()
                }
            }, { signal: this.#_keydownListenerRemover.signal })
            this.sideColumnRef?.nativeElement.showModal()
            this.sideColumnRef?.nativeElement.classList.remove("before-opening")
            this.isSideColumnOpenInModal.set(true)
            this.sideColumnRef?.nativeElement.animate(
                [
                    { transform: `translateX(${ this.sideColumnPlacement === 'start' ? `${ -this.#_sideColumnWidth }px` : `${ this.#_sideColumnWidth }px` })` },
                    { transform: 'translateX(0)' },
                ],
                { duration: 300, iterations: 1, easing: 'ease-in-out' }
            )
        }
    }

    closeSideColumnOnClickByBackdrop(event: Event): void {
        if (event.target === this.sideColumnRef?.nativeElement) {
            this.closeSideColumn()
        }
    }

    closeSideColumn(): void {
        this.sideColumnRef?.nativeElement.classList.add("before-closing")
        if (window.innerWidth >= this.#_breakpoint && !this.isSideColumnOpenInModal()) {
            this.viewModel.setPreferredSideColumnView('hidden')
        }
        this.sideColumnRef?.nativeElement.animate(
            window.innerWidth >= this.#_breakpoint
                ? [
                    { opacity: '1', transform: 'translateX(0)' },
                    { opacity: '0', transform: `translateX(${ this.sideColumnPlacement === 'start' ? `${ -this.#_sideColumnWidth }px` : `${ this.#_sideColumnWidth }px` })` },
                ]
                : [
                    { transform: 'translateX(0)' },
                    { transform: `translateX(${ this.sideColumnPlacement === 'start' ? `${ -this.#_sideColumnWidth }px` : `${ this.#_sideColumnWidth }px` })` },
                ],
            { duration: 300, iterations: 1, easing: 'ease-in-out' }
        ).finished.then(() => {
            this.sideColumnRef?.nativeElement.close()
            this.sideColumnRef?.nativeElement.classList.remove("before-closing")
        })
    }
}
