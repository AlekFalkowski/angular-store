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
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'nav-drawer-directory.scss',
    selector: 'nav-drawer-directory',
    host: {
        '[class.pressed]': 'pressed()',
    },
    templateUrl: 'nav-drawer-directory.html',
})
export class NavDrawerDirectory {
    #_ngZone: NgZone = inject(NgZone)
    #_elementRef: ElementRef = inject(ElementRef)
    pressed: WritableSignal<boolean> = signal(false)

    constructor() {
        afterNextRender(() => {
            const detailsElement = this.#_elementRef.nativeElement.querySelector('details')
            const summaryElement = this.#_elementRef.nativeElement.querySelector('summary')
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
