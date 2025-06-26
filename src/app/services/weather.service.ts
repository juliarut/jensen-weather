import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, catchError, of } from 'rxjs';
import { WeatherResponse } from '../types/weather.type';
import { GeoapifyResponse } from '../types/geoapify.type';
import { environment } from '../environment/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
  private geoApiKey = environment.geoApiKey;

  getTemperatureByCity(city: string): Observable<number> {
    const geoUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      city
    )}&apiKey=${this.geoApiKey}`;

    return this.http.get<GeoapifyResponse>(geoUrl).pipe(
      map((res) => {
        const loc = res.features[0]?.properties;
        if (!loc) throw new Error('Location not found');
        return { lat: loc.lat, lon: loc.lon };
      }),
      catchError(() => {
        return of({ lat: 65.8251, lon: 21.6880 }); // Boden
      }),
      switchMap(({ lat, lon }) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;
        return this.http.get<WeatherResponse>(url);
      }),
      map((response) => response.current.temperature_2m)
    );
  }
}