import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from "@angular/core";

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'order-list',
    template: `
        <div>ORDER_LIST_ROW</div>
    `,
    styles: `
        @import "all-config";
        order-list {
            grid-column: 2;
            padding-inline: var(--inline-padding);
            background-color: var(--md-sys-color-surface-container-low);
        }
    `,
    encapsulation: ViewEncapsulation.None,
})
export class OrderList {
}
