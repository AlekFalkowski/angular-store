import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    imports: [ CommonModule ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    // encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-inserts";
        :host {
            grid-column: 2;
            padding-inline: var(--side-padding);
            background-color: var(--md-sys-color-surface-container-low);
        }
    `,
    selector: 'order-list',
    template: `
        <div>ORDER_LIST_ROW</div>
    `,
})
export class OrderList {
}
