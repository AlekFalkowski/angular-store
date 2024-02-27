import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
    imports: [ CommonModule, RouterModule ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        page-breadcrumbs {
            padding-inline: var(--inline-padding);
            height: 54px;
            display: grid;
            grid-template-columns: minmax(0, 1fr) 32px;
            align-items: center;

            & > [data-e="breadcrumbs"] {
                display: flex;
                align-items: center;

                & > [data-e="home-button"] {
                    margin-inline-start: -11px;
                    margin-inline-end: 4px;
                    margin-top: -2px;
                }
            }
            & > [data-e="share-button"] {
                grid-column: 2;
                justify-self: end;
                margin-inline-end: -10px;
                margin-top: -2px;
            }
        }
    `,
    selector: 'page-breadcrumbs',
    host: {},
    template: `
        <div data-e="breadcrumbs">
            <!-- @if (link) { -->
            <md-icon-button data-e="home-button" [routerLink]="['/']" aria-label="Home">
                <md-icon translate="no">home</md-icon>
            </md-icon-button>
            TODO ( breadcrumbs )
            <!-- } -->
        </div>
        <md-icon-button data-e="share-button" aria-label="Share">
            <md-icon translate="no">share</md-icon>
        </md-icon-button>
    `,
})
export class PageBreadcrumbs {
    @Input() breadcrumbList: string[] = []
    @Input() link: string = ""
}
