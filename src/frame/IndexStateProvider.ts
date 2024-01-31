import {
    afterNextRender,
    computed,
    effect, EffectRef,
    inject,
    Injectable, Injector,
    NgZone, PLATFORM_ID,
    Signal,
    signal,
    WritableSignal
} from "@angular/core";
import {
    config,
    debounce,
    debounceTime,
    from,
    fromEvent,
    interval,
    map,
    Observable,
    scan,
    throttleTime,
    timer
} from "rxjs";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class IndexStateProvider {

    #_platformId: Object = inject(PLATFORM_ID)
    #_ngZone: NgZone = inject(NgZone)
    #_injector: Injector = inject(Injector)

    constructor() {
        if (isPlatformBrowser(this.#_platformId)) {
        }
        afterNextRender(() => {
            setTimeout(() => {
                this.updateFrameDimensions()
            })
            fromEvent(window, 'resize')
                  .pipe(throttleTime(400, undefined, { leading: false, trailing: true }))
                  .subscribe(() => {
                      document.documentElement.classList.add('disable-transitions')
                      this.updateFrameDimensions()
                  })
            // effect(() => {
            //     this.navDrawerShown() || this.modalWindowShown()
            //           ? document.documentElement.classList.add('clip-scroll') // Clip запрещает любую прокрутку, включая программную прокрутку.
            //           : document.documentElement.classList.remove('clip-scroll')
            // }, {injector: this.#_injector})
            fromEvent(window, 'resize')
                  .pipe(debounceTime(500))
                  .subscribe(() => {
                      document.documentElement.classList.remove('disable-transitions')
                  })
        })
    }

    #_windowInnerWidth: WritableSignal<number> = signal(0)
    windowInnerWidth: Signal<number> = this.#_windowInnerWidth.asReadonly()

    #_windowInnerHeight: WritableSignal<number> = signal(0)
    windowInnerHeight: Signal<number> = this.#_windowInnerHeight.asReadonly()

    #_documentOffsetWidth: WritableSignal<number> = signal(0)
    documentOffsetWidth: Signal<number> = this.#_documentOffsetWidth.asReadonly()

    #_documentClientHeight: WritableSignal<number> = signal(0)
    documentClientHeight: Signal<number> = this.#_documentClientHeight.asReadonly()

    #_documentScrollbarWidth: WritableSignal<number> = signal(0)
    documentScrollbarWidth: Signal<number> = this.#_documentScrollbarWidth.asReadonly()

    navDrawerShown: WritableSignal<boolean> = signal(false)

    isMobileInPortraitOnly: Signal<boolean> = computed(() => {
        // Синхронно с @media (max-width: $maxPhoneViewportWidth).
        return this.#_windowInnerWidth() < 600
    })
    isMobileInLandscapeOnly: Signal<boolean> = computed(() => {
        // Синхронно с @media (max-width: $maxPhoneViewportHeight) and (max-height: $maxPhoneViewportWidth).
        return this.#_windowInnerWidth() < 1000 && this.#_windowInnerHeight() < 600
    })
    isMobileInAllOrientations: Signal<boolean> = computed(() => {
        // Синхронно с @media (max-width: $maxPhoneViewportWidth), (max-width: $maxPhoneViewportHeight) and (max-height: $maxPhoneViewportWidth).
        return this.#_windowInnerWidth() < 600 || (this.#_windowInnerWidth() < 1000 && this.#_windowInnerHeight() < 600)
    })
    isDesktopOrTablet: Signal<boolean> = computed(() => {
        // @media (min-width: $maxPhoneViewportWidth + 0.01px) and (min-height: $maxPhoneViewportWidth + 0.01px), (min-width: $maxPhoneViewportHeight + 0.01px).
        return (this.#_windowInnerWidth() >= 600 && this.#_windowInnerHeight() >= 600) || this.#_windowInnerWidth() >= 1000
    })

    private updateFrameDimensions() {
        this.#_ngZone.run(() => {
            this.#_windowInnerWidth.set(window.innerWidth)
            this.#_windowInnerHeight.set(window.innerHeight)
            this.#_documentOffsetWidth.set(document.documentElement.offsetWidth)
            this.#_documentClientHeight.set(document.documentElement.clientHeight)
            this.#_documentScrollbarWidth.set(window.innerWidth - document.documentElement.offsetWidth)
        })
        document.documentElement.style.setProperty("--sw", window.innerWidth - document.documentElement.offsetWidth + "px")
    }
}
