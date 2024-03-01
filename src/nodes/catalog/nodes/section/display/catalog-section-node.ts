import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    inject,
    signal,
    ViewEncapsulation,
    WritableSignal
} from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { CatalogSectionFilter } from "./catalog-section-filter/catalog-section-filter";
import { CatalogNotFound } from "@/nodes/catalog/shared/display/catalog-not-found/catalog-not-found";
import { PageBreadcrumbs } from "@/shared/display/page-breadcrumbs/page-breadcrumbs";
import { PageTitle } from "@/shared/display/page-title/page-title";
import { CardCollection } from "@/shared/display/card-collection/card-collection";
import { TwoColumnTemplate } from "@/shared/display/two-column-template/two-column-template";
import { LoadingError } from "@/shared/display/loading-error/loading-error";
import { LoadingProcess } from "@/shared/display/loading-process/loading-process";
import { ViewModel } from "../model/ViewModel";
import { GetStableContentOption } from "../options/GetStableContentOption";
import { GetDynamicContentOption } from "../options/GetDynamicContenOption";
import { ObserveQueryStringOption } from "../options/ObserveQueryStringOption";
import { SaveQueryStringOption } from "../options/SaveQueryStringOption";
import { LocalStorage } from "../resources/LocalStorage";
import { RemoteStorage } from "../resources/RemoteStorage";

@Component({
    imports: [
        RouterLink,
        PageBreadcrumbs,
        PageTitle,
        CardCollection,
        TwoColumnTemplate,
        LoadingError,
        LoadingProcess,
        CatalogNotFound,
        FormsModule,
        CatalogSectionFilter
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'catalog-section-node.scss',
    selector: 'catalog-section-node',
    host: { 'role': 'main' },
    templateUrl: 'catalog-section-node.html',
    providers: [
        ViewModel,
        GetDynamicContentOption,
        GetStableContentOption,
        ObserveQueryStringOption,
        SaveQueryStringOption,
        RemoteStorage,
        LocalStorage
    ]
})
export class CatalogSectionNode {
    viewModel: ViewModel = inject(ViewModel)
    htmlHeadTitleService: Title = inject(Title)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.stableContent()?.htmlHeadTitle ?? '')
    }

    isSideColumnOpenInModal: WritableSignal<boolean> = signal(false)
}
