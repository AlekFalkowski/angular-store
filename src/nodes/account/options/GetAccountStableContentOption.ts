import { inject, Injectable } from "@angular/core";
import { TAccountStableContent } from "../types/TAccountStableContent";
import { AccountRemoteStorage } from "../resources/AccountRemoteStorage";

@Injectable()
export class GetAccountStableContentOption {
    private remoteStorage: AccountRemoteStorage = inject(AccountRemoteStorage)

    invoke(): Promise<TAccountStableContent> {
        return this.remoteStorage.getAccountStableContent()
    }
}
