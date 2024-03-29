import { inject, Injectable } from "@angular/core";
import { TCompanyStableContent } from "../types/TCompanyStableContent";
import { CompanyRemoteStorage } from "../resources/CompanyRemoteStorage";

@Injectable()
export class GetCompanyStableContentOption {
    private remoteStorage: CompanyRemoteStorage = inject(CompanyRemoteStorage)

    invoke(): Promise<TCompanyStableContent> {
        return this.remoteStorage.getCompanyStableContent()
    }
}
