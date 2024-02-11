import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { AppLayout } from "@/app/layout/display/app-layout";
import {
    provideRouter,
    RouteReuseStrategy,
    withEnabledBlockingInitialNavigation,
    withInMemoryScrolling, withRouterConfig, withViewTransitions
} from "@angular/router";
import navigationMap from "../navigation/navigationMap";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideServiceWorker } from '@angular/service-worker';
import { isDevMode } from '@angular/core';
import { AppRouteReuseStrategy } from "./AppRouteReuseStrategy";

bootstrapApplication(
      AppLayout,
      {
          providers: [
              // Примечание. Такое объявление приводит RouteReuseStrategy
              // к ее постоянному включению в ваше приложение, даже если служба не используется.
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
                    }),
                    withViewTransitions()
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
