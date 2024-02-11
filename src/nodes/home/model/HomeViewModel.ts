import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TCardCollection } from "@/shared/types/TCardCollection";

@Injectable()
export class HomeViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    // private getStableContentOption: GetStableContentOption = inject(GetStableContentOption)
    // stableContent: StableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }
    // readonly fakeAssortmentCardList!: TAssortmentCard[]
    // readonly fakeAssortmentCardList!: TCatalogProductCard[]
    // readonly fakeAssortmentCardList!: (TCatalogProductCard | TAssortmentCard)[]
    readonly fakeAssortmentCardList!: TCardCollection

    constructor() {
        // this.getStableContentOption.invoke().then((content) => {
        //     this.stableContent = content
        // })
        this.fakeStableContent = {
            htmlHeadTitle: "Магазин Blanco в Москве",
            pageTitle: "Магазин Blanco в Москве"
        }
        this.fakeAssortmentCardList = [
            {
                T: "TAssortmentCard",
                imageUrl: "/assets/images/home-sink.png",
                // imageUrl: "/assets/images/catalog-card.jpg",
                title: "Мойки для кухни",
                description: "Продуманные и качественные мойки",
                outLink: "catalogs/25/sections/25"
            },
            {
                T: "TAssortmentCard",
                imageUrl: "/assets/images/home-tap.png",
                title: "Смесители для кухни",
                description: "Надежные и качественные смесители",
                outLink: "/catalogs/26"
            },
            {
                T: "TAssortmentCard",
                imageUrl: "/assets/images/home-waste.png",
                title: "Мусорные системы",
                description: "Удобные контейнеры для отходов",
                outLink: "/catalogs/27"
            },
            {
                T: "TAssortmentCard",
                imageUrl: "/assets/images/home-care.png",
                title: "Средства по уходу",
                description: "Правильный уход за любыми вещами",
                outLink: "/catalogs/28"
            },
            {
                T: "TAssortmentCard",
                imageUrl: "/assets/images/home-accessories.png",
                title: "Акксесуары",
                description: "Правильное решение для любых требований",
                outLink: "/catalogs/29"
            },
        ]
    }
}
