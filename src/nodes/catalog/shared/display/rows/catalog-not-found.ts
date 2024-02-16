import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageBreadcrumbs } from "@/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/shared/display/rows/page-title";

@Component({
    imports: [
        CommonModule,
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
        <page-breadcrumbs />
        <page-title title="404 Not Found" />
    `,
    providers: []
})
export class CatalogNotFound {
}
