import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
    imports: [ CommonModule, RouterModule ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'page-breadcrumbs',
    host: {},
    template: `
        <div>
            <!-- @if (link) { -->
            <md-icon-button [routerLink]="['/']" aria-label="Home">
                <md-icon translate="no">home</md-icon>
            </md-icon-button>
            TODO ( breadcrumbs )
            <!-- } -->
        </div>
        <md-icon-button  aria-label="Shared">
            <md-icon translate="no">share</md-icon>
        </md-icon-button>
    `,
    // encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-inserts";

        :host {

    grid-column: 2;
    padding-inline: var(--side-padding);
            height: 54px;
            display: grid;
            grid-template-columns: minmax(0, 1fr) 32px;
            align-items: center;
        }
        :host > div {
            display: flex;
            align-items: center;
        }
        :host > div > md-icon-button {
            margin-inline-start: -11px;
            margin-inline-end: 4px;
            margin-top: -2px;
        }
        :host > md-icon-button {
            grid-column: 2;
            justify-self: end;
            margin-inline-end: -10px;
            margin-top: -2px;
        }
    `
})
export class PageBreadcrumbs {
    @Input() breadcrumbList: string[] = []
    @Input() link: string = ""
}
