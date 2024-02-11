import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class CatalogProductViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    readonly catalogNavId!: string
    readonly catalogProductNavId!: string
    // private getStableContentOption: GetStableContentOption = inject(GetStableContentOption)
    // public stableContent: StableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }

    constructor() {
        this.catalogNavId = this.route.snapshot.params['catalogNavId']
        this.catalogProductNavId = this.route.snapshot.params['catalogProductNavId']
        // this.getStableContentOption.invoke().then((content) => {
        //     this.stableContent = content
        // })
        this.fakeStableContent = {
            htmlHeadTitle: `Продукт № ${ this.catalogProductNavId } из каталога № ${ this.catalogNavId }`,
            pageTitle: `Продукт № ${ this.catalogProductNavId } из каталога № ${ this.catalogNavId }`
        }
        // console.log(this.route.snapshot)
        // this.route.url.subscribe(console.log)
        // this.route.url.subscribe((event) => {
        //     console.log(event)
        //     // console.log(event[0]); // It's an array remember [0]
        //     // console.log(event[0].path); // e.g. /products
        //     // console.log(event[0].parameters); // e.g. { id: 'x8klP0' }
        // })
        // this.route.queryParams.subscribe(console.log)
    }
}
