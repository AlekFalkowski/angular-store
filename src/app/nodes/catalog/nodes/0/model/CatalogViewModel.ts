import { afterNextRender, computed, inject, Injectable, Signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { fromEvent, Subscription, throttleTime } from "rxjs";
import { ObservePreferredSidePanelViewOption } from "../options/ObservePreferredSidePanelViewOption";
import { SetPreferredSidePanelViewOption } from "../options/SetPreferredSidePanelViewOption";
import { TPreferredSidePanelView } from "../types/TPreferredSidePanelView";
import { TCardCollection } from "@/app/shared/types/TCardCollection";

@Injectable()
export class CatalogViewModel {
    #_route: ActivatedRoute = inject(ActivatedRoute)
    // private getStableContentOption: GetStableContentOption = inject(GetStableContentOption)
    readonly catalogNavId!: string
    // public stableContent: StableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }
    readonly fakeCatalogProductCardList!: TCardCollection
    afr: Subscription | undefined

    constructor(
          private observePreferredSidePanelViewOption: ObservePreferredSidePanelViewOption,
          private setPreferredSidePanelViewOption: SetPreferredSidePanelViewOption
    ) {
        // this.route.url.subscribe(console.log)
        // this.#_route.url.subscribe((event) => {
        //     console.log(event)
        //     // console.log(event[0]); // It's an array remember [0]
        //     // console.log(event[0].path); // e.g. /products
        //     // console.log(event[0].parameters); // e.g. { id: 'x8klP0' }
        // })
        this.catalogNavId = this.#_route.snapshot.params['catalogNavId']
        // this.getStableContentOption.invoke().then((content) => {
        //     this.stableContent = content
        // })
        this.fakeStableContent = {
            htmlHeadTitle: `Каталог № ${ this.catalogNavId }`,
            pageTitle: `Каталог № ${ this.catalogNavId }`
        }
        this.fakeCatalogProductCardList = [
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 1",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/31"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 2",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 3",
                price: "40000 руб.",
                // outLink: "/catalogs/289"
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 4",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/34"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 5",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/35"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 1",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/31"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 2",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 3",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 4",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/34"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 5",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/35"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 1",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/31"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 2",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 3",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 4",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/34"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 5",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/35"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 1",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/31"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 2",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 3",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 4",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/34"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 5",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/35"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 1",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/31"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 2",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 3",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 4",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/34"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 5",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/35"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 1",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/31"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 2",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 3",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 4",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/34"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 5",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/35"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 1",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/31"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 2",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 3",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 4",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/34"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 5",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/35"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 1",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/31"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 2",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 3",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/32"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 4",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/34"
            },
            {
                T: "TCatalogProductCard",
                imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойка 5",
                price: "40000 руб.",
                outLink: "/catalogs/25/products/35"
            },
        ]

        afterNextRender(() => {
            this.afr = fromEvent(window, 'resize').pipe(throttleTime(400)).subscribe(() => {
                // console.log('aiaiaia')
            })
        })
    }

    ngOnDestroy(): void { // Запускается один раз, прежде чем компонент будет уничтожен.
        this.afr?.unsubscribe()
    }

    preferredSidePanelView: Signal<TPreferredSidePanelView> = computed(() => {
        const inputValue: string | null = this.observePreferredSidePanelViewOption.invoke()
        switch (inputValue) {
            case "hidden":
                return inputValue
            default:
                return "visible"
        }
    })

    setPreferredSidePanelView(value: TPreferredSidePanelView): void {
        this.setPreferredSidePanelViewOption.invoke(value)
    }
}
