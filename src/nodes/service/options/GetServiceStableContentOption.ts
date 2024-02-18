import { inject, Injectable } from "@angular/core";
import { TServiceStableContent } from "../types/TServiceStableContent";
import { ServiceRemoteStorage } from "../resources/ServiceRemoteStorage";

@Injectable()
export class GetServiceStableContentOption {
    private remoteStorage: ServiceRemoteStorage = inject(ServiceRemoteStorage)

    invoke(): Promise<TServiceStableContent> {
        return this.remoteStorage.getServiceStableContent()
    }
}
