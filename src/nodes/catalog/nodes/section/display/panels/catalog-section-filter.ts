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
import console from "node:console";

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
        FormsModule
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
        }
    `,
    selector: 'catalog-section-filter',
    host: {},
    template: `
        <div style="padding: 40px;" > FILTER_COLUMN</div >
        @for (fieldSet of filterConfig; track fieldSet.label; let index = $index) {
            @if (index > 0) {
                <hr />
            }
            @if (fieldSet.label != null) {
                <div >{{ fieldSet.label }}</div >
            } @else {
                <div style="height: 8px" ></div >
            }
            @for (field of fieldSet.fieldList; track field.label) {
                @switch (field.type) {
                    @case ("TMultiChoiceField") {
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
                                <span >{{ option.label }}</span >
                            </label >
                        }
                    }
                    @case ("TSingleChoiceField") {
                        @for (option of field.options; track option.label) {
                            <label style="display: flex;" >
                                <input type="radio"
                                       [name]="field.name"
                                       [value]="option.value"
                                       [ngModel]="singleChoiceFieldsStates.get(field.name)"
                                       (ngModelChange)="singleChoiceFieldsStates.set(field.name, $event)"
                                />
                                <span >{{ option.label }}</span >
                            </label >
                        }
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
                        <input
                              type="text"
                              [name]="field.name"
                              [value]="field.value"
                              [ngModel]="textFieldsStates.get(field.endName)"
                              (ngModelChange)="textFieldsStates.set(field.endName, $event)"
                        />
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
        <div style="display: flex;" >
            <md-filled-button data-e="submit-button"
                              (click)="submitFilter.emit()" >
                Применить
            </md-filled-button >
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
}
