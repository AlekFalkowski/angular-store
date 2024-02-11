import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject, ViewEncapsulation } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { CatalogViewModel } from "../model/CatalogViewModel";
import { ObservePreferredSidePanelViewOption } from "../options/ObservePreferredSidePanelViewOption";
import { SetPreferredSidePanelViewOption } from "../options/SetPreferredSidePanelViewOption";
import { PageBreadcrumbs } from "@/shared/display/rows/page-breadcrumbs";
import { PageTitle } from "@/shared/display/rows/page-title";
import { TwoColumnTemplate } from "@/shared/display/templates/two-column-template";
import { MainColumnSlot } from "@/shared/display/templates/main-column-slot";
import { EndColumnSlot } from "@/shared/display/templates/end-column-slot";
import { CardCollection } from "@/shared/display/panels/card-collection";

@Component({
    imports: [
        CommonModule,
        RouterModule,
        PageBreadcrumbs,
        PageTitle,
        TwoColumnTemplate,
        MainColumnSlot,
        EndColumnSlot,
        CardCollection
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.Emulated,
    styles: `
        @import "all-config";
        :host {
            max-width: $base-max-width;
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
        }
    `,
    selector: 'catalog-index-node',
    host: { 'role': 'main' },
    template: `
        <page-breadcrumbs />
        <page-title
              [title]="viewModel.fakeStableContent.pageTitle"
        />
        <two-column-template
              [preferredSidePanelView]="viewModel.preferredSidePanelView"
              (setPreferredSidePanelView)="viewModel.setPreferredSidePanelView($event)"
        >
            <main-column-slot >
                <card-collection [cardCollection]="viewModel.fakeCatalogProductCardList" />
            </main-column-slot >
            <end-column-slot >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <div style="padding-inline: 40px;" >
                    <input type="text" style="height: 36px;" >
                </div >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <h3 style="margin: 30px 50px;" >THIS_IS_A_FILTER</h3 >
                <div style="padding-inline: 40px;" >
                    <input type="text" style="height: 36px;" >
                </div >
            </end-column-slot >
        </two-column-template >
    `,
    providers: [
        CatalogViewModel,
        ObservePreferredSidePanelViewOption,
        SetPreferredSidePanelViewOption,
    ]
})
export class CatalogIndexNode {
    viewModel: CatalogViewModel = inject(CatalogViewModel)
    htmlHeadTitleService: Title = inject(Title)
    private router: Router = inject(Router)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
        // console.log("CONSTRUCTOR") // Запускается, когда Angular создает экземпляр компонента.
    }
}
