import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TCardCollection } from "../../types/TCardCollection";

@Component({
    imports: [ CommonModule, RouterLinkActive, RouterLink ],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    encapsulation: ViewEncapsulation.Emulated,
    styles: `
        @import "all-config";
        $card-list-column-gap: 30px;
        $card-min-width: 280px;
        :host {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            column-gap: $card-list-column-gap;
            row-gap: 40px;
            padding-inline: var(--inline-padding);
            padding-top: 8px;
            padding-bottom: 40px;
        }
        [data-e="card"] {
            flex-grow: 1;
            flex-basis: $card-min-width;
            min-width: $card-min-width;
            max-width: calc($card-min-width * 1.5 + $card-list-column-gap);
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-inline: 16px;
            padding-top: 16px;
            padding-bottom: 8px;
            color: inherit;
            text-decoration: none;
        }
        [data-e="back-cover"] {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 61.8%;
            border: 1px solid var(--md-sys-color-surface-container-high);
            background-color: var(--md-sys-color-surface-container);
            transition-property: height, transform;
            transition-duration: 300ms;
        }
        [data-e="card"]:hover > [data-e="back-cover"] {
            @include ONLY_FOR_HOVERING_POINTER {
                // transform: matrix(1, 0, 0, 1.2, 0, -10%);
                // transform: translateY(-10%) scaleY(1.2);
                // height: 85.4%;
                height: 76.4%;
            }
        }
        [data-e="img-frame"] {
            position: relative;
            width: 264px;
            height: 0;
            padding-top: 198px;
            transition-property: transform;
            transition-duration: 400ms;
            & > img {
                position: absolute;
                inset: 0;
                width: 100%;
                height: 100%;
                object-fit: contain;
                &.cover {
                    object-fit: cover;
                }
            }
        }
        [data-e="title"] {
            position: relative;
            padding-top: 24px;
            padding-bottom: 16px;
            @include MD3_HEADLINE_S_FONT_RULE_SET;
            text-align: center;
            text-wrap: balance;
            transition-property: transform;
            transition-duration: 400ms;
        }
        // [data-e="card"]:hover > [data-e="description"],
        // [data-e="card"]:hover > [data-e="price"],
        // [data-e="card"]:hover > [data-e="title"],
        // [data-e="card"]:hover > [data-e="img-frame"] {
        //     @include ONLY_FOR_HOVERING_POINTER {
        //         transform: translateY(-3px);
        //     }
        // }
        [data-e="description"],
        [data-e="price"] {
            position: relative;
            padding-bottom: 16px;
            text-align: center;
            text-wrap: balance;
            transition-property: transform;
            transition-duration: 400ms;
        }
    `,
    selector: 'card-collection',
    host: {},
    template: `
        @for (card of cardCollection; track card.title; let last = $last) {
            @switch (card.T) {
                @case ("TAssortmentCard") {
                    <a
                          data-e="card"
                          [routerLink]="card.outLink"
                    >
                        <div data-e="back-cover" ></div >
                        <div data-e="img-frame" aria-hidden="true" >
                            <img [src]="card.imageUrl" >
                        </div >
                        <div data-e="title" >{{ card.title }}</div >
                        <div data-e="description" >{{ card.description }}</div >
                    </a >
                }
                @case ("TCatalogProductCard") {
                    <a
                          data-e="card"
                          [routerLink]="card.outLink"
                    >
                        <div data-e="back-cover" ></div >
                        <div data-e="img-frame" aria-hidden="true" >
                            <img [src]="card.imageUrl" class="cover" >
                        </div >
                        <div data-e="title" >{{ card.title }}</div >
                        <div data-e="price" > {{ card.price }}</div >
                    </a >
                }
            }
        }
    `,
})
export class CardCollection {
    @Input() cardCollection!: TCardCollection

    constructor() {
    }
}
