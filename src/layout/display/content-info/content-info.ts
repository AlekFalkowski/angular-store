import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
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
    styleUrl: 'content-info.scss',
    selector: 'content-info',
    host: { 'role': 'contentinfo' },
    templateUrl: 'content-info.html',
})
export class ContentInfo {
}
