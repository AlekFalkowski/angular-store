import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    EventEmitter,
    Input,
    Output,
    signal,
    Signal,
    ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpacerBlock } from "@/shared/display/spacer-block/spacer-block";

@Component({
    imports: [
        RouterModule,
        SpacerBlock
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'nav-drawer.scss',
    selector: 'nav-drawer',
    host: { '[class.visible]': "visible()" },
    templateUrl: 'nav-drawer.html',
})
export class NavDrawer {
    @Input() visible: Signal<boolean> = signal(false)
    @Output() closeNavDrawer: EventEmitter<void> = new EventEmitter()
}
