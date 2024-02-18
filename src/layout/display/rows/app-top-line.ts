import {
    afterNextRender,
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    inject,
    PLATFORM_ID,
    ViewEncapsulation
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpacerBlock } from "@/shared/display/blocks/spacer-block";
import { HeaderLogo } from "../blocks/header-logo";
import { TStringLink } from "@/shared/types/TStringLink";
import { isPlatformBrowser } from "@angular/common";

@Component({
    imports: [
        RouterModule,
        SpacerBlock,
        HeaderLogo
    ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.None,
    styles: `
        @import "all-config";
        app-top-line {
            padding-inline: $full-inline-padding;
            contain: layout paint inline-size style;
            position: relative;
            height: 56px;
            padding-block: 4px;
            display: flex;
            align-items: center;
            gap: 8px;

            & > [data-e="mobile-link-list"] {
                display: none;
                @media(max-width: 900px) {
                    display: flex;
                }
            }
            & > [data-e="tablet-link-list"] {
                display: flex;
                @media(max-width: 900px) {
                    display: none;
                }
            }
            & > [data-e="mobile-link-list"],
            & > [data-e="tablet-link-list"] {
                align-items: center;

                & > [data-e="link"] {
                    position: relative;
                    display: flex;
                    align-items: center;
                    height: 48px;
                    padding-inline: 8px;
                    white-space: nowrap;
                    color: inherit;
                    @include MD3_BODY_M_FONT_RULE_SET;
                    text-decoration: none;
                    text-align: center;

                    &.active {
                        color: var(--md-sys-color-primary);
                        text-decoration: underline;
                    }
                    &:hover {
                        @include ONLY_FOR_HOVERING_POINTER {
                            text-decoration: underline;
                        }
                    }
                }
                & > [data-e="separator"] {
                    margin-inline: 4px;
                    border: 1.7px solid var(--md-sys-color-primary);
                    border-radius: 50%;
                    pointer-events: none;
                }
            }
        }
    `,
    selector: 'app-top-line',
    host: {
        'role': 'banner',
        'aria-label': 'Top line',
    },
    template: `
        <header-logo />
        <spacer-block />
        <div data-e="mobile-link-list" >
            @for (link of linkListForMobile; track link.label; let last = $last) {
                <a data-e="link"
                   [attr.aria-label]="link.label"
                   [routerLink]="link.url"
                   routerLinkActive="active"
                   ariaCurrentWhenActive="page" >
                    {{ link.label }}
                </a >
                @if (!last) {
                    <div data-e="separator" ></div >
                }
            }
        </div >
        <div data-e="tablet-link-list" >
            @for (link of linkListForTablets; track link.label; let last = $last) {
                <a data-e="link"
                   [attr.aria-label]="link.label"
                   [routerLink]="link.url"
                   routerLinkActive="active"
                   ariaCurrentWhenActive="page" >
                    {{ link.label }}
                </a >
                @if (!last) {
                    <div data-e="separator" ></div >
                }
            }
        </div >
    `,
})
export class AppTopLine {
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
