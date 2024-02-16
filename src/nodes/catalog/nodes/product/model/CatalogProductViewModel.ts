import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class CatalogProductViewModel {
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }

    private route: ActivatedRoute = inject(ActivatedRoute)
    readonly catalogNavId!: string
    readonly catalogProductNavId!: string

    constructor() {
        this.catalogNavId = this.route.snapshot.params['catalogNavId']
        this.catalogProductNavId = this.route.snapshot.params['catalogProductNavId']
        this.fakeStableContent = {
            htmlHeadTitle: `Продукт № ${ this.catalogProductNavId } из каталога № ${ this.catalogNavId }`,
            pageTitle: `Продукт № ${ this.catalogProductNavId } из каталога № ${ this.catalogNavId }`
        }
    }
}
