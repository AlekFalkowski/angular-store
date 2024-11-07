import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    inject,
    NgZone,
    signal,
    ViewEncapsulation,
    WritableSignal
} from '@angular/core';

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'nav-drawer-directory',
    host: {
        '[class.pressed]': 'pressed()',
    },
    templateUrl: 'nav-drawer-directory.html',
    styleUrl: 'nav-drawer-directory.scss',
    encapsulation: ViewEncapsulation.None,
})
export class NavDrawerDirectory {
    #_ngZone: NgZone = inject(NgZone)
    #_hostRef: ElementRef = inject(ElementRef)
    pressed: WritableSignal<boolean> = signal(false)

    constructor() {
        afterNextRender(() => {
            const detailsElement = this.#_hostRef.nativeElement.querySelector('details')
            const summaryElement = this.#_hostRef.nativeElement.querySelector('summary')
            // summaryElement.addEventListener('click', (event: Event) => {
            //     event.preventDefault()
            //     if (detailsElement.open) {
            //         TODO: Реализовать анимацию закрытия.
            //         detailsElement.open = false
            //     } else {
            //         TODO: Реализовать анимацию раскрытия.
            //         detailsElement.open = true
            //     }
            // }, { capture: true })
            summaryElement.addEventListener('keydown', (event: KeyboardEvent) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    this.#_ngZone.run(() => {
                        this.pressed.set(true)
                    })
                }
            }, { capture: true, passive: true })
            summaryElement.addEventListener('keyup', (event: KeyboardEvent) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    this.#_ngZone.run(() => {
                        this.pressed.set(false)
                    })
                }
            }, { capture: true, passive: true })
        })
    }
}
