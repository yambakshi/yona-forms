import { isPlatformBrowser } from '@angular/common';
import { AfterViewChecked, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Field } from '@models/field';
import { select, Store } from '@ngrx/store';
import { FormsApiService } from '@services/forms-api.service';
import { selectSearchStateValue } from '@store/reducers';
import * as fromLayout from '@store/reducers/layout.reducer';
import { Observable } from 'rxjs';


@Component({
    selector: 'main-view',
    templateUrl: './main-view.component.html',
    styleUrls: [
        './main-view.component.common.scss',
        './main-view.component.desktop.scss',
        './main-view.component.mobile.scss',
    ]
})
export class MainViewComponent implements OnInit, AfterViewChecked {
    fields$: Observable<Field[]>;
    afterViewCheckedEnabled: boolean = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private store: Store<fromLayout.State>,
        private formsApiService: FormsApiService,
        private formBuilder: FormBuilder) {
        this.fields$ = store.pipe(select(selectSearchStateValue));
    }

    ngOnInit(): void { }

    ngAfterViewChecked(): void {
        if (!isPlatformBrowser(this.platformId) || !this.afterViewCheckedEnabled) return;
    }
}