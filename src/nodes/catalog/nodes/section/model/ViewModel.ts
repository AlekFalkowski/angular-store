import { inject, Injectable, NgZone, signal, Signal, WritableSignal } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { GetDynamicContentOption } from "../options/GetDynamicContenOption";
import { GetStableContentOption } from "../options/GetStableContentOption";
import { ObserveQueryStringOption } from "../options/ObserveQueryStringOption";
import { SaveQueryStringOption } from "../options/SaveQueryStringOption";
import { TDynamicContent } from "../types/TDynamicContent";
import { TStableContent } from "../types/TStableContent";
import { TCardCollection } from "@/shared/types/TCardCollection";
import { TFieldSet } from "@/shared/types/TFieldSet";
import { Location } from "@angular/common";

@Injectable()
export class ViewModel {
    readonly fakeAssortmentCardList: TCardCollection = [
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/home-sink.png",
            title: "Все серии",
            description: "",
            outLink: "/catalogs/1/sections/all"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/andano_1108213833362699_300x200__1_.jpg",
            title: "Andano",
            description: "Мойки из нержавеющей стали толщиной 0.9 мм",
            outLink: "/catalogs/1/sections/1"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/axia_2142023235662664_300x200__1_.jpg",
            title: "Axia",
            description: "Многофункциональные мойки с двумя чашами из искусственного камня",
            outLink: "/catalogs/1/sections/2"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/claron_1200465032336578_300x200__1_.jpg",
            title: "Claron",
            description: "Мойки из нержавеющей стали толщиной 1.1 мм",
            outLink: "/catalogs/1/sections/3"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/dalago_2100022121635052_300x200.jpg",
            title: "Dalago",
            description: "Мойки с широкой площадкой под смеситель из искусственного камня",
            outLink: "/catalogs/1/sections/4"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/elon_1518448212636457_300x200.jpg",
            title: "Elon",
            description: "Мойки из исксственного камня с расширяемым с помощью решетки крылом",
            outLink: "/catalogs/1/sections/5"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/etagon_1210298603486074_300x200.jpg",
            title: "Etagon",
            description: "Трехуровневые мойки с одной чашей без крыла из камня, стали или керамики",
            outLink: "/catalogs/1/sections/6"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/flow_1432194116976426_300x200.jpg",
            title: "Flow",
            description: "Мойки Premium класса из нержавющей стали с однй чашей и крылом",
            outLink: "/catalogs/1/sections/7"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/lantos_1247395690969743_300x200.jpg",
            title: "Lantos",
            description: "Небольшие мойки из нержавющей стали с однй чашей и крылом",
            outLink: "/catalogs/1/sections/8"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/legra_1228159471543784_300x200.jpg",
            title: "Legra",
            description: "Прямоугольные мойки из искусственного камня",
            outLink: "/catalogs/1/sections/9"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/metra_1357529573323069_300x200.jpg",
            title: "Metra",
            description: "Мойки из искусственного камня с плоскими краями",
            outLink: "/catalogs/1/sections/10"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/pleon_1211283199659201_300x200.jpg",
            title: "Pleon",
            description: "Глубокие мойки из искусственного камня",
            outLink: "/catalogs/1/sections/11"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/solis_1829332175142056_300x200.jpg",
            title: "Solis",
            description: "Мойки из нержавеющей стали",
            outLink: "/catalogs/1/sections/12"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/supra_1428077867825790_300x200.jpg",
            title: "Supra",
            description: "Мойки из нержавеющей стали с небольшой чашей",
            outLink: "/catalogs/1/sections/13"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/subline_1208451060726269_300x200.jpg",
            title: "Subline",
            description: "Мойки из искусственного камня для подстольного монтажа",
            outLink: "/catalogs/1/sections/14"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/zenar_2038298922590130_300x200.jpg",
            title: "Zenar",
            description: "Мойки из искусственного камня с площадкой под смеситель",
            outLink: "/catalogs/1/sections/15"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/zerox_1358148340156172_300x200.jpg",
            title: "Zerox",
            description: "Мойки из нержавеющей стали с прямолинейными углами",
            outLink: "/catalogs/1/sections/16"
        },
        {
            type: "TAssortmentCard",
            imageUrl: "/assets/images/sections/zia_1429583959253797_300x200.jpg",
            title: "Zia",
            description: "Оборачиваемые мойки из искусственного камня",
            outLink: "/catalogs/1/sections/17"
        },
    ]
    readonly fakeCatalogProductCardList: TCardCollection = [
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 1",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/31"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 2",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 3",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 4",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/34"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 5",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/35"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 1",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/31"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 2",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 3",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 4",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/34"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 5",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/35"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 1",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/31"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 2",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 3",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 4",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/34"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 5",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/35"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 1",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/31"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 2",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 3",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 4",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/34"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 5",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/35"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 1",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/31"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 2",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 3",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 4",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/34"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 5",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/35"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 1",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/31"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 2",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 3",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 4",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/34"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 5",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/35"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 1",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/31"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 2",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 3",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 4",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/34"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 5",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/35"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 1",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/31"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 2",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 3",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/32"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 4",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/34"
        },
        {
            type: "TCatalogProductCard",
            imageUrl: "/assets/images/catalog-card.jpg",
            title: "Мойка 5",
            price: "40000 руб.",
            outLink: "/catalogs/25/products/35"
        },
    ]
    #_ngZone: NgZone = inject(NgZone)
    #_route: ActivatedRoute = inject(ActivatedRoute)
    #_router: Router = inject(Router)
    #_location: Location = inject(Location)
    #_getDynamicContentOption: GetDynamicContentOption = inject(GetDynamicContentOption)
    #_getStableContentOption: GetStableContentOption = inject(GetStableContentOption)
    #_observeQueryStringOption: ObserveQueryStringOption = inject(ObserveQueryStringOption)
    #_saveQueryStringOption: SaveQueryStringOption = inject(SaveQueryStringOption)

    constructor() {
        this.doStartInitialization()
    }

    doStartInitialization(): void {
        if (this.#_stableContentState() === "loading") {
            return
        }
        this.#_ngZone.run(() => {
            this.#_stableContentState.set("loading")
            this.#_getStableContentOption.invoke("").subscribe({
                next: (stableContent) => {
                    // const queryMap =
                    //       this.#_convertQueryStringToQueryMap(this.#_observeQueryStringOption.invoke() ?? "")
                    this.#_initFieldStates(
                        stableContent?.filterConfig ?? [],
                        // queryMap
                        this.#_route.snapshot.queryParams
                    )
                    // this.getDynamicContent()
                    this.#_stableContent.set(stableContent)
                    this.#_stableContentState.set("success")
                },
                error: (err) => {
                    if (err.status === 404) {
                        this.#_stableContentState.set("404")
                    } else {
                        this.#_stableContentState.set("error")
                    }
                }
            })
        })
    }

    #_stableContentState: WritableSignal<"loading" | "success" | "404" | "error"> = signal("error")
    stableContentState: Signal<"loading" | "success" | "404" | "error"> = this.#_stableContentState.asReadonly()
    #_stableContent: WritableSignal<TStableContent | null> = signal(null)
    stableContent: Signal<TStableContent | null> = this.#_stableContent.asReadonly()

    multiChoiceFieldStates: Map<string, Set<string>> = new Map()
    singleChoiceFieldStates: Map<string, string> = new Map()
    singleChoiceFieldDefaultValues: Map<string, string> = new Map()
    textFieldStates: Map<string, string> = new Map()
    // #_initFieldStates(filterConfig: TFieldSet[], queryMap: Map<string, Set<string>>): void {
    //     filterConfig.map(fieldSet => {
    //         fieldSet.fieldList.map(field => {
    //             switch (field.type) {
    //                 case "TMultiChoiceField":
    //                     this.multiChoiceFieldStates.set(field.name, new Set(
    //                           field.options
    //                                 ?.map(option => {
    //                                     return option.value
    //                                 })
    //                                 ?.filter(optionValue => {
    //                                     return queryMap.get(field.name)?.has(optionValue)
    //                                 })
    //                     ))
    //                     break
    //                 case "TSingleChoiceField":
    //                     // this.singleChoiceFieldsStates.set(field.name, queryMap.get(field.name)?.values()?.next()?.value ?? "")
    //                     this.singleChoiceFieldStates.set(field.name, queryMap.get(field.name)?.values()?.next()?.value ?? field.defaultOptionValue)
    //                     this.singleChoiceFieldDefaultValues.set(field.name, field.defaultOptionValue ?? "")
    //                     break
    //
    //                 case "TRangeField":
    //                     this.textFieldStates.set(field.name, queryMap.get(field.name)?.values()?.next()?.value ?? "")
    //                     if (field.endName) {
    //                         this.textFieldStates.set(field.endName, queryMap.get(field.endName)?.values()?.next()?.value ?? "")
    //                     }
    //                     break
    //                 case "TTextField":
    //                     this.textFieldStates.set(field.name, queryMap.get(field.name)?.values()?.next()?.value ?? "")
    //                     break
    //             }
    //         })
    //     })
    // }
    #_initFieldStates(filterConfig: TFieldSet[], queryParamMap: Params): void {
        filterConfig.map(fieldSet => {
            fieldSet.fieldList.map(field => {
                switch (field.type) {
                    case "TMultiChoiceField": {
                        this.multiChoiceFieldStates.set(field.name, new Set(
                            field.options
                                ?.map(option => {
                                    return option.value
                                })
                                ?.filter(optionValue => {
                                    switch (typeof queryParamMap[field.name]) {
                                        case "object":
                                            return queryParamMap[field.name]?.includes(optionValue)
                                        case "string":
                                            return queryParamMap[field.name] === optionValue
                                        default:
                                            return false
                                    }
                                })
                        ))
                        break
                    }
                    case "TSingleChoiceField": {
                        this.singleChoiceFieldStates.set(
                            field.name,
                            typeof queryParamMap[field.name] === "object"
                                ? queryParamMap[field.name]?.[0] ?? field.defaultOptionValue ?? ""
                                : queryParamMap[field.name] as string | undefined ?? field.defaultOptionValue ?? ""
                        )
                        this.singleChoiceFieldDefaultValues.set(field.name, field.defaultOptionValue ?? "")
                        break
                    }
                    case "TRangeField": {
                        this.textFieldStates.set(
                            field.name,
                            typeof queryParamMap[field.name] === "object"
                                ? queryParamMap[field.name]?.[0] ?? ""
                                : queryParamMap[field.name] as string | undefined ?? ""
                        )
                        if (field.endName) {
                            this.textFieldStates.set(
                                field.endName,
                                typeof queryParamMap[field.endName] === "object"
                                    ? queryParamMap[field.endName]?.[0] ?? ""
                                    : queryParamMap[field.endName] as string | undefined ?? ""
                            )
                        }
                        break
                    }
                    case "TTextField": {
                        this.textFieldStates.set(
                            field.name,
                            typeof queryParamMap[field.name] === "object"
                                ? queryParamMap[field.name]?.[0] ?? ""
                                : queryParamMap[field.name] as string | undefined ?? ""
                        )
                        break
                    }
                }
            })
        })
    }

    cleanFieldStates(): void {
        this.multiChoiceFieldStates.forEach((value, name) => {
            value.clear()
        })
        this.singleChoiceFieldStates.forEach((value, name, map) => {
            map.set(name, this.singleChoiceFieldDefaultValues.get(name) ?? '')
        })
        this.textFieldStates.forEach((value, name, map) => {
            map.set(name, '')
        })
    }

    #_dynamicContentState: WritableSignal<"loading" | "success" | "error"> = signal("error")
    dynamicContentState: Signal<"loading" | "success" | "error"> = this.#_dynamicContentState.asReadonly()
    #_dynamicContent: WritableSignal<TDynamicContent | null> = signal(null)
    dynamicContent: Signal<TDynamicContent | null> = this.#_dynamicContent.asReadonly()
    getDynamicContent(): void {
        if (this.#_dynamicContentState() === "loading") {
            return
        }
        this.#_ngZone.run(() => {
            this.#_dynamicContentState.set("loading")
            this.#_router.navigate([], {
                queryParams: this.#_convertFilterStateToQueryParams(),
                queryParamsHandling: 'merge',
                replaceUrl: true,
            })
            // const queryString = this.#_convertFilterStateToQueryString()
            // this.#_saveQueryStringOption.invoke(queryString)
            this.#_getDynamicContentOption.invoke("").subscribe({
                next: (dynamicContent) => {
                    this.#_dynamicContent.set(dynamicContent)
                    this.#_dynamicContentState.set("success")
                },
                error: (err) => {
                    this.#_dynamicContentState.set("error")
                }
            })
        })
    }

    #_convertQueryStringToQueryMap(queryString: string): Map<string, Set<string>> {
        const queryMap: Map<string, Set<string>> = new Map()
        queryString
            .trim()
            .replaceAll("%5B", "[")
            .replaceAll("%5D", "]")
            .split("&")
            .forEach(querySector => {
                const queryKV: string[] = querySector.trim().split("=")
                if (queryKV.length > 1) {
                    if (queryMap.get(queryKV[0])) {
                        queryMap.get(queryKV[0])?.add(queryKV[1])
                    } else {
                        queryMap.set(queryKV[0], new Set([ queryKV[1] ]))
                    }
                }
            })
        return queryMap
    }

    // Нужен для формирования ссылки на страницу.
    #_convertFilterStateToQueryString(): string {
        const queryList: string[] = []
        this.multiChoiceFieldStates.forEach((value, name) => {
            value.forEach(value => {
                if (value !== "") {
                    queryList.push(`${ name }=${ value }`)
                }
            })
        })
        this.singleChoiceFieldStates.forEach((value, name) => {
            if (value !== this.singleChoiceFieldDefaultValues.get(name)) {
                queryList.push(`${ name }=${ value }`)
            }
        })
        this.textFieldStates.forEach((value, name) => {
            if (value !== "") {
                queryList.push(`${ name }=${ value }`)
            }
        })
        return queryList.join("&")
    }

    #_convertFilterStateToQueryParams(): Params {
        const queryParams: Params = {}
        this.multiChoiceFieldStates.forEach((value, name) => {
            value.forEach(value => {
                if (value !== "") {
                    if (queryParams[name]) {
                        queryParams[name].push(value)
                    } else {
                        queryParams[name] = [ value ]
                    }
                }
            })
        })
        this.singleChoiceFieldStates.forEach((value, name) => {
            if (value !== this.singleChoiceFieldDefaultValues.get(name)) {
                queryParams[name] = [ value ]
            }
        })
        this.textFieldStates.forEach((value, name) => {
            if (value !== "") {
                queryParams[name] = [ value ]
            }
        })
        return queryParams
    }
}
