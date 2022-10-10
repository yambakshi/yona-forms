import { Injectable } from "@angular/core";
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class RouterService {
    loading: boolean = false;

    constructor(private router: Router) {
        this.router.events.subscribe((event: Event) => {
            switch (true) {
                case event instanceof NavigationStart: {
                    this.loading = true;
                    break;
                }

                case event instanceof NavigationEnd:
                case event instanceof NavigationCancel:
                case event instanceof NavigationError: {
                    this.loading = false;
                    break;
                }
                default: {
                    break;
                }
            }
        });
    }
}