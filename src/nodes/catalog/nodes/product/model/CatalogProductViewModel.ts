import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class CatalogProductViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    readonly catalogNavId = this.route.snapshot.params['catalogNavId']
    readonly catalogProductNavId = this.route.snapshot.params['catalogProductNavId']
    readonly fakeStableContent = {
        htmlHeadTitle: `Продукт № ${ this.catalogProductNavId } из каталога № ${ this.catalogNavId }`,
        pageTitle: `Продукт № ${ this.catalogProductNavId } из каталога № ${ this.catalogNavId }`
    }
}
