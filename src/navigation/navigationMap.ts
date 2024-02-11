import { Routes } from '@angular/router';
import { IndexNode } from "@/app/nodes/0/display/index-node";
import { AccountNode } from "@/app/nodes/account/display/account-node";
import { ArticlesNode } from "@/app/nodes/articles/display/articles-node";
import { BookmarksNode } from "@/app/nodes/bookmarks/display/bookmarks-node";
import { CartNode } from "@/app/nodes/cart/display/cart-node";
import { CatalogLayout } from "@/app/nodes/catalog/layout/display/catalog-layout";
import { CatalogIndexNode } from "@/app/nodes/catalog/nodes/0/display/catalog-index-node";
import { CatalogProductNode } from "@/app/nodes/catalog/nodes/product/display/catalog-product-node";
import { CatalogSectionNode } from "@/app/nodes/catalog/nodes/section/display/catalog-section-node";
import { CompanyNode } from "@/app/nodes/company/display/company-node";
import { ContactsNode } from "@/app/nodes/contacts/display/contacts-node";
import { DeliveryNode } from "@/app/nodes/delivery/display/delivery-node";
import { NewsNode } from "@/app/nodes/news/display/news-node";
import { PaymentNode } from "@/app/nodes/payment/display/payment-node";
import { ReturnNode } from "@/app/nodes/return/display/return-node";
import { OrderIndexNode } from "@/app/nodes/order/nodes/0/display/order-index-node";
import { OrderProductNode } from "@/app/nodes/order/nodes/product/display/order-product-node";
import { ServiceNode } from "@/app/nodes/service/display/service-node";
import { NotFoundNode } from "@/app/nodes/404/display/not-found-node";

const navigationMap: Routes = [
    {
        path: '',
        component: IndexNode,
    },
    {
        path: 'account',
        component: AccountNode,
    },
    {
        path: 'articles',
        component: ArticlesNode,
    },
    {
        path: 'bookmarks',
        component: BookmarksNode,
    },
    {
        path: 'cart',
        component: CartNode,
    },
    // {
    //     path: 'catalogs/:catalogNavId',
    //     component: CatalogPage,
    // },
    // {
    //     path: 'catalogs/:catalogNavId/products/:catalogProductNavId',
    //     component: CatalogProductPage,
    // },
    // {
    //     path: 'catalog-sections/:catalogSectionNavId',
    //     component: CatalogSectionsPage,
    // },
    {
        path: 'catalogs/:catalogNavId',
        component: CatalogLayout, // this is the component with the <router-outlet> in the template
        children: [
            {
                path: '',
                component: CatalogIndexNode,
            },
            {
                path: 'products/:catalogProductNavId',
                component: CatalogProductNode,
            },
            {
                path: 'sections/:catalogSectionNavId',
                component: CatalogSectionNode,
            },
        ],
    },
    {
        path: 'company',
        component: CompanyNode,
    },
    {
        path: 'contacts',
        component: ContactsNode,
    },
    {
        path: 'delivery',
        component: DeliveryNode,
    },
    {
        path: 'news',
        component: NewsNode,
    },
    {
        path: 'payment',
        component: PaymentNode,
    },
    {
        path: 'return',
        component: ReturnNode,
    },
    {
        path: 'orders/:orderNavId',
        component: OrderIndexNode,
    },
    {
        path: 'orders/:orderNavId/products/:orderProductNavId',
        component: OrderProductNode,
    },
    {
        path: 'service',
        component: ServiceNode,
    },
    {
        path: '**',
        component: NotFoundNode,
    },
]

export default navigationMap
