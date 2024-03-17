import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CatalogNotFound } from "@/nodes/catalog/shared/display/catalog-not-found/catalog-not-found";
import { PageBreadcrumbs } from "@/shared/display/page-breadcrumbs/page-breadcrumbs";
import { PageTitle } from "@/shared/display/page-title/page-title";
import { CardCollection } from "@/shared/display/card-collection/card-collection";
import { LoadingError } from "@/shared/display/loading-error/loading-error";
import { LoadingProcess } from "@/shared/display/loading-process/loading-process";
import { TFieldSet } from "@/shared/types/TFieldSet";
import {
    SwitchersStatusMonitorWithSelectionPopup
} from "@/shared/display/switchers-status-monitor-with-selection-popup/switchers-status-monitor-with-selection-popup";
import { TextField } from "@/shared/display/text-field/text-field";
import { SwitchersColumn } from "@/shared/display/switchers-column/switchers-column";

@Component({
    imports: [
        RouterLink,
        PageBreadcrumbs,
        PageTitle,
        CardCollection,
        LoadingError,
        LoadingProcess,
        CatalogNotFound,
        FormsModule,
        SwitchersStatusMonitorWithSelectionPopup,
        TextField,
        SwitchersColumn
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'catalog-section-filter.scss',
    selector: 'catalog-section-filter',
    host: {},
    templateUrl: 'catalog-section-filter.html',
    providers: []
})
export class CatalogSectionFilter {
    @Input() filterConfig!: TFieldSet[]
    @Input() multiChoiceFieldsStates!: Map<string, Set<string>>
    @Input() singleChoiceFieldsStates!: Map<string, string>
    @Input() textFieldsStates!: Map<string, string>
    @Output() submitFilter: EventEmitter<void> = new EventEmitter()
    @Output() cleanFilter: EventEmitter<void> = new EventEmitter()
}
