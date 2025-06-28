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
  private weatherService = inject(WeatherService);
  city = 'Boden';
  temperature: number | null = null;
  description: string | null = null;
  temperatureData: { city: string; temperature: number; description: string }[] = [];

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
      next: ({ temperature, description }) => {
        this.temperature = temperature;
        this.description = description;
        this.temperatureData.push({ city: this.city, temperature, description });
      },
      error: (err) =>
        console.error(`Error fetching temperature for ${this.city}`, err),
    });
  }

  fetchWeatherByLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.weatherService.getCityFromCoordinates(latitude, longitude).subscribe((city) => {
          this.city = city;
          this.fetchTemperature();
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
      }
    );
  }

  downloadCSV() {
    const header = 'City,Temperature (°C),Description\n';
    const rows = this.temperatureData
      .map((entry) => `${entry.city},${entry.temperature},${entry.description}`)
      .join('\n');
    const csvContent = '\uFEFF' + header + rows;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weather.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
