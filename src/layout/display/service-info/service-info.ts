import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    Input,
    Signal,
    ViewEncapsulation
} from '@angular/core';

@Component({
    imports: [],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'service-info',
    host: {},
    templateUrl: 'service-info.html',
    styleUrl: 'service-info.scss',
    encapsulation: ViewEncapsulation.None,
})
export class ServiceInfo {
    @Input() windowInnerWidth!: Signal<number>
    @Input() windowInnerHeight!: Signal<number>
    @Input() documentOffsetWidth!: Signal<number>
    @Input() documentClientHeight!: Signal<number>
    @Input() documentScrollbarWidth!: Signal<number>
    @Input() isMobileInPortraitOnly!: Signal<boolean>
    @Input() isMobileInLandscapeOnly!: Signal<boolean>
    @Input() isMobileInAllOrientations!: Signal<boolean>
}
