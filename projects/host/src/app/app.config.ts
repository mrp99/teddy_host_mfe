import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { PreloadAllModules, provideRouter, withPreloading } from "@angular/router";
import { routes_host } from "./app.routes";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig_host: ApplicationConfig = {
  providers: [
    provideRouter(routes_host, withPreloading(PreloadAllModules)),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(BrowserModule),
    provideAnimations(),
  ]
}
