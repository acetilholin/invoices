<template>
    <div class="website">
        <filter-dates class="q-mt-md q-mb-md" @interval="dataInterval"></filter-dates>
        <div class="text-center text-subtitle1" v-if="visitsInfo">
            {{ $t("statistics.allVisits") }}: <span class="text-blue-8">{{ data.totalVisitors }}</span> <br>
            {{ $t("statistics.avg") }}: {{ data.avg }} /{{ $t("general.day") }}
        </div>
        <div class="small q-mt-lg">
            <visits :info="data"></visits>
        </div>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import Visits from "../components/statistics/charts/Visits";
import FilterDates from "../components/invoices/filter/FilterDates";

    export default {
        name: "Website",
        data() {
            return {
                visitsInfo: false
            }
        },
        components: {
          Visits,
            FilterDates
        },
        mounted() {
            this.$q.loading.show({
                spinnerSize: 40
            })
            this.$store.dispatch('statistics/visits')
        },
        computed: {
            ...mapGetters({
                data: 'statistics/getData'
            })
        },
        methods: {
            ...mapActions({
                dateInterval: 'statistics/interval'
            }),
            dataInterval(interval) {
                this.dateInterval(interval)
            }
        },
        watch: {
            data: {
                handler() {
                    this.$q.loading.hide()
                    this.visitsInfo = true
                }
            }
        }
    }
</script>

<style scoped>
.small {
    max-height: 250px;
    max-width: 95%;
}
</style>
