import {
    ActivatedRouteSnapshot,
    BaseRouteReuseStrategy,
    DetachedRouteHandle
} from "@angular/router";
import { Injectable } from "@angular/core";

// https://angular.io/api/router/BaseRouteReuseStrategy#description
// https://stackoverflow.com/questions/41280471/how-to-implement-routereusestrategy-shoulddetach-for-specific-routes-in-angular
// https://blog.bitsrc.io/angular-route-reuse-strategy-c7939ebbf797
@Injectable({ providedIn: "root" })
export class AppRouteReuseStrategy extends BaseRouteReuseStrategy {
    override shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return false
    }
    override store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    }
    override shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return false
    }
    override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        return null
    }
    // shouldReuseRoute определяет, следует ли повторно использовать маршрут.
    // По умолчанию эта стратегия возвращается true,
    // когда конфигурация будущего маршрута и текущая конфигурация маршрута идентичны.
    override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        // default is true if configuration of current and future route are the same (curr.routeConfig === future.routeConfig)
        return curr.routeConfig === future.routeConfig && JSON.stringify(curr.params) === JSON.stringify(future.params)
    }
}
