import { isPlatformBrowser } from '@angular/common';
import { AfterViewChecked, Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Field } from '@models/field';
import { Store } from '@ngrx/store';
import { FormsApiService } from '@services/forms-api.service';
import * as fromLayout from '@store/reducers/layout.reducer';


@Component({
    selector: 'entry-mode',
    templateUrl: './entry-mode.component.html',
    styleUrls: [
        './entry-mode.component.common.scss',
        './entry-mode.component.desktop.scss',
        './entry-mode.component.mobile.scss',
    ]
})
export class EntryModeComponent implements OnInit, AfterViewChecked {
    @Input() fields: Field[];
    afterViewCheckedEnabled: boolean = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private store: Store<fromLayout.State>,
        private formsApiService: FormsApiService,
        private formBuilder: FormBuilder) {
    }

    stringifyState(): string {
        return JSON.stringify(this.fields);
    }

    ngOnInit(): void { }

    ngAfterViewChecked(): void {
        if (!isPlatformBrowser(this.platformId) || !this.afterViewCheckedEnabled) return;
    }
}