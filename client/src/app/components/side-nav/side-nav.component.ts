import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: [
        './side-nav.component.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class SideNavComponent {
    @Output() sidenavClose = new EventEmitter();
    menuItems = [{
        link: '/',
        icon: 'home',
        label: 'Home'
    }]

    constructor(public router: Router) { }

    public onSidenavClose(): void {
        this.sidenavClose.emit();
    }

    isSelected(option: string): boolean {
        return this.router.url === option;
    }

    logout($event): void {
        $event.stopPropagation();
        this.sidenavClose.emit();
    }
}