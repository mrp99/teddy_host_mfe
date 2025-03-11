import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes_host } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

export const appConfig_host: ApplicationConfig = {
  providers: [
    provideRouter(routes_host),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    importProvidersFrom(BrowserModule),
  ]
}
