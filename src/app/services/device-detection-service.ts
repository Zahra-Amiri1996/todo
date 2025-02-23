import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectionServiceService implements OnDestroy {
  isMobile = signal<boolean>(false);
  breakpointObserver = inject(BreakpointObserver);
  subscriptions = new Subscription();

  checkIfMobile(): void {
    const subscription = this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile.set(result.matches);
      });
    this.subscriptions.add(subscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
