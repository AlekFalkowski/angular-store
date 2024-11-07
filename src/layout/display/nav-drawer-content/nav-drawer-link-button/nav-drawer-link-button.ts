import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    inject,
    NgZone,
    output,
    OutputEmitterRef,
    signal,
    ViewEncapsulation,
    WritableSignal
} from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    imports: [
        RouterLink,
        RouterLinkActive
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'nav-drawer-link-button',
    host: {
        '[class.pressed]': 'pressed()',
    },
    templateUrl: 'nav-drawer-link-button.html',
    styleUrl: 'nav-drawer-link-button.scss',
    encapsulation: ViewEncapsulation.None,
})
export class NavDrawerLinkButton {
    #_ngZone: NgZone = inject(NgZone)
    #_hostRef: ElementRef = inject(ElementRef)
    pressed: WritableSignal<boolean> = signal(false)
    // @Output() closeNavDrawer: EventEmitter<void> = new EventEmitter()
    closeNavDrawer: OutputEmitterRef<void> = output<void>()

    constructor() {
        afterNextRender(() => {
            this.#_hostRef.nativeElement.addEventListener('click', (event: MouseEvent) => {
                this.closeNavDrawer.emit()
            }, { capture: true, passive: true })
            this.#_hostRef.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
                switch (event.key) {
                    case 'Enter': {
                        this.#_ngZone.run(() => {
                            this.pressed.set(true)
                        })
                        this.closeNavDrawer.emit()
                        break
                    }
                    case ' ': {
                        this.#_ngZone.run(() => {
                            this.pressed.set(true)
                        })
                        // Переход по ссылке по нажатию пробела.
                        this.#_hostRef.nativeElement.querySelector('a').click()
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
