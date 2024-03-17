import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from "@angular/core";
import { PageBreadcrumbs } from "@/shared/display/page-breadcrumbs/page-breadcrumbs";
import { PageTitle } from "@/shared/display/page-title/page-title";

@Component({
    imports: [
        PageBreadcrumbs,
        PageTitle
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
    `,
    selector: 'catalog-not-found',
    host: {},
    template: `
        <page-breadcrumbs/>
        <page-title title="404 Not Found"/>
    `,
    providers: []
})
export class CatalogNotFound {
}
