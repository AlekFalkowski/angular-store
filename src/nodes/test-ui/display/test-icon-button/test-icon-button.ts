import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { IconButton } from "@/shared/display/icon-button/icon-button";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    imports: [
        IconButton,
        RouterLink,
        RouterLinkActive
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'test-icon-button',
    host: {},
    templateUrl: 'test-icon-button.html',
    styleUrl: 'test-icon-button.scss',
    encapsulation: ViewEncapsulation.None,
})
export class TestIconButton {
    iconButton1Pressed: boolean = false
    iconButton2Pressed: boolean = false
    iconButton3Pressed: boolean = false
    iconButton4Pressed: boolean = false
}
