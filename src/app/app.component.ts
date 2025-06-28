import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  private weatherService = inject(WeatherService);
  city = 'Boden';
  temperature: number | null = null;
  temperatureData: { city: string; temperature: number }[] = [];

  ngOnInit(): void {
    const savedCity = localStorage.getItem('city');
    if (savedCity) {
      this.city = savedCity;
      this.fetchTemperature();
    }
  }

  fetchTemperature() {
    localStorage.setItem('city', this.city);

    this.weatherService.getTemperatureByCity(this.city).subscribe({
      next: (temp) => {
        this.temperature = temp;
        this.temperatureData.push({ city: this.city, temperature: temp });
      },
      error: (err) =>
        console.error(`Error fetching temperature for ${this.city}`, err),
    });
  }

  fetchWeatherByLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        this.weatherService.getCityFromCoordinates(lat, lon).subscribe({
          next: (cityName) => {
            this.city = cityName;
            this.fetchTemperature();
          },
          error: (err) =>
            console.error('Geolocation lookup failed:', err),
        });
      },
      (error) => console.error('Error getting location', error)
    );
  }

  downloadCSV() {
    const header = 'City,Temperature (°C)\n';
    const data = `${this.city},${this.temperature ?? 'N/A'}\n`;
    const csvContent = '\uFEFF' + header + data;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weather.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
