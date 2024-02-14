import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpacerBlock } from "@/shared/display/blocks/spacer-block";

@Component({
    imports: [
        RouterModule,
        SpacerBlock
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        app-footer {
            padding-inline: $full-inline-padding;
            contain: layout paint size style;
            display: flex;
            align-items: center;
            height: 56px;
            margin-top: 56px;
            border-top: 1px solid var(--md-sys-color-surface-container-high);
            background-color: var(--md-sys-color-surface-container);

            & > [data-e="footer-link"] {
                margin-left: 12px;
                margin-right: 12px;
                text-align: center;
                color: inherit;
            }
        }
    `,
    selector: 'app-footer',
    host: { 'role': 'contentinfo' },
    template: `
        <div >© 2024 GmbH + Co KG</div >
        <spacer-block />
        <!-- <a data-e="footer-link" href="https://etesso.com/">Etesso</a> -->
    `,
})
export class AppFooter {
}
