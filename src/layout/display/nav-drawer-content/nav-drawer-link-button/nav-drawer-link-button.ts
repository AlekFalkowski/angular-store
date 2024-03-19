import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    EventEmitter,
    inject,
    NgZone,
    Output,
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
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'nav-drawer-link-button.scss',
    selector: 'nav-drawer-link-button',
    host: {
        '[class.pressed]': 'pressed()',
    },
    templateUrl: 'nav-drawer-link-button.html',
})
export class NavDrawerLinkButton {
    #_ngZone: NgZone = inject(NgZone)
    #_elementRef: ElementRef = inject(ElementRef)
    pressed: WritableSignal<boolean> = signal(false)
    @Output() closeNavDrawer: EventEmitter<void> = new EventEmitter()

    constructor() {
        afterNextRender(() => {
            this.#_elementRef.nativeElement.addEventListener('click', (event: MouseEvent) => {
                this.closeNavDrawer.emit()
            }, { capture: true, passive: true })
            this.#_elementRef.nativeElement.addEventListener('keydown', (event: KeyboardEvent) => {
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
                        this.#_elementRef.nativeElement.querySelector('a').click()
                        break
                    }
                }
            }, { capture: true, passive: true })
            this.#_elementRef.nativeElement.addEventListener('keyup', (event: KeyboardEvent) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    this.#_ngZone.run(() => {
                        this.pressed.set(false)
                    })
                }
            }, { capture: true, passive: true })
        })
    }
}
