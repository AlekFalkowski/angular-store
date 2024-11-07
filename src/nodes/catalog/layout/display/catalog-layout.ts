import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    imports: [ RouterModule ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'catalog-layout',
    host: {},
    template: `
        <router-outlet></router-outlet>
    `,
    styles: `
    `,
    encapsulation: ViewEncapsulation.None,
    providers: []
})
export class CatalogLayout {
}
