import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { AppLayout } from "@/layout/display/app-layout";
import {
    provideRouter,
    RouteReuseStrategy,
    withEnabledBlockingInitialNavigation,
    withInMemoryScrolling,
    withRouterConfig
} from "@angular/router";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideServiceWorker } from '@angular/service-worker';
import { isDevMode } from '@angular/core';
import { AppRouteReuseStrategy } from "./AppRouteReuseStrategy";
import routes from "./routes";
import { provideHttpClient, withFetch } from "@angular/common/http";

bootstrapApplication(
    AppLayout,
    {
        providers: [
            provideHttpClient(withFetch()),
            { provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy },
            provideRouter(
                routes,
                withEnabledBlockingInitialNavigation(),
                withRouterConfig({
                    paramsInheritanceStrategy: 'always',
                    onSameUrlNavigation: 'reload',
                }),
                withInMemoryScrolling({
                    scrollPositionRestoration: 'enabled',
                    anchorScrolling: 'enabled',
                }),
                // withViewTransitions()
            ),
            provideClientHydration(),
            provideAnimations(),
            provideServiceWorker('ngsw-worker.js', {
                enabled: !isDevMode(),
                registrationStrategy: 'registerWhenStable:30000'
            })
        ],
    }
).catch(
    (err) => console.error(err)
)
