import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GetServiceStableContentOption } from "../options/GetServiceStableContentOption";
import { TServiceStableContent } from "../types/TServiceStableContent";

@Injectable()
export class ServiceViewModel {
    private route: ActivatedRoute = inject(ActivatedRoute)
    private getStableContentOption: GetServiceStableContentOption = inject(GetServiceStableContentOption)
    public stableContent: TServiceStableContent | undefined
    readonly fakeStableContent!: { htmlHeadTitle: string, pageTitle: string }

    constructor() {
        // this.getStableContentOption.invoke().then((content) => {
        //     this.stableContent = content
        // })
        this.fakeStableContent = {
            htmlHeadTitle: `Сервис`,
            pageTitle: `Сервис`
        }
    }
}
