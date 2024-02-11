import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { PageBreadcrumbs } from "@/app/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/app/shared/display/rows/page-title";

@Component({
    imports: [ CommonModule, RouterModule, PageBreadcrumbs, PageTitle ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'not-found-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs/>
        <page-title title="404 Not Found"/>
    `,
    // encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-inserts";
        :host {
            @include PAGE_RULE_SET;
        }
    `,
    providers: []
})
export class NotFoundNode {
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle("404 Not Found")
    }
}
