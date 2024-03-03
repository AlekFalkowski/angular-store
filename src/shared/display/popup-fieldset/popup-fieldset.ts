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
import { WindowStateProvider } from "@/frame/WindowStateProvider";
import { isPlatformBrowser } from "@angular/common";

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: "popup-fieldset.scss",
    selector: 'popup-fieldset',
    host: { '[class]': 'variant' },
    templateUrl: 'popup-fieldset.html',
})
export class PopupFieldset { // popup-for-switches-with-status-display
    @Input() label: string = ''
    @Input() inputText?: string | number = ''
    @Input() checkedQnt?: string = ''
    @Input() fieldQnt?: number
    @Input() helpText?: string
    @Input() variant: 'framed' | 'tonal' = 'framed'
    @Input() error: boolean = false
    @Input() disabled: boolean = false
    @ViewChild('button', { static: true }) button: ElementRef<HTMLButtonElement> | undefined
    @ViewChild('popup', { static: true }) popup: ElementRef<HTMLElement> | undefined
    #_platformId: Object = inject(PLATFORM_ID)
    #_ngZone: NgZone = inject(NgZone)
    #_windowStateProvider: WindowStateProvider = inject(WindowStateProvider)
    #_scale = 0.7
    #_popupIsOpen: WritableSignal<boolean> = signal(false)

    constructor() {
        afterNextRender(() => {
            // @ts-ignore
            this.button.nativeElement.popoverTargetElement = this.popup.nativeElement
            let controller: AbortController = new AbortController()
            // @ts-ignore
            this.popup?.nativeElement.addEventListener("toggle", (event: ToggleEvent) => {
                this.#_ngZone.run(() => {
                    if (event.newState === "open") {
                        controller.abort()
                        controller = new AbortController()
                        this.#_popupIsOpen.set(true)
                        // <<< START Temporary solution until Safari supports css @starting-style.
                        this.popup?.nativeElement.animate(
                            [
                                { opacity: '0', transform: 'scale(0.7)' },
                                { opacity: '1', transform: 'scale(1)' },
                            ],
                            { duration: 200, iterations: 1, easing: 'ease-out', fill: 'forwards' }
                        )
                        // >>> END Temporary solution until Safari supports css @starting-style.
                        window.addEventListener('click', (event) => {
                            //@ts-ignore
                            if (this.popup?.nativeElement.contains(event.target)) {
                                return
                            }
                            //@ts-ignore
                            if (event.target.nodeName === 'DIALOG') {
                                event.stopPropagation()
                            }
                            // <<< START Temporary solution until Safari supports css @starting-style.
                            //@ts-ignore
                            if (this.button?.nativeElement.contains(event.target)) {
                                event.preventDefault()
                            }
                            this.popup?.nativeElement.querySelectorAll(':modal').forEach((popup) => {
                                //@ts-ignore
                                popup.close()
                            })
                            this.popup?.nativeElement.querySelectorAll(':popover-open').forEach((popup) => {
                                //@ts-ignore
                                popup.hidePopover()
                            })
                            controller.abort()
                            this.popup?.nativeElement.classList.add('is-closing')
                            this.popup?.nativeElement.animate(
                                [
                                    { opacity: '1', transform: 'scale(1)' },
                                    { opacity: '0', transform: 'scale(0.7)' },
                                ],
                                { duration: 200, iterations: 1, easing: 'ease-out', fill: 'forwards' }
                            ).finished.then(() => {
                                this.popup?.nativeElement.hidePopover()
                                this.popup?.nativeElement.classList.remove('is-closing')
                            })
                            // >>> END Temporary solution until Safari supports css @starting-style.
                        }, { capture: true, signal: controller.signal })
                    } else {
                        // // <<< START Solution for browsers supporting css @starting-style.
                        // this.popup?.nativeElement.querySelectorAll(':modal').forEach((popup) => {
                        //     //@ts-ignore
                        //     popup.close()
                        // })
                        // this.popup?.nativeElement.querySelectorAll(':popover-open').forEach((popup) => {
                        //     //@ts-ignore
                        //     popup.hidePopover()
                        // })
                        // // >>> END Solution for browsers supporting css @starting-style.
                        this.#_popupIsOpen.set(false)
                        controller.abort()
                        // <<< START Temporary solution until Safari supports css @starting-style.
                        this.popup?.nativeElement.animate(
                            [ { opacity: '0' } ],
                            { duration: 0, iterations: 1, fill: 'forwards' }
                        )
                        // >>> END Temporary solution until Safari supports css @starting-style.
                    }
                })
            })
        })
    }

    inlineStyle = computed<Record<string, string | undefined | null>>(() => {
        if (!isPlatformBrowser(this.#_platformId)) {
            return {}
        }
        // Метод getBoundingClientRect() даёт расстояния от viewport(0, 0) до граней элемента:
        const buttonRect = this.button?.nativeElement.getBoundingClientRect()
        const popupRect = this.popup?.nativeElement.getBoundingClientRect()
        if (!buttonRect || !popupRect) {
            return {}
        }
        const margin = 16
        const indent = 8
        let left: string
        let top: string
        if (this.#_popupIsOpen()) {
            if (buttonRect.left + buttonRect.right < this.#_windowStateProvider.documentOffsetWidth()) {
                // Если buttonElement расположен в левой половине экрана:
                left = Math.min(
                    buttonRect.right + indent,
                    this.#_windowStateProvider.documentOffsetWidth() - margin - popupRect.width / this.#_scale
                ) + 'px'
            } else {
                // Если buttonElement расположен в правой половине экрана:
                left = Math.max(
                    buttonRect.left - popupRect.width / this.#_scale - indent,
                    margin
                ) + 'px'
            }
            if (buttonRect.top + buttonRect.bottom < this.#_windowStateProvider.documentClientHeight()) {
                // Если buttonElement расположен в верхней половине экрана:
                top = Math.max(
                    (buttonRect.top + buttonRect.bottom - popupRect.height / this.#_scale) / 2,
                    margin
                ) + 'px'
            } else {
                // Если buttonElement расположен в нижней половине экрана:
                top = Math.min(
                    (buttonRect.top + buttonRect.bottom - popupRect.height / this.#_scale) / 2,
                    this.#_windowStateProvider.documentClientHeight() - margin - popupRect.height / this.#_scale
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
