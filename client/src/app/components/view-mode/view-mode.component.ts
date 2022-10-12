import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { EntryModeForm } from '@models/forms';
import { select, Store } from '@ngrx/store';
import { EntryModeActions } from '@store/actions';
import * as fromEntryMode from '@store/reducers/entry-mode.reducer';
import { selectEntryModeStateValue } from '@store/selectors/entry-mode.selector';


@Component({
    selector: 'view-mode',
    templateUrl: './view-mode.component.html',
    styleUrls: [
        './view-mode.component.common.scss',
        './view-mode.component.desktop.scss',
        './view-mode.component.mobile.scss',
    ],
    encapsulation: ViewEncapsulation.None
})
export class ViewModeComponent {
    @ViewChild('viewModeContainer') viewModeContainer: ElementRef;
    forms: EntryModeForm[];

    constructor(
        private entryModeStore: Store<fromEntryMode.State>) {
        this.entryModeStore.dispatch(EntryModeActions.fetch({ id: '' }));
        entryModeStore.pipe(select(selectEntryModeStateValue)).subscribe((forms: EntryModeForm[]) => {
            this.forms = forms;
        })
    }

    JsonStringify(object): string {
        return JSON.stringify(object);
    }
}