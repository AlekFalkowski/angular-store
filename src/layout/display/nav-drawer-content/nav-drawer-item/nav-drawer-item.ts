import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { TNavDrawerItem } from "@/layout/types/TNavDrawerItem";
import { NavDrawerLinkButton } from "@/layout/display/nav-drawer-content/nav-drawer-link-button/nav-drawer-link-button";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NavDrawerDirectory } from "@/layout/display/nav-drawer-content/nav-drawer-directory/nav-drawer-directory";

@Component({
    imports: [
        NavDrawerLinkButton,
        RouterLink,
        RouterLinkActive,
        NavDrawerDirectory
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'nav-drawer-item.scss',
    selector: 'nav-drawer-item',
    host: {},
    templateUrl: 'nav-drawer-item.html',
})
export class NavDrawerItem {
    @Input() navDrawerItem!: TNavDrawerItem
    @Output() closeNavDrawer: EventEmitter<void> = new EventEmitter()
}
