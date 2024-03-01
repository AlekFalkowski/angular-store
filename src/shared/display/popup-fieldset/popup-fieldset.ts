import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    computed,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    inject,
    Input,
    signal,
    ViewChild,
    ViewEncapsulation,
    WritableSignal
} from "@angular/core";
import { WindowStateProvider } from "@/frame/WindowStateProvider";

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
export class PopupFieldset { // popup-for-switches-with-monitor
    @Input() label: string = ''
    @Input() inputText?: string | number = ''
    @Input() checkedQnt?: number
    @Input() fieldQnt?: number
    @Input() helpText?: string
    @Input() variant: 'framed' | 'tonal' = 'framed'
    @Input() error: boolean = false
    @Input() disabled: boolean = false

    @ViewChild('button', { static: true }) button: ElementRef<HTMLButtonElement> | undefined
    // @ViewChild('popup', { static: true }) popup: ElementRef<HTMLDialogElement> | undefined
    @ViewChild('popup', { static: true }) popup: ElementRef<HTMLElement> | undefined

    #_windowStateProvider: WindowStateProvider = inject(WindowStateProvider)

    dialogIsOpen: WritableSignal<boolean> = signal(false)
    #_scale = 0.7

    constructor() {
        afterNextRender(() => {
            this.popup?.nativeElement.addEventListener("close", () => {
                this.popup?.nativeElement.querySelectorAll(':where(:modal, :popover-open)')
                    .forEach((popup) => {
                        //@ts-ignore
                        popup.close()
                    })
                this.dialogIsOpen.set(false)
            })
        })
    }

    openDialog(): void {
        this.popup?.nativeElement.showModal()
        this.dialogIsOpen.set(true)
        this.#_scale = 0.7 // RELATED in SCSS: transform: scale(0.7)
    }

    closeDialog(): void {
        this.popup?.nativeElement.close()
    }

    closeDialogOnClickByBackdrop(event: Event): void {
        if (event.target === this.popup?.nativeElement) {
            this.popup?.nativeElement.close()
        }
    }

    inlineStyle = computed<Record<string, string | undefined | null>>(() => {
        if (!this.dialogIsOpen()) {
            return {}
        }
        // Метод getBoundingClientRect() даёт расстояния от viewport(0, 0) до граней элемента:
        const buttonRect = this.button?.nativeElement.getBoundingClientRect()
        const dialogRect = this.popup?.nativeElement.getBoundingClientRect()
        if (!buttonRect || !dialogRect) {
            return {}
        }
        const margin = 16
        const indent = 8
        let left: string
        if (buttonRect.left + buttonRect.right < this.#_windowStateProvider.documentOffsetWidth()) {
            // Если buttonElement расположен в левой половине экрана:
            left = Math.min(
                buttonRect.right + indent,
                this.#_windowStateProvider.documentOffsetWidth() - margin - dialogRect.width / this.#_scale
            ) + 'px'
        } else {
            // Если buttonElement расположен в правой половине экрана:
            left = Math.max(
                buttonRect.left - dialogRect.width / this.#_scale - indent,
                margin
            ) + 'px'
        }
        let top: string
        if (buttonRect.top + buttonRect.bottom < this.#_windowStateProvider.documentClientHeight()) {
            // Если buttonElement расположен в верхней половине экрана:
            top = Math.max(
                (buttonRect.top + buttonRect.bottom - dialogRect.height / this.#_scale) / 2,
                margin
            ) + 'px'
        } else {
            // Если buttonElement расположен в нижней половине экрана:
            top = Math.min(
                (buttonRect.top + buttonRect.bottom - dialogRect.height / this.#_scale) / 2,
                this.#_windowStateProvider.documentClientHeight() - margin - dialogRect.height / this.#_scale
            ) + 'px'
        }
        this.#_scale = 1
        return {
            left: left,
            top: top,
        }
    })
}
