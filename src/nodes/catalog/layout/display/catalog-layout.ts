import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
    imports: [ CommonModule, RouterModule ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.Emulated,
    styles: `
    `,
    selector: 'catalog-layout',
    host: { 'role': 'main' },
    template: `
        <router-outlet ></router-outlet >
    `,
    providers: []
})
export class CatalogLayout {

    constructor() {
    }
}
