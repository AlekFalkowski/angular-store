import { inject, Injectable } from "@angular/core";
import { TReturnStableContent } from "../types/TReturnStableContent";
import { ReturnRemoteStorage } from "../resources/ReturnRemoteStorage";

@Injectable()
export class GetReturnStableContentOption {
    private remoteStorage: ReturnRemoteStorage = inject(ReturnRemoteStorage)

    invoke(): Promise<TReturnStableContent> {
        return this.remoteStorage.getReturnStableContent()
    }
}
