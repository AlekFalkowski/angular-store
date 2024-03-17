import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    imports: [ RouterModule ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
    `,
    selector: 'catalog-layout',
    host: {},
    template: `
        <router-outlet></router-outlet>
    `,
    providers: []
})
export class CatalogLayout {
}
