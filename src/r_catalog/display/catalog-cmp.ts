import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
    imports: [ CommonModule, RouterModule ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    // encapsulation: ViewEncapsulation.None,
    styles: `
    `,
    selector: 'catalog-cmp',
    host: { 'role': 'main' },
    template: `
        <router-outlet ></router-outlet >
    `,
    providers: []
})
export class CatalogCmp {

    constructor() {
    }
}
