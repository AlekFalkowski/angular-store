import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA, EventEmitter,
    inject,
    Input, Output,
    ViewEncapsulation
} from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CatalogNotFound } from "@/nodes/catalog/shared/display/rows/catalog-not-found";
import { PageBreadcrumbs } from "@/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/shared/display/rows/page-title";
import { CardCollection } from "@/shared/display/panels/card-collection";
import { EndColumnSlot } from "@/shared/display/templates/end-column-slot";
import { MainColumnSlot } from "@/shared/display/templates/main-column-slot";
import { TwoColumnTemplate } from "@/shared/display/templates/two-column-template";
import { LoadingError } from "@/shared/display/rows/loading-error";
import { LoadingProcess } from "@/shared/display/rows/loading-process";
import { TFieldSet } from "@/shared/types/TFieldSet";
import { PopupFieldset } from "@/shared/display/blocks/popup-fieldset/popup-fieldset";
import { TextField } from "@/shared/display/blocks/text-field/text-field";

@Component({
    imports: [
        CommonModule,
        RouterLink,
        PageBreadcrumbs,
        PageTitle,
        CardCollection,
        EndColumnSlot,
        MainColumnSlot,
        TwoColumnTemplate,
        LoadingError,
        LoadingProcess,
        CatalogNotFound,
        FormsModule,
        PopupFieldset,
        TextField
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        catalog-section-filter {
            display: flex;
            flex-direction: column;
            padding-block: 8px;

            & > hr {
                margin-inline: 24px;
            }

            & > [data-e="fieldset-label"] {
                margin: 14px 24px;
                @include MD3_TITLE_M_FONT_RULE_SET
            }

            & > popup-fieldset {
                margin-inline: 24px;
            }

            & > [data-e="range-field"] {
                display: flex;
                margin-inline: 20px;
            }

            & > [data-e="actions-line"] {
                position: sticky;
                bottom: 0;
                height: 56px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-inline: 24px;
                border-block: 1px solid var(--md-sys-color-surface-container);
                // background-color: var(--md-sys-color-surface-container-low);
                backdrop-filter: blur(3px);
            }
        }
    `,
    selector: 'catalog-section-filter',
    host: {},
    template: `
        @for (fieldSet of filterConfig; track fieldSet.label; let index = $index) {
            @if (index > 0) {
                <hr />
            }
            @if (fieldSet.label != null) {
                <div data-e="fieldset-label" >{{ fieldSet.label }}</div >
            } @else {
                <div style="height: 8px" ></div >
            }
            @for (field of fieldSet.fieldList; track field.label) {
                @switch (field.type) {
                    @case ("TMultiChoiceField") {
                        <popup-fieldset
                              [label]="field.label"
                              [inputText]="multiChoiceFieldsStates.get(field.name)?.size ?? 0 > 0 ? 'выбрано ' + multiChoiceFieldsStates.get(field.name)?.size?.toString() + ' из ' + field.options.length.toString() : ''"
                        >
                            @for (option of field.options; track option.label) {
                                <label style="display: flex;" >
                                    <input type="checkbox"
                                           [name]="field.name"
                                           [value]="option.value"
                                           [ngModel]="multiChoiceFieldsStates.get(field.name)?.has(option.value)"
                                           (ngModelChange)="
                                           multiChoiceFieldsStates.get(field.name)?.has(option.value)
                                               ? multiChoiceFieldsStates.get(field.name)?.delete(option.value)
                                               : multiChoiceFieldsStates.get(field.name)?.add(option.value)
                                           "
                                    />
                                    <!-- <md-checkbox -->
                                    <!--       [attr.checked]="multiChoiceFieldsStates.get(field.name)?.has(option.value) ? '' : null" -->
                                    <!--       (change)=" -->
                                    <!--        multiChoiceFieldsStates.get(field.name)?.has(option.value) -->
                                    <!--            ? multiChoiceFieldsStates.get(field.name)?.delete(option.value) -->
                                    <!--            : multiChoiceFieldsStates.get(field.name)?.add(option.value) -->
                                    <!--        " -->
                                    <!--       touch-target="wrapper" -->
                                    <!-- ></md-checkbox > -->
                                    <span >{{ option.label }}</span >
                                </label >
                            }
                        </popup-fieldset >
                    }
                    @case ("TSingleChoiceField") {
                        <popup-fieldset
                              [label]="field.label"
                              [inputText]="singleChoiceFieldsStates.get(field.name)"
                        >
                            @for (option of field.options; track option.label) {
                                <label style="display: flex;" >
                                    <input type="radio"
                                           [name]="field.name"
                                           [value]="option.value"
                                           [ngModel]="singleChoiceFieldsStates.get(field.name)"
                                           (ngModelChange)="singleChoiceFieldsStates.set(field.name, $event)"
                                    />
                                    <!-- <md-radio -->
                                    <!--       [attr.checked]="singleChoiceFieldsStates.get(field.name) ===  option.value ? '' : null" -->
                                    <!--       (change)="singleChoiceFieldsStates.set(field.name, option.value)" -->
                                    <!-- ></md-radio > -->
                                    <span >{{ option.label }}</span >
                                </label >
                            }
                        </popup-fieldset >
                        <!-- <md-outlined-select -->
                              <!--       [ngModel]="singleChoiceFieldsStates.get(field.name)" -->
                              <!--       (ngModelChange)="singleChoiceFieldsStates.set(field.name, $event)" -->
                              <!-- > -->
                              <!--     @for (option of field.options; track option.label) { -->
                              <!--     <md-select-option [value]="option.value"> -->
                              <!--         <div slot="headline">{{ option.label }}</div> -->
                              <!--     </md-select-option> -->
                              <!--     } -->
                              <!-- </md-outlined-select> -->
                              <!-- <select -->
                              <!--       [ngModel]="singleChoiceFieldsStates.get(field.name)" -->
                              <!--       (ngModelChange)="singleChoiceFieldsStates.set(field.name, $event)" -->
                              <!-- > -->
                              <!--     <option disabled selected></option> -->
                              <!--     @for (option of field.options; track option.label) { -->
                              <!--         <option [value]="option.value" >{{ option.label }}</option > -->
                              <!--     } -->
                              <!-- </select > -->
                    }
                    @case ("TRangeField") {
                        <!-- <label style="display: flex;" > -->
                              <!--     <input -->
                              <!--           type="text" -->
                              <!--           [name]="field.name" -->
                              <!--           [value]="field.value" -->
                              <!--           [ngModel]="textFieldsStates.get(field.name)" -->
                              <!--           (ngModelChange)="textFieldsStates.set(field.name, $event)" -->
                              <!--     /> -->
                              <!--     <span >{{ field.label }}</span > -->
                              <!-- </label > -->
                              <!-- <input -->
                              <!--       type="text" -->
                              <!--       [name]="field.name" -->
                              <!--       [value]="field.value" -->
                              <!--       [ngModel]="textFieldsStates.get(field.endName)" -->
                              <!--       (ngModelChange)="textFieldsStates.set(field.endName, $event)" -->
                              <!-- /> -->
                        <div data-e="range-field" >
                            <text-field
                                  [label]="field.label"
                                  [name]="field.name"
                                  [value]="field.value"
                                  [currentValue]="textFieldsStates.get(field.name)"
                                  (changeValue)="textFieldsStates.set(field.name, $event)"
                            ></text-field >
                            <text-field
                                  [label]="field.label"
                                  [name]="field.name"
                                  [value]="field.value"
                                  [currentValue]="textFieldsStates.get(field.endName)"
                                  (changeValue)="textFieldsStates.set(field.endName, $event)"
                            ></text-field >
                        </div >
                    }
                    @case ("TTextField") {
                        <label style="display: flex;" >
                            <input
                                  type="text"
                                  [name]="field.name"
                                  [value]="field.value"
                                  [ngModel]="textFieldsStates.get(field.name)"
                                  (ngModelChange)="textFieldsStates.set(field.name, $event)"
                            />
                            <span >{{ field.label }}</span >
                        </label >
                    }
                }
            }
        }
        <hr />
        <div data-e="actions-line" >
            <md-filled-button data-e="submit-button"
                              (click)="submitFilter.emit()" >
                Применить
            </md-filled-button >
            <md-outlined-button data-e="submit-button"
                                (click)="cleanFilter.emit()" >
                Очистить
            </md-outlined-button >
        </div >
    `,
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
