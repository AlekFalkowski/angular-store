import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    imports: [ RouterModule ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'head-logo',
    host: {},
    templateUrl: 'head-logo.html',
    styleUrl: 'head-logo.scss',
    encapsulation: ViewEncapsulation.None,
})
export class HeadLogo {
}
