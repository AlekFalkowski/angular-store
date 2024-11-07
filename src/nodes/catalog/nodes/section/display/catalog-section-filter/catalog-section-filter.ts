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
import { PopupSelection } from "@/shared/display/popup-selection/popup-selection";
import { TextField } from "@/shared/display/text-field/text-field";
import { SwitchGroup } from "@/shared/display/switch-group/switch-group";
import { SelectButton } from "@/shared/display/select-button/select-button";
import { RangeField } from "@/shared/display/range-field/range-field";
import { BaseButton } from "@/shared/display/base-button/base-button";

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
        PopupSelection,
        TextField,
        SwitchGroup,
        SelectButton,
        RangeField,
        BaseButton
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    selector: 'catalog-section-filter',
    host: {},
    templateUrl: 'catalog-section-filter.html',
    styleUrl: 'catalog-section-filter.scss',
    encapsulation: ViewEncapsulation.None,
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
