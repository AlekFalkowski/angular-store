import { Routes } from '@angular/router';
import { OrderPage } from "@/pages/order/display/order-page";
import { NotFoundPage } from "@/pages/not-found/display/not-found-page";
import { AccountPage } from "@/pages/account/display/account-page";
import { ArticlesPage } from "@/pages/articles/display/articles-page";
import { BookmarksPage } from "@/pages/bookmarks/display/bookmarks-page";
import { CompanyPage } from "@/pages/company/display/company-page";
import { ContactsPage } from "@/pages/contacts/display/contacts-page";
import { ServicePage } from "@/pages/service/display/service-page";
import { DeliveryPage } from "@/pages/delivery/display/delivery-page";
import { NewsPage } from "@/pages/news/display/news-page";
import { PaymentPage } from "@/pages/payment/display/payment-page";
import { ReturnPage } from "@/pages/return/display/return-page";
import { CartPage } from "@/pages/cart/display/cart-page";
import { OrderProductPage } from "@/pages/order-product/display/order-product-page";
import { CatalogCmp } from "@/r_catalog/display/catalog-cmp";
import { CatalogIndexCmp } from "@/r_catalog_index/display/catalog-index-cmp";
import { CatalogProductCmp } from "@/r_catalog_product/display/catalog-product-cmp";
import { CatalogSectionCmp } from "@/r_catalog_section/display/catalog-section-cmp";
import { IndexCmp } from "@/r_index/display/index-cmp";

const navigationMap: Routes = [
    {
        path: '',
        component: IndexCmp,
    },
    {
        path: 'account',
        component: AccountPage,
    },
    {
        path: 'articles',
        component: ArticlesPage,
    },
    {
        path: 'bookmarks',
        component: BookmarksPage,
    },
    {
        path: 'cart',
        component: CartPage,
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
        component: CatalogCmp, // this is the component with the <router-outlet> in the template
        children: [
            {
                path: '',
                component: CatalogIndexCmp,
            },
            {
                path: 'products/:catalogProductNavId',
                component: CatalogProductCmp,
            },
            {
                path: 'sections/:catalogSectionNavId',
                component: CatalogSectionCmp,
            },
        ],
    },
    {
        path: 'company',
        component: CompanyPage,
    },
    {
        path: 'contacts',
        component: ContactsPage,
    },
    {
        path: 'delivery',
        component: DeliveryPage,
    },
    {
        path: 'news',
        component: NewsPage,
    },
    {
        path: 'payment',
        component: PaymentPage,
    },
    {
        path: 'return',
        component: ReturnPage,
    },
    {
        path: 'orders/:orderNavId',
        component: OrderPage,
    },
    {
        path: 'orders/:orderNavId/products/:orderProductNavId',
        component: OrderProductPage,
    },
    {
        path: 'service',
        component: ServicePage,
    },
    {
        path: '**',
        component: NotFoundPage,
    },
]

export default navigationMap
