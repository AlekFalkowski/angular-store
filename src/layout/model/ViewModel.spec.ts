import { ViewModel } from "@/layout/model/ViewModel";
import { TestBed } from "@angular/core/testing";
import { SetPreferredColorSchemeOption } from "@/layout/options/SetPreferredColorSchemeOption";
import { NgZone } from "@angular/core";

describe('layout_ViewModel', () => {
    let viewModel: ViewModel
    const fake_ngZone = {
        run(): void {
        }
    }
    const fake_setPreferredColorSchemeOption = {
        invoke(value: "auto" | "light" | "dark"): void {
        }
    }
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ ViewModel,
                { provide: SetPreferredColorSchemeOption, useValue: fake_setPreferredColorSchemeOption },
                { provide: NgZone, useValue: fake_ngZone },
            ]
        })
        viewModel = TestBed.inject(ViewModel)
    })
    it('должен создать экземпляр класса', () => {
        expect(viewModel).toBeTruthy()
    })
    it('должен выполнить опцию setPreferredColorScheme с аргументом auto', () => {
        viewModel.setPreferredColorScheme('auto')
    })
})
