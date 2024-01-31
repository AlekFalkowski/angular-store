import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { PageBreadcrumbs } from "../../../shared/display/rows/page-breadcrumbs";
import { PageTitle } from "../../../shared/display/rows/page-title";
import { Title } from "@angular/platform-browser";
import { CatalogViewModel } from "../model/CatalogViewModel";
import { ObservePreferredSidePanelViewOption } from "../options/ObservePreferredSidePanelViewOption";
import { SetPreferredSidePanelViewOption } from "../options/SetPreferredSidePanelViewOption";
import { TwoColumnTemplate } from "../../../layout/display/templates/two-column-template";
import { MainColumnSlot } from "../../../layout/display/templates/main-column-slot";
import { EndColumnSlot } from "../../../layout/display/templates/end-column-slot";
import { CardCollection } from "../../../shared/display/panels/card-collection";

@Component({
    imports: [ CommonModule, RouterModule, PageBreadcrumbs, PageTitle, TwoColumnTemplate, MainColumnSlot, EndColumnSlot, CardCollection ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    // encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-inserts";

        :host {
            @include PAGE_RULE_SET;
        }
    `,
    selector: 'catalog-page',
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
export class CatalogPage {
    viewModel: CatalogViewModel = inject(CatalogViewModel)
    htmlHeadTitleService: Title = inject(Title)
    private router: Router = inject(Router)

    constructor() {
        this.htmlHeadTitleService.setTitle(this.viewModel.fakeStableContent.htmlHeadTitle)
        // console.log("CONSTRUCTOR") // Запускается, когда Angular создает экземпляр компонента.
    }
    ngOnInit() { // Запускается один раз после того, как Angular инициализирует все входные данные компонента.
        // console.log("NG_ON_INIT")
    }
    ngOnChanges() { // Запускается каждый раз, когда входные данные компонента изменяются.
        // console.log("NG_ON_CHANGES")
    }
    ngDoCheck() { // Запускается каждый раз, когда этот компонент проверяется на наличие изменений.
        // console.log("NG_DO_CHECK")
    }
    ngAfterViewInit() { // Запускается один раз после инициализации представления компонента.
        // console.log("NG_AFTER_VIEW_INIT")
    }
    ngAfterContentInit() { // Запускается один раз после инициализации содержимого компонента.
        // console.log("NG_AFTER_CONTENT_INIT")
    }
    ngAfterViewChecked() { // Запускается каждый раз, когда представление компонента проверяется на наличие изменений.
        // console.log("NG_AFTER_VIEW_CHECKED")
    }
    ngAfterContentChecked() { // Запускается каждый раз, когда содержимое этого компонента проверяется на наличие изменений.
        // console.log("NG_AFTER_CONTENT_CHECKED")
    }
    afterNextRender() { // Запускается один раз, когда в следующий раз **все* компоненты будут отображены в DOM.
    }
    afterRender() { // Запускается каждый раз, когда **все** компоненты визуализируются в DOM.
    }
    ngOnDestroy() { // Запускается один раз, прежде чем компонент будет уничтожен.
    }
}
