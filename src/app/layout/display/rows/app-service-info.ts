import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpacerBlock } from "@/app/shared/display/blocks/spacer-block";

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
            flex-direction: column;
            background-color: var(--md-sys-color-surface-container);
        }
        :host > a {
            margin-left: 12px;
            margin-right: 12px;
            text-align: center;
            color: inherit;
        }
    `,
    selector: 'app-service-info',
    template: `
        <h3>Service information:</h3>
        <div>windowInnerWidth: {{ windowInnerWidth() }}</div>
        <div>windowInnerHeight: {{ windowInnerHeight() }}</div>
        <div>documentOffsetWidth: {{ documentOffsetWidth() }}</div>
        <div>documentClientHeight: {{ documentClientHeight() }}</div>
        <div>documentScrollbarWidth: {{ documentScrollbarWidth() }}</div>
        <div>isMobileInPortraitOnly: {{ isMobileInPortraitOnly() }}</div>
        <div>isMobileInLandscapeOnly: {{ isMobileInLandscapeOnly() }}</div>
        <div>isMobileInAllOrientations: {{ isMobileInAllOrientations() }}</div>
        <div>isDesktopOrTablet: {{ isDesktopOrTablet() }}</div>
    `,
})
export class AppServiceInfo {
    @Input() windowInnerWidth!: Signal<number>
    @Input() windowInnerHeight!: Signal<number>
    @Input() documentOffsetWidth!: Signal<number>
    @Input() documentClientHeight!: Signal<number>
    @Input() documentScrollbarWidth!: Signal<number>
    @Input() isMobileInPortraitOnly!: Signal<boolean>
    @Input() isMobileInLandscapeOnly!: Signal<boolean>
    @Input() isMobileInAllOrientations!: Signal<boolean>
    @Input() isDesktopOrTablet!: Signal<boolean>
}
