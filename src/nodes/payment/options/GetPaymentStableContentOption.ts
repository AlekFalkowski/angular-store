import { inject, Injectable } from "@angular/core";
import { TPaymentStableContent } from "../types/TPaymentStableContent";
import { PaymentRemoteStorage } from "../resources/PaymentRemoteStorage";

@Injectable()
export class GetPaymentStableContentOption {
    private remoteStorage: PaymentRemoteStorage = inject(PaymentRemoteStorage)

    invoke(): Promise<TPaymentStableContent> {
        return this.remoteStorage.getPaymentStableContent()
    }
}
