import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    imports: [ RouterModule ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'head-logo.scss',
    selector: 'head-logo',
    host: {},
    templateUrl: 'head-logo.html',
})
export class HeadLogo {
}
