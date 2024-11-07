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
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    imports: [
        RouterLinkActive,
        RouterLink
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'icon-button',
    host: {
        '[class]': 'appearance',
        '[class.pressed]': 'pressed()',
    },
    templateUrl: 'icon-button.html',
    styleUrl: "icon-button.scss",
    encapsulation: ViewEncapsulation.None,
})
export class IconButton {
    @Input() appearance: 'simple' | 'outlined' | 'tonal' | 'filled' = 'simple'
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
