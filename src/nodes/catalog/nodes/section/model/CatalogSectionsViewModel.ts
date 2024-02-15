import { inject, Injectable, NgZone, signal, Signal, WritableSignal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TCardCollection } from "@/shared/types/TCardCollection";
import { GetCatalogSectionStableContentOption } from "../options/GetCatalogSectionStableContentOption";
import { TCatalogSectionStableContent } from "../types/TCatalogSectionStableContent";

@Injectable()
export class CatalogSectionsViewModel {
    readonly fakeAssortmentCardList: TCardCollection = [
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/home-sink.png",
            title: "ВСЕ МОЙКИ",
            description: "",
            outLink: "/catalogs/25"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/andano_1108213833362699_300x200__1_.jpg",
            title: "Andano",
            description: "Мойки из нержавеющей стали толщиной 0.9 мм",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/axia_2142023235662664_300x200__1_.jpg",
            title: "Axia",
            description: "Многофункциональные мойки с двумя чашами из искусственного камня",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/claron_1200465032336578_300x200__1_.jpg",
            title: "Claron",
            description: "Мойки из нержавеющей стали толщиной 1.1 мм",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/dalago_2100022121635052_300x200.jpg",
            title: "Dalago",
            description: "Мойки с широкой площадкой под смеситель из искусственного камня",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/elon_1518448212636457_300x200.jpg",
            title: "Elon",
            description: "Мойки из исксственного камня с расширяемым с помощью решетки крылом",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/etagon_1210298603486074_300x200.jpg",
            title: "Etagon",
            description: "Трехуровневые мойки с одной чашей без крыла из камня, стали или керамики",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/flow_1432194116976426_300x200.jpg",
            title: "Flow",
            description: "Мойки Premium класса из нержавющей стали с однй чашей и крылом",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/lantos_1247395690969743_300x200.jpg",
            title: "Lantos",
            description: "Небольшие мойки из нержавющей стали с однй чашей и крылом",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/legra_1228159471543784_300x200.jpg",
            title: "Legra",
            description: "Прямоугольные мойки из искусственного камня",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/metra_1357529573323069_300x200.jpg",
            title: "Metra",
            description: "Мойки из искусственного камня с плоскими краями",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/pleon_1211283199659201_300x200.jpg",
            title: "Pleon",
            description: "Глубокие мойки из искусственного камня",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/solis_1829332175142056_300x200.jpg",
            title: "Solis",
            description: "Мойки из нержавеющей стали",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/supra_1428077867825790_300x200.jpg",
            title: "Supra",
            description: "Мойки из нержавеющей стали с небольшой чашей",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/subline_1208451060726269_300x200.jpg",
            title: "Subline",
            description: "Мойки из искусственного камня для подстольного монтажа",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/tipo_1235151915740685_300x200.jpg",
            title: "Tipo",
            description: "Недорогие мойки из нержавеющей стали",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/zenar_2038298922590130_300x200.jpg",
            title: "Zenar",
            description: "Мойки из искусственного камня с площадкой под смеситель",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/zerox_1358148340156172_300x200.jpg",
            title: "Zerox",
            description: "Мойки из нержавеющей стали с прямолинейными углами",
            outLink: "/catalogs/29"
        },
        {
            T: "TAssortmentCard",
            imageUrl: "/assets/images/sections/zia_1429583959253797_300x200.jpg",
            title: "Zia",
            description: "Оборачиваемые мойки из искусственного камня",
            outLink: "/catalogs/29"
        },
    ]
    readonly fakeCatalogProductCardList: TCardCollection = [
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

    #_route: ActivatedRoute = inject(ActivatedRoute)
    #_ngZone: NgZone = inject(NgZone)
    #_getStableContentOption: GetCatalogSectionStableContentOption = inject(GetCatalogSectionStableContentOption)

    /** Route Arguments. */
    #_catalogNavId!: string
    #_catalogSectionNavId!: string

    /** Stable Content. */
    #_stableContentState: WritableSignal<"loading" | "success" | "404" | "error"> = signal("error")
    stableContentState: Signal<"loading" | "success" | "404" | "error"> = this.#_stableContentState.asReadonly()
    #_stableContent: WritableSignal<TCatalogSectionStableContent | null> = signal(null)
    stableContent: Signal<TCatalogSectionStableContent | null> = this.#_stableContent.asReadonly()

    /** Initialization Block. */
    constructor() {
        this.#_catalogNavId = this.#_route.snapshot.params['catalogNavId']
        this.#_catalogSectionNavId = this.#_route.snapshot.params['catalogSectionNavId'] ?? '0'
        this.doStartInitialization()
    }

    doStartInitialization(): void {
        if (this.#_stableContentState() === "loading"){
            return
        }
        this.#_ngZone.run(() => {
            this.#_stableContentState.set("loading")
            this.#_getStableContentOption.invoke(
                  this.#_catalogNavId,
                  this.#_catalogSectionNavId,
                  ""
            ).subscribe({
                next: (stableContent) => {
                    // initFieldsStates(
                    //       filterConfig = stableContent.filterConfig,
                    //       queryString = queryStringState.value,
                    // )
                    // getDynamicContent()
                    this.#_stableContent.set(stableContent)
                    this.#_stableContentState.set("success")
                    // console.log('CatalogSectionPage SUCCESS')
                },
                error: (err) => {
                    if(err.status === 404) {
                        this.#_stableContentState.set("404")
                    } else {
                        this.#_stableContentState.set("error")
                    }
                }
            })
        })
    }
}
