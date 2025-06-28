import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, catchError, of } from 'rxjs';
import { WeatherResponse } from '../types/weather.type';
import { GeoapifyResponse } from '../types/geoapify.type';
import { environment } from '../environment/environment';
import { getWeatherDescription } from '../utils/weather.utils';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
  private geoApiKey = environment.geoApiKey;

  getTemperatureByCity(city: string): Observable<{ temperature: number; description: string }> {
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
        return of({ lat: 65.8251, lon: 21.688 });
      }),
      switchMap(({ lat, lon }) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode`;
        return this.http.get<WeatherResponse>(url).pipe(
          map((response) => {
            return {
              temperature: response.current.temperature_2m,
              description: getWeatherDescription(response.current.weathercode)
            };
          })
        );
      })
    );
  }

  getCityFromCoordinates(lat: number, lon: number): Observable<string> {
    const reverseGeoUrl = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${this.geoApiKey}`;

    return this.http.get<GeoapifyResponse>(reverseGeoUrl).pipe(
      map((res) => {
        const city = res.features[0]?.properties.city;
        if (!city) throw new Error('City not found from coordinates');
        return city;
      }),
      catchError(() => of('Boden'))
    );
  }
}
