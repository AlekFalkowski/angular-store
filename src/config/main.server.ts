import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { AppLayout } from "@/app/layout/display/app-layout";
import { provideServerRendering } from "@angular/platform-server";
import {
    provideRouter,
    RouteReuseStrategy,
    withEnabledBlockingInitialNavigation,
    withInMemoryScrolling, withRouterConfig
} from "@angular/router";
import navigationMap from "../navigation/navigationMap";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideServiceWorker } from "@angular/service-worker";
import { isDevMode } from "@angular/core";
import { AppRouteReuseStrategy } from "./AppRouteReuseStrategy";

const bootstrap =
      () => bootstrapApplication(
            AppLayout,
            {
                providers: [
                    provideServerRendering(),
                    { provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy },
                    provideRouter(
                          navigationMap,
                          withEnabledBlockingInitialNavigation(),
                          withRouterConfig({
                              onSameUrlNavigation: 'reload',
                          }),
                          withInMemoryScrolling({
                              scrollPositionRestoration: 'enabled',
                              anchorScrolling: 'enabled',
                          })
                    ),
                    provideClientHydration(),
                    provideAnimations(),
                    provideServiceWorker('ngsw-worker.js', {
                        enabled: !isDevMode(),
                        registrationStrategy: 'registerWhenStable:30000'
                    })
                ]
            }
      )

export default bootstrap
