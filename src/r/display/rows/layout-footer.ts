import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpacerBlock } from "@/shared/display/blocks/spacer-block";

@Component({
    imports: [ RouterModule, SpacerBlock ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    // encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-inserts";
        :host {
            @include LONG_ROW_IN_LAYOUT_RULE_SET;
            contain: layout paint;
            display: flex;
            align-items: center;
            height: 56px;
            border-top: 1px solid var(--md-sys-color-surface-container-high);
            background-color: var(--md-sys-color-surface-container);
        }
        :host > a {
            margin-left: 12px;
            margin-right: 12px;
            //@include body-large;
            text-align: center;
            color: inherit;
        }
    `,
    selector: 'layout-footer',
    host: {
        'role': 'contentinfo',
    },
    template: `
        <div>© 2024 GmbH + Co KG</div>
        <spacer-block/>
        <!-- <a href="https://etesso.com/">Etesso</a> -->
    `,
})
export class LayoutFooter {

}
