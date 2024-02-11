import { Routes } from '@angular/router';
import { HomeNode } from "@/nodes/home/display/home-node";
import { AccountNode } from "@/nodes/account/display/account-node";
import { ArticlesNode } from "@/nodes/articles/display/articles-node";
import { BookmarksNode } from "@/nodes/bookmarks/display/bookmarks-node";
import { CartNode } from "@/nodes/cart/display/cart-node";
import { CatalogLayout } from "@/nodes/catalog/layout/display/catalog-layout";
import { CatalogIndexNode } from "@/nodes/catalog/nodes/0/display/catalog-index-node";
import { CatalogProductNode } from "@/nodes/catalog/nodes/product/display/catalog-product-node";
import { CatalogSectionNode } from "@/nodes/catalog/nodes/section/display/catalog-section-node";
import { CompanyNode } from "@/nodes/company/display/company-node";
import { ContactsNode } from "@/nodes/contacts/display/contacts-node";
import { DeliveryNode } from "@/nodes/delivery/display/delivery-node";
import { NewsNode } from "@/nodes/news/display/news-node";
import { PaymentNode } from "@/nodes/payment/display/payment-node";
import { ReturnNode } from "@/nodes/return/display/return-node";
import { OrderIndexNode } from "@/nodes/order/nodes/0/display/order-index-node";
import { OrderProductNode } from "@/nodes/order/nodes/product/display/order-product-node";
import { ServiceNode } from "@/nodes/service/display/service-node";
import { NotFoundNode } from "@/nodes/404/display/not-found-node";

const routes: Routes = [
    {
        path: '',
        component: HomeNode,
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

export default routes
