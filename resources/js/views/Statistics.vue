<template>
    <div class="statistics">
        <div class="text-center q-mt-xl text-subtitle1" v-if="total">
            {{ $t("statistics.totalEarnings") }}: <span class="text-primary">{{ total.interval }}</span>
            <br>
            <div>&Sigma;: <span class="text-green-10">{{ total.grandTotal}}€</span></div>
        </div>
        <div class="small q-mt-lg">
            <total :total="total"></total>
        </div>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import Total from "../components/statistics/charts/Total";

export default {
    name: "Statistics",
    computed: {
        ...mapGetters({
            total: 'statistics/getTotal'
        }),
    },
    components: {
        Total
    },
    mounted() {
        this.$store.dispatch('statistics/total')
    }
}
</script>

<style scoped>
.small {
    max-height: 250px;
    max-width: 95%;
}
</style>
