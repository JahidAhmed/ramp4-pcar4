<template>
    <div class="h-full relative">
        <esri-map></esri-map>

        <!-- TODO: should inner shell be a separate component? -->
        <div class="inner-shell absolute top-0 left-0 h-full w-full pointer-events-none">
            <panel-stack class="absolute inset-0 xs:pl-12 md:p-3 md:pl-20 lg:p-3"></panel-stack>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Get, Sync, Call } from 'vuex-pathify';

import EsriMap from '@/components/map/esri-map.vue';
import PanelStackV from '@/components/panel-stack/panel-stack.vue';

@Component({
    components: {
        EsriMap,
        'panel-stack': PanelStackV
    }
})
export default class Shell extends Vue {}
</script>

<style lang="scss" scoped></style>
