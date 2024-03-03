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
    host: {
        '[class.start-side]': 'sideColumnPlacementSide === "start"',
        '[class.end-side]': 'sideColumnPlacementSide === "end"',
    },
    templateUrl: 'two-column-template.html',
})
export class TwoColumnTemplate {
    @Input() sideColumnPlacementSide: "start" | "end" = "start"
    @Input() openButtonText!: string
    @Input() isSideColumnOpenInModal: WritableSignal<boolean> = signal(false)
    @ViewChild('sideColumn', { static: true }) sideColumn: ElementRef<HTMLDialogElement> | undefined
    readonly viewModel: SharedViewModel = inject(SharedViewModel)
    #_platformId: Object = inject(PLATFORM_ID)
    #_ngZone: NgZone = inject(NgZone)
    #_showOrCloseSideColumnOnWindowResize: Subscription | undefined
    #_controller: AbortController = new AbortController()
    #_scrollY: number = 0
    #_scrollDirection: number = 0
    #_sideColumnWidth: number = 320 // RELATED CONST in SCSS: $side-column-width
    #_breakpoint: number = 1000 // RELATED CONST in SCSS: $breakpoint
    openButtonTopIndent: WritableSignal<"0px" | "70px"> = signal("70px")

    constructor() {
        afterNextRender(() => {
            document.addEventListener('scroll', this.#_changeOpenButtonIndentByChangingScrollDirection)
            if (this.viewModel.preferredSideColumnView() === 'hidden' || window.innerWidth < this.#_breakpoint) {
                this.sideColumn?.nativeElement.close()
            }
            this.sideColumn?.nativeElement.addEventListener("close", () => {
                this.sideColumn?.nativeElement.querySelectorAll(':modal').forEach((popup) => {
                    //@ts-ignore
                    popup.close()
                })
                this.sideColumn?.nativeElement.querySelectorAll(':popover-open').forEach((popup) => {
                    //@ts-ignore
                    popup.hidePopover()
                })
                if (window.innerWidth >= this.#_breakpoint && !this.isSideColumnOpenInModal()) {
                    this.viewModel.setPreferredSideColumnView('hidden')
                }
                this.isSideColumnOpenInModal.set(false)
                this.#_controller.abort()
            })
            this.#_showOrCloseSideColumnOnWindowResize =
                fromEvent(window, 'resize')
                    .pipe(throttleTime(400, undefined, { leading: false, trailing: true }))
                    .subscribe(() => {
                        if (window.innerWidth >= this.#_breakpoint) {
                            if (this.sideColumn?.nativeElement.open && this.isSideColumnOpenInModal()) {
                                this.sideColumn?.nativeElement.close()
                            }
                            if (!this.sideColumn?.nativeElement.open && this.viewModel.preferredSideColumnView() !== 'hidden') {
                                this.sideColumn?.nativeElement.show()
                            }
                        } else if (this.sideColumn?.nativeElement.open && !this.isSideColumnOpenInModal()) {
                            this.sideColumn?.nativeElement.close()
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
        this.sideColumn?.nativeElement.classList.add("is-starting")
        if (window.innerWidth >= this.#_breakpoint) {
            this.sideColumn?.nativeElement.show()
            this.sideColumn?.nativeElement.classList.remove("is-starting")
            this.viewModel.setPreferredSideColumnView('visible')
        } else {
            this.#_controller.abort()
            this.#_controller = new AbortController()
            this.sideColumn?.nativeElement.addEventListener("keydown", (event) => {
                if (event.key === 'Escape') {
                    event.preventDefault()
                    this.closeSideColumn()
                }
            }, { signal: this.#_controller.signal })
            this.sideColumn?.nativeElement.showModal()
            this.sideColumn?.nativeElement.classList.remove("is-starting")
            this.isSideColumnOpenInModal.set(true)
        }
        this.sideColumn?.nativeElement.animate(
            [
                { opacity: '0', transform: `translateX(${ this.sideColumnPlacementSide === 'start' ? `${ -this.#_sideColumnWidth }px` : `${ this.#_sideColumnWidth }px` })` },
                { opacity: '1', transform: 'translateX(0)' },
            ],
            { duration: 200, iterations: 1, easing: 'ease-out' }
        )
    }

    closeSideColumnOnClickByBackdrop(event: Event): void {
        if (event.target === this.sideColumn?.nativeElement) {
            this.closeSideColumn()
        }
    }

    closeSideColumn(): void {
        this.sideColumn?.nativeElement.classList.add("is-closing")
        if (window.innerWidth >= this.#_breakpoint && !this.isSideColumnOpenInModal()) {
            this.viewModel.setPreferredSideColumnView('hidden')
        }
        this.sideColumn?.nativeElement.animate(
            [
                { opacity: '1', transform: 'translateX(0)' },
                { opacity: '0', transform: `translateX(${ this.sideColumnPlacementSide === 'start' ? `${ -this.#_sideColumnWidth }px` : `${ this.#_sideColumnWidth }px` })` },
            ],
            { duration: 200, iterations: 1, easing: 'ease-out' }
        ).finished.then(() => {
            this.sideColumn?.nativeElement.close()
            this.sideColumn?.nativeElement.classList.remove("is-closing")
        })
    }
}
