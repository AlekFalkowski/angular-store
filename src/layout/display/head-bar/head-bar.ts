import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpacerBlock } from "@/shared/display/spacer-block/spacer-block";
import { HeadLogo } from "./head-logo/head-logo";
import { TStringLink } from "@/shared/types/TStringLink";

@Component({
    imports: [
        RouterModule,
        SpacerBlock,
        HeadLogo
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styleUrl: 'head-bar.scss',
    selector: 'head-bar',
    host: { 'role': 'banner', 'aria-label': 'Head bar', },
    templateUrl: 'head-bar.html',
})
export class HeadBar {
    readonly linkListForMobile: TStringLink[] = [
        { url: "/company", label: "О Компании" },
        { url: "/contacts", label: "Контакты" },
    ]
    readonly linkListForTablets: TStringLink[] = [
        { url: "/company", label: "О Компании" },
        { url: "/news", label: "Новости" },
        { url: "/articles", label: "Статьи" },
        { url: "/delivery", label: "Доставка" },
        { url: "/payment", label: "Оплата" },
        { url: "/return", label: "Возврат" },
        { url: "/service", label: "Сервис" },
        { url: "/contacts", label: "Контакты" },
    ]
}
