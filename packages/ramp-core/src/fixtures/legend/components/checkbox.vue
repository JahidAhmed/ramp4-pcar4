<template>
    <div class="relative">
        <!-- TODO: see if getting this to use v-model works; children wouldnt update properly on initial try -->
        <input
            :type="isRadio ? 'radio' : 'checkbox'"
            :checked="value"
            @click.stop="legendItem.toggleVisibility()"
            @keyup.enter.stop="legendItem.toggleVisibility()"
            :class="isRadio ? 'form-radio' : 'form-checkbox rounded-none'"
            class="mx-5 h-15 w-15 text-black border-gray-500 hover:border-black cursor-pointer"
            tabindex="-1"
        />
        <tooltip position="top-right"> {{ $t(value ? 'legend.visibility.hide' : 'legend.visibility.show') }} </tooltip>
    <!-- Display a checkbox. -->
    <!-- <div v-if="!isRadio" class="relative">
        <input type="checkbox" :checked="value.visibility" @click="toggleVisibility(value)" class="rounded-none form-checkbox mx-5 h-15 w-15 text-black border-gray-500 hover:border-black cursor-pointer">
        <tooltip position="left"> {{$t(value.visibility? 'legend.hide' : 'legend.show')}} </tooltip>
    </div> -->

    <!-- If isRadio is set to true, a radio button will be displayed instead. -->
    <!-- <div v-else class="relative">
        <input type="radio" :checked="value.visibility" :name="legendItem.parent.name" @click="toggleVisibility(value)" class="form-radio mx-5 h-15 w-15 text-black border-gray-500 hover:border-black cursor-pointer">
        <tooltip position="left"> {{$t(value.visibility? 'legend.hide' : 'legend.show')}} </tooltip>
    </div> -->
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Get, Sync, Call } from 'vuex-pathify';

import { LegendEntry, LegendGroup } from '../store/legend-defs';
import LegendGroupV from './legend-group.vue';

@Component
export default class CheckboxV extends Vue {
    @Prop() value!: boolean;
    @Prop() isRadio!: boolean;
    @Prop() legendItem!: LegendEntry;

    // TODO any in this case is only the symbology stack item definition, change this
    toggleVisibility(value: LegendGroup | LegendEntry | any): void {
        let defClause: string = '';

        if (value instanceof LegendGroup) {
            // TODO
            this.legendItem.toggleVisibility();
        } else if (value instanceof LegendEntry) {
            // TODO
            this.legendItem.toggleVisibility();
        } else {
            value.visibility = !value.visibility;
            if (this.allSymbolsVisible()) {
                defClause = '';
                this.legendItem.toggleVisibility(true);
            } else if (this.noSymbolsVisible()) {
                defClause = '1=2';
                this.legendItem.toggleVisibility(false);
            } else {
                defClause = <string>this.legendItem.layer?.getLegend().filter(item => item.visibility === true).map(item => item.definitionClause).join(' OR ');
                this.legendItem.toggleVisibility(true);
            }
        }

        this.legendItem.layer?.setSqlFilter('symbol', defClause);
    }

    allSymbolsVisible() {
        return this.legendItem.layer?.getLegend().every(item => item.visibility === true);
    }

    noSymbolsVisible() {
        return !this.legendItem.layer?.getLegend().some(item => item.visibility === true);
    }
}
</script>

<style lang="scss"></style>
