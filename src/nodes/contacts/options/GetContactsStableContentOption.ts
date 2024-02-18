import { inject, Injectable } from "@angular/core";
import { TContactsStableContent } from "../types/TContactsStableContent";
import { ContactsRemoteStorage } from "../resources/ContactsRemoteStorage";

@Injectable()
export class GetContactsStableContentOption {
    private remoteStorage: ContactsRemoteStorage = inject(ContactsRemoteStorage)

    invoke(): Promise<TContactsStableContent> {
        return this.remoteStorage.getContactsStableContent()
    }
}
