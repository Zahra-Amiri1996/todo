import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeviceDetectionService } from './services/device-detection-service';
import { BaseApiService } from './services/base-api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  deviceDetectionServiceService = inject(DeviceDetectionService);
  baseApiService = inject(BaseApiService);

  ngOnInit() {
    this.deviceDetectionServiceService.checkIfMobile();
  }
}
