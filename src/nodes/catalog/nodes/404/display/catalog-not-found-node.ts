import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { CatalogNotFound } from "@/nodes/catalog/shared/display/catalog-not-found/catalog-not-found";

@Component({
    imports: [
        CatalogNotFound
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'catalog-not-found-node',
    host: { 'role': 'main' },
    template: `
        <catalog-not-found/>
    `,
    styles: `
        @import "all-config";
        catalog-not-found-node {
            max-width: $base-max-width;
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
        }
    `,
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class CatalogNotFoundNode {
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle("404 Not Found")
    }
}
