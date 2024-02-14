import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    imports: [ CommonModule ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        page-title {
            padding-inline: var(--inline-padding);
            display: flex;
            justify-content: center;
            margin-block: 20px;
            align-items: center;

            & > [data-e="headline"] {
                color: var(--md-sys-color-primary);
                @include MD3_DISPLAY_S_FONT_RULE_SET;
                text-transform: uppercase;
                text-align: center;
                text-wrap: balance;
            }
        }
    `,
    selector: 'page-title',
    host: {},
    template: `
        <h1 data-e="headline" >{{ title }}</h1 >
    `,
})
export class PageTitle {
    @Input() title: string = ""
}
