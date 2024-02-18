import { inject, Injectable } from "@angular/core";
import { TDeliveryStableContent } from "../types/TDeliveryStableContent";
import { DeliveryRemoteStorage } from "../resources/DeliveryRemoteStorage";

@Injectable()
export class GetDeliveryStableContentOption {
    private remoteStorage: DeliveryRemoteStorage = inject(DeliveryRemoteStorage)

    invoke(): Promise<TDeliveryStableContent> {
        return this.remoteStorage.getDeliveryStableContent()
    }
}
