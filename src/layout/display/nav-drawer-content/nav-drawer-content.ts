import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    EventEmitter,
    Input,
    Output,
    Signal,
    ViewEncapsulation
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpacerBlock } from "@/shared/display/spacer-block/spacer-block";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PopupSelection } from "@/shared/display/popup-selection/popup-selection";
import { TNavGroup } from "../../types/TNavGroup";
import { UpperCasePipe } from "@angular/common";
import { NavDrawerLinkButton } from "@/layout/display/nav-drawer-content/nav-drawer-link-button/nav-drawer-link-button";
import { NavDrawerItem } from "@/layout/display/nav-drawer-content/nav-drawer-item/nav-drawer-item";

@Component({
    imports: [
        RouterModule,
        SpacerBlock,
        FormsModule,
        ReactiveFormsModule,
        PopupSelection,
        UpperCasePipe,
        NavDrawerLinkButton,
        NavDrawerItem
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'nav-drawer-content',
    host: {},
    templateUrl: 'nav-drawer-content.html',
    styleUrl: 'nav-drawer-content.scss',
    encapsulation: ViewEncapsulation.None,
})
export class NavDrawerContent {
    @Input() navGroupList!: TNavGroup[]
    @Input() colorScheme!: Signal<"auto" | "light" | "dark">
    @Output() setColorScheme: EventEmitter<"auto" | "light" | "dark"> = new EventEmitter()
    @Output() closeNavDrawer: EventEmitter<void> = new EventEmitter()
}
