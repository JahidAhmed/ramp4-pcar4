import Vue from 'vue';

import { Fixture } from '@/store/modules/fixture';

import SnowmanV from './snowman.vue'; // import on-map component
const svInstance = new (Vue.extend(SnowmanV))(); // instantiate it

class Snowman implements Fixture {
    id: string = 'Snowman';

    app!: Vue;

    added(): void {
        console.log(`[fixture] ${this.id} added`);

        // adds the snowman on-map component to the main map instance
        // TODO: this should be done in the `initialized` life hook
        svInstance.$mount();
        this.app.$el.appendChild(svInstance.$el);

        setTimeout(() => {
            console.log(`[fixture] ${this.id} self-terminates`);
            this.app.$store.set('fixture/removeFixture!', { value: this });

            // removes the snowman from DOM and destroys the instance
            // TODO: this should be called in the `terminated` life hook
            this.app.$el.removeChild(svInstance.$el);
            svInstance.$destroy();
        }, 6000);
    }

    removed(): void {
        console.log(`[fixture] ${this.id} removed`);
    }
}

export default new Snowman();