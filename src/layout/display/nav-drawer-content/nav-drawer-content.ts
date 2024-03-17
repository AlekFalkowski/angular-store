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
import {
    SwitchersStatusMonitorWithSelectionPopup
} from "@/shared/display/switchers-status-monitor-with-selection-popup/switchers-status-monitor-with-selection-popup";
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
        SwitchersStatusMonitorWithSelectionPopup,
        UpperCasePipe,
        NavDrawerLinkButton,
        NavDrawerItem
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'nav-drawer-content.scss',
    selector: 'nav-drawer-content',
    host: {},
    templateUrl: 'nav-drawer-content.html',
})
export class NavDrawerContent {
    @Input() navGroupList!: TNavGroup[]
    @Input() colorScheme!: Signal<"auto" | "light" | "dark">
    @Output() setColorScheme: EventEmitter<"auto" | "light" | "dark"> = new EventEmitter()
    @Output() closeNavDrawer: EventEmitter<void> = new EventEmitter()
}
