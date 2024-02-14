import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    Input,
    Signal,
    ViewEncapsulation
} from '@angular/core';
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
        app-service-info {
            padding-inline: $full-inline-padding;
            contain: layout paint inline-size style;
            display: flex;
            flex-direction: column;
            background-color: var(--md-sys-color-surface-container);
        }
    `,
    selector: 'app-service-info',
    template: `
        <h3 >Service information:</h3 >
        <div >windowInnerWidth: {{ windowInnerWidth() }}</div >
        <div >windowInnerHeight: {{ windowInnerHeight() }}</div >
        <div >documentOffsetWidth: {{ documentOffsetWidth() }}</div >
        <div >documentClientHeight: {{ documentClientHeight() }}</div >
        <div >documentScrollbarWidth: {{ documentScrollbarWidth() }}</div >
        <div >isMobileInPortraitOnly: {{ isMobileInPortraitOnly() }}</div >
        <div >isMobileInLandscapeOnly: {{ isMobileInLandscapeOnly() }}</div >
        <div >isMobileInAllOrientations: {{ isMobileInAllOrientations() }}</div >
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
}
