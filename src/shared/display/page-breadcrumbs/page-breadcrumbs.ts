import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewEncapsulation } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IconButton } from "@/shared/display/icon-button/icon-button";

@Component({
    imports: [
        RouterModule,
        IconButton
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'page-breadcrumbs',
    host: {},
    templateUrl: 'page-breadcrumbs.html',
    styleUrl: 'page-breadcrumbs.scss',
    encapsulation: ViewEncapsulation.None,
})
export class PageBreadcrumbs {
    @Input() breadcrumbList: string[] = []
    @Input() link: string = ""
}
