import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from '@angular/core';
import { TestUiViewModel } from "../model/TestUiViewModel";
import { Title } from "@angular/platform-browser";
import { PageBreadcrumbs } from "@/shared/display/page-breadcrumbs/page-breadcrumbs";
import { PageTitle } from "@/shared/display/page-title/page-title";
import { TestIconButton } from "@/nodes/test-ui/display/test-icon-button/test-icon-button";
import { TestBaseButton } from "@/nodes/test-ui/display/test-base-button/test-base-button";
import { TestTextField } from "@/nodes/test-ui/display/test-text-field/test-text-field";

@Component({
    imports: [
        PageBreadcrumbs,
        PageTitle,
        TestIconButton,
        TestBaseButton,
        TestTextField
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'test-ui-node',
    host: { 'role': 'main' },
    templateUrl: 'test-ui-node.html',
    styleUrl: 'test-ui-node.scss',
    encapsulation: ViewEncapsulation.None,
    providers: [
        TestUiViewModel,
    ]
})
export class TestUiNode {
    viewModel: TestUiViewModel = inject(TestUiViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle("Test UI")
    }
}
