import {
    afterNextRender,
    computed,
    inject,
    Injectable,
    Injector,
    NgZone,
    PLATFORM_ID,
    Signal,
    signal,
    WritableSignal
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { MAX_PHONE_VIEWPORT_HEIGHT, MAX_PHONE_VIEWPORT_WIDTH } from "@/config/breakpoints";
import { debounceTime, fromEvent, throttleTime } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DocumentSizeProvider {

    #_platformId: Object = inject(PLATFORM_ID)
    #_ngZone: NgZone = inject(NgZone)
    #_injector: Injector = inject(Injector)

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

    isMobileInPortraitOnly: Signal<boolean> = computed(() => {
        return this.#_windowInnerWidth() < MAX_PHONE_VIEWPORT_WIDTH
    })
    isMobileInLandscapeOnly: Signal<boolean> = computed(() => {
        return this.#_windowInnerWidth() < MAX_PHONE_VIEWPORT_HEIGHT && this.#_windowInnerHeight() < MAX_PHONE_VIEWPORT_WIDTH
    })
    isMobileInAllOrientations: Signal<boolean> = computed(() => {
        return this.#_windowInnerWidth() < MAX_PHONE_VIEWPORT_WIDTH || (this.#_windowInnerWidth() < MAX_PHONE_VIEWPORT_HEIGHT && this.#_windowInnerHeight() < MAX_PHONE_VIEWPORT_WIDTH)
    })
    isTabletOrDesktop: Signal<boolean> = computed(() => {
        return this.#_windowInnerWidth() >= MAX_PHONE_VIEWPORT_HEIGHT || (this.#_windowInnerWidth() >= MAX_PHONE_VIEWPORT_WIDTH && this.#_windowInnerHeight() >= MAX_PHONE_VIEWPORT_WIDTH)
    })

    constructor() {
        if (isPlatformBrowser(this.#_platformId)) {
        }
        afterNextRender(() => {
            setTimeout(() => {
                this.#_updateDocumentSizes()
            })
            fromEvent(window, 'resize')
                .pipe(throttleTime(400, undefined, { leading: false, trailing: true }))
                .subscribe(() => {
                    document.documentElement.classList.add('disable-transitions')
                    this.#_updateDocumentSizes()
                })
            fromEvent(window, 'resize')
                .pipe(debounceTime(500))
                .subscribe(() => {
                    document.documentElement.classList.remove('disable-transitions')
                })
        })
    }

    #_updateDocumentSizes() {
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
