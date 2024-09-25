import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(appConfig),
//     { provide:HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
//   ]
// }).catch((err) => console.error(err));