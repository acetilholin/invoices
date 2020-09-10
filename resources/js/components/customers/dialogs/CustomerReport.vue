<template>
    <div class="customer-report">
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

                <q-card-section class="q-pt-none font-size-body" id="content">
                    <div class="container c-mt">
                        <div class="row" v-for="cmp in company">
                            <div class="column left">
                                {{ cmp.naziv | titleLong }}<br>
                                {{ cmp.naziv | titleShort }}<br>
                                {{ cmp.naslov }}<br>
                                {{ cmp.posta }}
                            </div>
                            <div class="column middle">

                                <img :src="image(cmp.logo)" style="height: 95px; width: 170px;" alt="">

                            </div>
                            <div class="column right text-right">
                                {{ cmp.telefon1 }}<br>
                                {{ cmp.telefon2 }}<br>
                                {{ cmp.email1 }}<br>
                                {{ cmp.email2 }}
                            </div>
                        </div>
                        <hr style="background: black">
                        <br>
                        <div class="text-center mb-1"> {{ title | upper }}</div>
                        <table class="table full-width table-font q-pt-xl">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" class="format-text">{{ $t("customers.report.sifra") }}</th>
                                <th scope="col" class="format-text">{{ $t("customers.report.timestamp") }}</th>
                                <th scope="col" class="format-text">{{ $t("customers.report.total") }}</th>
                                <th scope="col" class="format-text">{{ $t("customers.report.expiration") }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(invoice, index) in invoices">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ invoice.sifra_predracuna }}</td>
                                <td>{{ invoice.timestamp | moment('DD-MM-Y') }}</td>
                                <td>{{ invoice.total | reformat | eur }}</td>
                                <td>{{ invoice.expiration | moment('DD-MM-Y') }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <hr style="background: black;" class="margin-line">
                        <div class="float-left mt-3">
                            {{ customer.naziv_partnerja}}<br>
                            {{ customer.kraj_ulica }}<br>
                            {{ customer.posta }}<br>
                        </div>
                        <div class="float-right mt-3">
                            {{ $t("invoices.skupaj") }}: {{ totalPrice() | reformat | eur }}
                        </div>
                    </div>
                </q-card-section>
                <q-page-container>
                    <q-page-sticky position="bottom-right" :offset="[25, 100]">
                        <q-btn fab icon="print" color="green" @click="print"/>
                    </q-page-sticky>
                </q-page-container>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import {picturesPath} from "../../../global/variables";

export default {
    name: "CustomerReport",
    data() {
        return {
            maximizedToggle: true
        }
    },
    props: ['invoices','customer','title'],
    computed: {
        ...mapGetters({
            dialog: 'general/getCustomerReportDialog',
            company: 'company/getCompany'
        })
    },
    created() {
      this.$store.dispatch('company/all')
    },
    filters: {
        upper(val) {
          return val.toUpperCase()
        },
        titleShort(val) {
            return val.substring(31,51)
        },
        titleLong(val) {
            return val.substring(0,30)
        },
        reformat(val) {
            if (!isNaN(val)) {
                return val.toLocaleString('de-DE', { minimumFractionDigits: 2 })
            }
        },
        eur(val) {
            return val + ' EUR'
        },
    },
    methods: {
        ...mapActions({
            closeEditDialog: 'general/customerReportDialog',
        }),
        closeDialog() {
            this.closeEditDialog(false)
        },
        image(img) {
            return picturesPath + img
        },
        print() {
            this.$htmlToPaper('content');
        },
        totalPrice() {
            let total = 0.0

            this.invoices.forEach(item => {
                total += parseFloat(item.total)
            })
            return total
        }
    }
}
</script>

<style scoped>
.column {
    float: left;
}
.left {
    width: 45%;
}
.middle {
    width: 20%;
}
.right {
    width: 35%;
}
.text-right {
    text-align: right
}
.c-mt {
    margin-top: 10px
}
.column img {
    vertical-align: middle
}
.margin-line {
    margin-bottom: 2rem;
}
.font-size-body {
    font-size: 19px
}
.table-font {
    font-size: 14px;
}
.format-text {
    text-align: left;
}
</style>
