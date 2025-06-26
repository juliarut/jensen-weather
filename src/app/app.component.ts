import { Component, inject } from '@angular/core';
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
export class AppComponent {
  private weatherService = inject(WeatherService);
  city = 'Boden';
  temperature: number | null = null;
  temperatureData: { city: string; temperature: number }[] = [];

  fetchTemperature() {
    this.weatherService.getTemperatureByCity(this.city).subscribe({
      next: (temp) => {
        this.temperature = temp;
        this.temperatureData.push({ city: this.city, temperature: temp });
      },
      error: (err) =>
        console.error(`Error fetching temperature for ${this.city}`, err),
    });
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
