import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
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
export class MainViewComponent implements OnInit, AfterViewInit {
    @ViewChild('headerTabs') headerTabs: ElementRef;
    @ViewChild('tabsLine') tabsLine: ElementRef;
    @ViewChild('sectionBody') sectionBody: ElementRef;
    fields$: Observable<Field[]>;
    modesTabs: string[] = [
        'EDIT MODE',
        'ENTRY MODE',
        'VIEW MODE',
    ];
    selectedTab: number = 0;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private renderer: Renderer2,
        private store: Store<fromLayout.State>,
        private formsApiService: FormsApiService,
        private formBuilder: FormBuilder) {
        this.fields$ = store.pipe(select(selectSearchStateValue));
    }

    ngOnInit(): void { }

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