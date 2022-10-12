import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';


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
    modesTabs: string[] = [
        'EDIT MODE',
        'ENTRY MODE',
        'VIEW MODE',
    ];
    selectedTab: number = 0;

    constructor(
        @Inject(PLATFORM_ID) private platformId: any,
        private renderer: Renderer2) {
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