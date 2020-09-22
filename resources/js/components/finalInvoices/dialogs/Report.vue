<template>
    <div class="report">
        <q-dialog
            v-model="dialog"
            persistent
            :maximized="maximizedToggle"
            transition-show="slide-up"
            transition-hide="slide-down"
        >
            <q-card class="bg-white text-black">
                <q-bar>
                    <q-space />
                    <q-btn dense flat icon="close" @click="closeDialog()">
                        <q-tooltip>Zapri</q-tooltip>
                    </q-btn>
                </q-bar>

                <q-card-section v-if="reportExists()" class="q-pa-xl">
                    <div class="q-mt-xl absolute-center">
                        <q-icon style="font-size: 2em" class="text-warning" name="warning"/>{{ $t("report.noData") }}</div>
                </q-card-section>
                <q-card-section v-else class="q-pt-none font-size-body" id="content">
                    <div class="container text-center mt-1">
                        {{ $t("report.book") }} {{ $t("report.from") }} {{ report.from | moment('DD-MM-Y') }} {{ $t("report.to") }} {{ report.to | moment('DD-MM-Y') }}
                    </div>
                    <table class="table text-center full-width mt-3 mb-5 table-report" style="font-size: 12.5px">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Datum</th>
                            <th scope="col">Stranka</th>
                            <th scope="col">Račun</th>
                            <th scope="col">ID DDV</th>
                            <th scope="col">Brez davka</th>
                            <th scope="col">0% za EU</th>
                            <th scope="col">DDV 9.5%</th>
                            <th scope="col">DDV 22%</th>
                            <th scope="col">0% 76A čl.</th>
                            <th scope="col">Skupaj</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(final, index) in report.final">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ final.timestamp | moment('DD-MM-Y') }}</td>
                            <td>{{ final.ime_priimek }}<br>
                                {{ final.kraj_ulica }}, {{ final.posta }}</td>
                            <td>{{ final.sifra_predracuna }}</td>
                            <td>{{ final.id_ddv }}</td>
                            <td>{{ final.noVAT | reformat }}</td>
                            <td>{{ EU0(final.tujina, final.noVAT ) | reformat }}</td>
                            <td>{{ price95(final.vat, final.klavzula, final.noVAT, final.total) | reformat }} </td>
                            <td>{{ price22(final.vat, final.klavzula, final.noVAT, final.total) | reformat }}</td>
                            <td>{{ price76(final.klavzula, final.noVAT) | reformat }}</td>
                            <td><b>{{ final.total | reformat }}</b></td>
                        </tr>
                        <tr>
                            <th scope="col">{{ totalInvoices() }}</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col"></th>


                            <th scope="col">{{ noVATTotal() | reformat }}</th>
                            <th scope="col">{{ euTotal() | reformat }}</th>
                            <th scope="col">{{ total95() | reformat }}</th>
                            <th scope="col">{{ total22() | reformat }}</th>
                            <th scope="col">{{ total76() | reformat }}</th>
                            <th scope="col">{{ grandTotal() | reformat }}</th>
                        </tr>
                        </tbody>
                    </table>
                </q-card-section>
                <q-page-container v-if="!reportExists()">
                    <q-page-sticky position="bottom-right" :offset="[25, 100]">
                        <q-btn fab icon="print" color="green" @click="print"/>
                    </q-page-sticky>
                </q-page-container>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
    name: "Report",
    data() {
        return {
            maximizedToggle: true
        }
    },
    computed: {
        ...mapGetters({
            dialog: 'general/getReportDialog',
            report: 'final/getReport'
        })
    },
    filters: {
        reformat(val) {
            if (val !== undefined) {
                return val.toLocaleString('de-DE', { minimumFractionDigits: 2 })
            }
        },
        euro(val) {
            return val + ' €'
        }
    },
    methods: {
        ...mapActions({
            closeEditDialog: 'general/reportDialog'
        }),
        closeDialog() {
            this.closeEditDialog(false)
        },
        print() {
            this.$htmlToPaper('content', {

            });
        },
        reportExists() {
            if (this.report.final) {
                return this.report.final.length === 0
            }
        },
        EU0(tujina, val) {
            if (tujina) {
                return val
            }
        },
        price95(vat, klavzula, noVat, total) {
            if (vat === 9.5 && klavzula !== '76A') {
                let price = 0
                price = total - noVat
                return price
            }
        },
        price22(vat, klavzula, noVat, total) {
            if (vat === 22 && klavzula !== '76A') {
                let price = 0
                price = total - noVat
                return price
            }
        },
        price76(klavzula, noVAT) {
            if (klavzula === '76A') {
                let total = 0
                total = noVAT * 0.22
                return total
            }
        },
        totalInvoices() {
            if (this.report.final) {
                return this.report.final.length
            }
        },
        noVATTotal() {
            if (this.report.final) {
                let total = 0
                this.report.final.forEach(item => {
                    total += item.noVAT
                })
                return total
            }
        },
        euTotal() {
            if (this.report.final) {
                let total = 0
                this.report.final.forEach(item => {
                    if (item.tujina) {
                        total += item.noVAT
                    }
                })
                return total
            }
        },
        total95() {
            if (this.report.final) {
                let total = 0
                this.report.final.forEach(item => {
                    if (item.vat === 9.5 && item.klavzula !== '76A') {
                        total += item.total - item.noVAT
                    }
                })
                return total
            }
        },
        total22() {
            if (this.report.final) {
                let total = 0
                this.report.final.forEach(item => {
                    if (item.vat === 22 && item.klavzula !== '76A') {
                        total += item.total - item.noVAT
                    }
                })
                return total
            }
        },
        total76() {
            if (this.report.final) {
                let total = 0
                this.report.final.forEach(item => {
                    if (item.klavzula === '76A') {
                        total += item.noVAT * 0.22
                    }
                })
                return total
            }
        },
        grandTotal() {
            if (this.report.final) {
                let total = 0
                this.report.final.forEach(item => {
                    total += item.total
                })
                return total
            }
        }
    }
}
</script>

<style scoped>
@media print {
    @page {size: A4 landscape; }
}
</style>
