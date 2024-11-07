import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { IconButton } from "@/shared/display/icon-button/icon-button";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { BaseButton } from "@/shared/display/base-button/base-button";

@Component({
    imports: [
        IconButton,
        RouterLink,
        RouterLinkActive,
        BaseButton
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'test-base-button',
    host: {},
    templateUrl: 'test-base-button.html',
    styleUrl: 'test-base-button.scss',
    encapsulation: ViewEncapsulation.None,
})
export class TestBaseButton {
}
