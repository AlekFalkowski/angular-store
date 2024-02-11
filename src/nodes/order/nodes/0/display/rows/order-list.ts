import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    imports: [ CommonModule ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.Emulated,
    styles: `
        @import "all-config";
        :host {
            grid-column: 2;
            padding-inline: var(--inline-padding);
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
