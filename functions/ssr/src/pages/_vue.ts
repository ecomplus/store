import type { App } from 'vue';
import _createApp from '@@sf/pages/_vue';
import Carousel from '@@sf/components/Carousel.vue';
import CarouselControl from '@@sf/components/CarouselControl.vue';

const createApp = (app: App) => {
  _createApp(app);
  app.component('Carousel', Carousel);
  app.component('CarouselControl', CarouselControl);
};

export default createApp;

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Carousel: typeof Carousel;
    CarouselControl: typeof CarouselControl;
  }
}
