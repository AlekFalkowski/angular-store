import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    inject,
    Input,
    NgZone,
    signal,
    ViewEncapsulation,
    WritableSignal
} from "@angular/core";

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'base-button',
    host: {
        '[class]': 'appearance',
        '[class.pressed]': 'pressed()',
    },
    templateUrl: 'base-button.html',
    styleUrl: "base-button.scss",
    encapsulation: ViewEncapsulation.None,
})
export class BaseButton {
    @Input() appearance: 'simple' | 'outlined' | 'tonal' | 'filled' | 'elevated' = 'simple'
    #_ngZone: NgZone = inject(NgZone)
    #_hostRef: ElementRef = inject(ElementRef)
    pressed: WritableSignal<boolean> = signal(false)

    constructor() {
        afterNextRender(() => {
            this.#_hostRef.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
                switch (event.key) {
                    case 'Enter': {
                        this.#_ngZone.run(() => {
                            this.pressed.set(true)
                        })
                        break
                    }
                    case ' ': {
                        this.#_ngZone.run(() => {
                            this.pressed.set(true)
                        })
                        // Переход по ссылке по нажатию пробела.
                        if (this.#_hostRef.nativeElement.querySelector('a')) {
                            this.#_hostRef.nativeElement.querySelector('a').click()
                        }
                        break
                    }
                }
            }, { capture: true, passive: true })
            this.#_hostRef.nativeElement.addEventListener('keyup', (event: KeyboardEvent) => {
                switch (event.key) {
                    case 'Enter':
                    case ' ': {
                        this.#_ngZone.run(() => {
                            this.pressed.set(false)
                        })
                    }
                }
            }, { capture: true, passive: true })
        })
    }
}
