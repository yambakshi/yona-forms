import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { EntryField } from '@models/entry-field';
import { FormSchemaField } from '@models/form-schema-field';
import { select, Store } from '@ngrx/store';
import { selectEditModeStateValue } from '@store/selectors/edit-mode.selector';
import { selectEntryModeStateValue } from '@store/selectors/entry-mode.selector';
import * as fromEditMode from '@store/reducers/edit-mode.reducer';
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
export class MainViewComponent implements AfterViewInit {
    @ViewChild('headerTabs') headerTabs: ElementRef;
    @ViewChild('tabsLine') tabsLine: ElementRef;
    @ViewChild('sectionBody') sectionBody: ElementRef;
    fields$: Observable<FormSchemaField[]>;
    entryForm$: Observable<EntryField[]>;
    modesTabs: string[] = [
        'EDIT MODE',
        'ENTRY MODE',
        'VIEW MODE',
    ];
    selectedTab: number = 0;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private renderer: Renderer2,
        private store: Store<fromEditMode.State>) {
        this.fields$ = store.pipe(select(selectEditModeStateValue));
        this.entryForm$ = store.pipe(select(selectEntryModeStateValue));
    }

    ngAfterViewInit(): void {
        if (!isPlatformBrowser(this.platformId)) return;
        this.setTabsLine(this.selectedTab);
        const selectedElement = this.sectionBody.nativeElement.children[this.selectedTab];
        this.renderer.setStyle(selectedElement, 'display', 'flex')
    }

    selectTab(i: number): void {
        if (i === this.selectedTab) return;
        const deselectedElement = this.sectionBody.nativeElement.children[this.selectedTab];
        this.renderer.setStyle(deselectedElement, 'display', 'none');
        this.selectedTab = i;
        this.setTabsLine(i);
        const selectedElement = this.sectionBody.nativeElement.children[this.selectedTab];
        this.renderer.setStyle(selectedElement, 'display', 'flex');
    }

    setTabsLine(i: number): void {
        const selectedTab = this.headerTabs.nativeElement.children[i];
        const tabWidth = selectedTab.offsetWidth;
        const tabLeft = selectedTab.offsetLeft;
        this.renderer.setStyle(this.tabsLine.nativeElement, 'left', `${tabLeft}px`);
        this.renderer.setStyle(this.tabsLine.nativeElement, 'width', `${tabWidth}px`);
    }
}