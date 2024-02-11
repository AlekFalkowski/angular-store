import { inject, Injectable } from "@angular/core";
import { TCartStableContent } from "../types/TCartStableContent";
import { CartRemoteStorage } from "../storages/CartRemoteStorage";

@Injectable()
export class GetCartStableContentOption {
    private remoteStorage: CartRemoteStorage = inject(CartRemoteStorage)

    invoke(): Promise<TCartStableContent> {
        return this.remoteStorage.getCartStableContent()
    }
}
