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
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { SpacerBlock } from "@/shared/display/spacer-block/spacer-block";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PopupFieldset } from "@/shared/display/popup-fieldset/popup-fieldset";

@Component({
    imports: [
        CommonModule,
        RouterModule,
        SpacerBlock,
        FormsModule,
        ReactiveFormsModule,
        PopupFieldset
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
    @Input() colorScheme!: Signal<"auto" | "light" | "dark">
    @Input() stableContentState!: Signal<"loading" | "success" | "error">
    @Output() setColorScheme: EventEmitter<"auto" | "light" | "dark"> = new EventEmitter()
}
