import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    computed,
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
} from "@angular/core";
import { DocumentSizeProvider } from "@/document/DocumentSizeProvider";
import { isPlatformBrowser } from "@angular/common";

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'popup-selection',
    host: { '[class]': 'variant' },
    templateUrl: 'popup-selection.html',
    styleUrl: "popup-selection.scss",
    encapsulation: ViewEncapsulation.None,
})
export class PopupSelection {
    @Input() label: string = ''
    @Input() inputText?: string | number = ''
    @Input() checkedQnt?: string = ''
    @Input() fieldQnt?: number
    @Input() variant: 'outlined' | 'tonal' = 'outlined'
    @Input() error: boolean = false
    @Input() disabled: boolean = false
    #_hostRef: ElementRef = inject(ElementRef)
    @ViewChild('popupRef', { static: true }) popupRef: ElementRef<HTMLElement> | undefined

    #_platformId: Object = inject(PLATFORM_ID)
    #_ngZone: NgZone = inject(NgZone)
    #_documentSizeProvider: DocumentSizeProvider = inject(DocumentSizeProvider)
    #_windowEventListenersRemover: AbortController = new AbortController()
    #_scale = 0.7
    #_popupIsOpen: WritableSignal<boolean> = signal(false)

    constructor() {
        afterNextRender(() => {
            const button: HTMLButtonElement = this.#_hostRef.nativeElement.querySelector('button')
            if (!button || !this.popupRef?.nativeElement) {
                return
            }
            button.popoverTargetElement = this.popupRef.nativeElement
            //@ts-ignore
            this.popupRef?.nativeElement.addEventListener("toggle", (event: ToggleEvent) => {
                this.#_ngZone.run(() => {
                    if (event.newState === "open") {
                        this.#_windowEventListenersRemover.abort()
                        this.#_windowEventListenersRemover = new AbortController()
                        this.#_popupIsOpen.set(true)
                        // <<< START Temporary solution until Safari supports css @starting-style.
                        this.popupRef?.nativeElement.animate(
                            [
                                { opacity: '0', transform: 'scale(0.7)' },
                                { opacity: '1', transform: 'scale(1)' },
                            ],
                            { duration: 200, iterations: 1, easing: 'ease-in-out', fill: 'forwards' }
                        )
                        // >>> END Temporary solution until Safari supports css @starting-style.
                        window.addEventListener('click', (event) => {
                            //@ts-ignore
                            if (this.popupRef?.nativeElement.contains(event.target)) {
                                return
                            }
                            //@ts-ignore //TODO: Частное решение. переделать в общее.
                            if (event.target.nodeName === 'DIALOG') {
                                event.stopPropagation()
                            }
                            // <<< START Temporary solution until Safari supports css @starting-style.
                            //@ts-ignore
                            if (button.contains(event.target)) {
                                event.preventDefault()
                            }
                            this.popupRef?.nativeElement.querySelectorAll(':modal').forEach((popup) => {
                                //@ts-ignore
                                popup.close()
                            })
                            this.popupRef?.nativeElement.querySelectorAll(':popover-open').forEach((popup) => {
                                //@ts-ignore
                                popup.hidePopover()
                            })
                            this.#_windowEventListenersRemover.abort()
                            this.popupRef?.nativeElement.classList.add('before-hiding')
                            this.popupRef?.nativeElement.animate(
                                [
                                    { opacity: '1', transform: 'scale(1)' },
                                    { opacity: '0', transform: 'scale(0.7)' },
                                ],
                                { duration: 200, iterations: 1, easing: 'ease-in-out', fill: 'forwards' }
                            ).finished.then(() => {
                                this.popupRef?.nativeElement.hidePopover()
                                this.popupRef?.nativeElement.classList.remove('before-hiding')
                            })
                            // >>> END Temporary solution until Safari supports css @starting-style.
                        }, { capture: true, signal: this.#_windowEventListenersRemover.signal })
                        window.addEventListener('scroll', (event) => {
                            //@ts-ignore
                            if (this.popupRef?.nativeElement.contains(event.target)) {
                                return
                            }
                            // // <<< START Solution for browsers supporting css @starting-style.
                            // this.#_windowEventListenersRemover.abort()
                            // this.popupRef?.nativeElement.querySelectorAll(':modal').forEach((popup) => {
                            //     //@ts-ignore
                            //     popup.close()
                            // })
                            // this.popupRef?.nativeElement.querySelectorAll(':popover-open').forEach((popup) => {
                            //     //@ts-ignore
                            //     popup.hidePopover()
                            // })
                            // // >>> END Solution for browsers supporting css @starting-style.
                            // <<< START Temporary solution until Safari supports css @starting-style.
                            this.popupRef?.nativeElement.querySelectorAll(':modal').forEach((popup) => {
                                //@ts-ignore
                                popup.close()
                            })
                            this.popupRef?.nativeElement.querySelectorAll(':popover-open').forEach((popup) => {
                                //@ts-ignore
                                popup.hidePopover()
                            })
                            this.#_windowEventListenersRemover.abort()
                            this.popupRef?.nativeElement.classList.add('before-hiding')
                            this.popupRef?.nativeElement.animate(
                                [
                                    { opacity: '1', transform: 'scale(1)' },
                                    { opacity: '0', transform: 'scale(0.7)' },
                                ],
                                { duration: 200, iterations: 1, easing: 'ease-in-out', fill: 'forwards' }
                            ).finished.then(() => {
                                this.popupRef?.nativeElement.hidePopover()
                                this.popupRef?.nativeElement.classList.remove('before-hiding')
                            })
                            // >>> END Temporary solution until Safari supports css @starting-style.
                        }, { capture: true, signal: this.#_windowEventListenersRemover.signal })
                    } else {
                        // // <<< START Solution for browsers supporting css @starting-style.
                        // this.popupRef?.nativeElement.querySelectorAll(':modal').forEach((popup) => {
                        //     //@ts-ignore
                        //     popup.close()
                        // })
                        // this.popupRef?.nativeElement.querySelectorAll(':popover-open').forEach((popup) => {
                        //     //@ts-ignore
                        //     popup.hidePopover()
                        // })
                        // // >>> END Solution for browsers supporting css @starting-style.
                        this.#_popupIsOpen.set(false)
                        this.#_windowEventListenersRemover.abort()
                        // <<< START Temporary solution until Safari supports css @starting-style.
                        this.popupRef?.nativeElement.animate(
                            [ { opacity: '0' } ],
                            { duration: 0, iterations: 1, fill: 'forwards' }
                        )
                        // >>> END Temporary solution until Safari supports css @starting-style.
                    }
                })
            })
        })
    }

    popupPositionCssStyle = computed<Record<string, string | undefined | null>>(() => {
        if (!isPlatformBrowser(this.#_platformId)) {
            return {}
        }
        // Метод getBoundingClientRect() даёт расстояния от viewport(0, 0) до граней элемента:
        const buttonRect = this.#_hostRef?.nativeElement.querySelector('button').getBoundingClientRect()
        const popupRect = this.popupRef?.nativeElement.getBoundingClientRect()
        if (!buttonRect || !popupRect) {
            return {}
        }
        const margin = 16
        const indent = 8
        let left: string
        let top: string
        if (this.#_popupIsOpen()) {
            if (buttonRect.left + buttonRect.right < this.#_documentSizeProvider.documentOffsetWidth()) {
                // Если buttonElement расположен в левой половине экрана:
                left = Math.min(
                    buttonRect.right + indent,
                    this.#_documentSizeProvider.documentOffsetWidth() - margin - popupRect.width / this.#_scale
                ) + 'px'
            } else {
                // Если buttonElement расположен в правой половине экрана:
                left = Math.max(
                    buttonRect.left - popupRect.width / this.#_scale - indent,
                    margin
                ) + 'px'
            }
            if (buttonRect.top + buttonRect.bottom < this.#_documentSizeProvider.documentClientHeight()) {
                // Если buttonElement расположен в верхней половине экрана:
                top = Math.max(
                    (buttonRect.top + buttonRect.bottom - popupRect.height / this.#_scale) / 2,
                    margin
                ) + 'px'
            } else {
                // Если buttonElement расположен в нижней половине экрана:
                top = Math.min(
                    (buttonRect.top + buttonRect.bottom - popupRect.height / this.#_scale) / 2,
                    this.#_documentSizeProvider.documentClientHeight() - margin - popupRect.height / this.#_scale
                ) + 'px'
            }
            this.#_scale = 1
            return {
                left: left,
                top: top,
            }
        } else {
            this.#_scale = 0.7
            return {
                left: popupRect.left + 'px',
                top: popupRect.top + 'px',
            }
        }
    })
}
