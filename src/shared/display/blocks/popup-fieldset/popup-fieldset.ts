import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component, computed,
    CUSTOM_ELEMENTS_SCHEMA, ElementRef,
    inject,
    Input, NgZone, PLATFORM_ID, signal, ViewChild,
    ViewEncapsulation, WritableSignal
} from "@angular/core";
import { IndexStateProvider } from "@/frame/IndexStateProvider";
import { isPlatformBrowser } from "@angular/common";

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: "popup-fieldset.scss",
    selector: 'popup-fieldset',
    host: {},
    template: `
        <button data-e="button"
                #button
                [class]="variant"
                [class.checked]="inputText !== ''"
                [class.error]="error"
                [disabled]="disabled"
                aria-haspopup="dialog"
                (click)="openDialog()"
        >
            <span data-e="overlay" aria-hidden="true" ></span >
            <span data-e="input" aria-hidden="true" >{{ inputText }}</span >
            <span data-e="label" >{{ label }}</span >
            <span data-e="count" aria-hidden="true" >{{ checkedQnt }}</span >
            <svg data-e="icon"
                 aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg"
                 width="18"
                 height="18"
                 fill="currentColor"
            >
                <path d="M9 11.4 4.5 6.6h9Z" />
            </svg >
        </button >

        @if (helpText) {
            <div data-e="help-text" >
                {{ helpText }}
            </div >
        }

        <dialog data-e="dialog"
             #dialog
             [class]="variant"
             [style]="inlineStyle()"
             (click)="closeDialog($event)"
        >
            <ng-content />
        </dialog >
    `,
})
export class PopupFieldset {
    @Input() label: string = ''
    @Input() inputText?: string | number = ''
    @Input() checkedQnt?: number
    @Input() fieldQnt?: number
    @Input() helpText?: string
    @Input() variant: 'framed' | 'tonal' = 'framed'
    @Input() error: boolean = false
    @Input() disabled: boolean = false

    @ViewChild('button', { static: true }) button: ElementRef<HTMLButtonElement> | undefined
    @ViewChild('dialog', { static: true }) dialog: ElementRef<HTMLDialogElement> | undefined

    #_platformId: Object = inject(PLATFORM_ID)
    #_ngZone: NgZone = inject(NgZone)
    readonly indexStateProvider: IndexStateProvider = inject(IndexStateProvider)

    #_durationMultiplier = 1 //RELATED VALUES in SCSS: --dm. Вынести в ?config.
    #_toggleTransitionDuration = 200 // RELATED VALUES in SCSS: toggleTransitionDuration.

    constructor() {
    }

    dialogIsOpen: WritableSignal<boolean> = signal(false)

    // dialogIsVisible: WritableSignal<boolean> = signal(false)
    //
    openDialog(): void {
        this.dialog?.nativeElement.showModal()
        this.dialogIsOpen.set(true)
        // if (this.dialogIsOpen()) {
        //     return
        // }
        // this.dialog?.nativeElement.showPopover()
        // setTimeout(() => {
        //     this.dialogIsVisible.set(true)
        // })
    }

    closeDialog(event: Event): void {
        //@ts-ignore
        if (event.target?.nodeName === 'DIALOG') {
            // this.dialogIsVisible.set(false)
            // setTimeout(() => {
            this.dialog?.nativeElement.close()
            this.dialogIsOpen.set(false)
            // }, this.#_toggleTransitionDuration * this.#_durationMultiplier)
        }
    }

    inlineStyle = computed<Record<string, string | undefined | null>>(() => {
        if (!this.dialogIsOpen()) {
            return {}
        }
        // Метод getBoundingClientRect() даёт расстояния от viewport(0, 0) до граней элемента:
        const buttonRect = this.button?.nativeElement.getBoundingClientRect()
        const dialogRect = this.dialog?.nativeElement.getBoundingClientRect()
        if (!buttonRect || !dialogRect) {
            return {}
        }
        // console.log(`dialog width: ${ dialogRect.width }`)
        // console.log(`dialog height: ${ dialogRect.height }`)
        const margin = 16
        const indent = 8
        let left: string
        if (buttonRect.left + buttonRect.right < this.indexStateProvider.documentOffsetWidth()) {
            // Если buttonElement расположен в левой половине экрана:
            left = Math.min(
                  // buttonRect.right - dialogRect.width / 0.7 / 2,
                  buttonRect.right + indent,
                  this.indexStateProvider.documentOffsetWidth() - margin - dialogRect.width / 0.7
            ) + 'px'
        } else {
            // Если buttonElement расположен в правой половине экрана:
            left = Math.max(
                  buttonRect.left - dialogRect.width / 0.7 - indent,
                  margin
            ) + 'px'
        }
        let top: string
        if (buttonRect.top + buttonRect.bottom < this.indexStateProvider.documentClientHeight()) {
            // Если buttonElement расположен в верхней половине экрана:
            top = Math.max(
                  (buttonRect.top + buttonRect.bottom - dialogRect.height / 0.7) / 2,
                  margin
            ) + 'px'
        } else {
            // Если buttonElement расположен в нижней половине экрана:
            top = Math.min(
                  (buttonRect.top + buttonRect.bottom - dialogRect.height / 0.7) / 2,
                  this.indexStateProvider.documentClientHeight() - margin - dialogRect.height / 0.7
            ) + 'px'
        }

        return {
            left: left,
            top: top,
        }
    })
}
