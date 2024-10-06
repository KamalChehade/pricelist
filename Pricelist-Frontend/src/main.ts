  import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
 import { AppModule } from './app/app.module';
import { provideHttpClient, withFetch } from '@angular/common/http';

import{
  register as registerSwiperElements
}from'swiper/element/bundle'
import { environment } from './environment/environment';
registerSwiperElements();
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
