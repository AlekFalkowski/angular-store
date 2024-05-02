import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewEncapsulation } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
    imports: [
        RouterModule
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'page-breadcrumbs.scss',
    selector: 'page-breadcrumbs',
    host: {},
    templateUrl: 'page-breadcrumbs.html',
})
export class PageBreadcrumbs {
    @Input() breadcrumbList: string[] = []
    @Input() link: string = ""
}
