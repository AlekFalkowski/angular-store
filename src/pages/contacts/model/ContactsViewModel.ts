import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetContactsStableContentOption } from "../options/GetContactsStableContentOption";
import { TContactsStableContent } from "../types/TContactsStableContent";

@Injectable()
export class ContactsViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    private getStableContentOption: GetContactsStableContentOption = inject(GetContactsStableContentOption)
    public stableContent: TContactsStableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }

    constructor() {
        // this.getStableContentOption.invoke().then((content) => {
        //     this.stableContent = content
        // })
        this.fakeStableContent = {
            htmlHeadTitle: `Контакты`,
            pageTitle: `Контакты`
        }
    }
}
