<template>
    <div class="print-invoice">
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

                <q-card-section>
                    <div class="text-h6">{{ $t("invoices.predracun") }}</div>
                </q-card-section>

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
                        <div class="row">
                           <div class="column left"></div>
                            <div class="column middle"></div>
                            <div class="column right">
                                <table v-for="cmp in company">
                                    <tr>
                                        <td>{{ $t("invoices.iban") }}: {{ $t("invoices.swift") }} {{ cmp.banka1 }}&nbsp;&nbsp;/&nbsp;&nbsp;{{ $t("invoices.swift") }} {{ cmp.banka2 }}</td>
                                    </tr>
                                    <tr>
                                        <td>TRR: {{ cmp.trr1 }}&nbsp;&nbsp;/&nbsp;&nbsp;{{ cmp.trr2 }}</td>
                                    </tr>
                                    <tr>
                                        <td>{{ $t("invoices.sklicevanje_stev") }}: 00{{ company.sklic_st !== " " ? company.sklic_st : '' }}-{{ invoice.sifra_predracuna | sifra }}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <div class="float-right mt-2">
                            <b>{{ $t("invoices.invoice").toUpperCase() }}: </b>{{ invoice.sifra_predracuna }}<br>
                            {{ place }}, {{ invoice.timestamp | moment('DD-MM-Y') }}<br>
                            <b>{{ $t("invoices.validity") }}:</b> {{ invoice.expiration | moment('DD-MM-Y') }}<br>

                            <span v-if="invoice.work_date">
                                 <b>{{ $t("invoices.work_done") }}:</b> {{ invoice.work_date | moment('DD-MM-Y') }}<br>
                            </span>

                            {{ $t("invoices.id_ddv") }}: <span v-for="cmp in company">{{ cmp.zavezanec_za_ddv }}</span><br>

                            <span v-if="customer.id_ddv">{{ $t("invoices.id_ddv_customer") }}: {{ customer.id_ddv }}<br><br></span>
                        </div>

                        <div class="float-left mt-4 recipient">
                            <b>{{ customer.naziv_partnerja | uppercase }}</b><br>
                            <b>{{ customer.kraj_ulica | uppercase}}</b><br>
                            <b>{{ customer.posta | uppercase}}</b><br>
                        </div>
                        <div class="pb-5" v-if="recipient"></div>
                        <div id="mainContent" style="margin-top: 170px">
                            <div class="float-left mb-1 mt-3">
                                <span v-if="recipient">
                                     <b>{{ $t("invoices.recipient") }}</b>:<br>
                                    {{ recipient.title }}<br>
                                    {{ recipient.street }}<br>
                                    {{ recipient.posta }}<br>
                                </span>
                            </div>
                            <table class="table full-width table-font">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col" class="format-text">{{ $t("invoices.description") }}</th>
                                    <th scope="col" class="format-text">{{ $t("invoices.em") }}</th>
                                    <th scope="col" class="format-text">{{ $t("invoices.qty") }}</th>
                                    <th scope="col" class="format-text">{{ $t("invoices.price") }}</th>
                                    <th scope="col" class="format-text">{{ $t("invoices.discount") }}</th>
                                    <th scope="col" class="format-text">{{ $t("invoices.ddv") }}</th>
                                    <th scope="col" class="format-text">{{ $t("invoices.vrednost") }}</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, index) in items">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ item.description }}</td>
                                    <td>{{ item.unit }}</td>
                                    <td>{{ item.qty }}</td>
                                    <td>{{ item.item_price | reformat }}</td>
                                    <td>{{ item.discount }}</td>
                                    <td>{{ vat() }}</td>
                                    <td>{{ item.total_price | reformat }}</td>
                                </tr>
                                </tbody>
                            </table>
                            <hr style="background: black;" class="margin-line">
                            <div class="float-right">
                                {{ $t("invoices.skupaj") }}: {{ subTotal() | reformat | eur }}
                            </div>
                            <br>
                            <div class="float-right">
                                {{ $t("invoices.ddv") }}: {{ invoice.vat | procent }}   {{ $t("invoices.osnova") }}  {{ subTotal() | reformat }} : &nbsp;&nbsp;&nbsp;&nbsp;
                                <span v-if="invoice.klavzula === '76A'">
                                    {{ $t("invoices.zeroEUR") }}
                                </span>
                                <span v-else>
                                    {{ vatDifference() | reformat | eur }}
                                </span>
                            </div>
                            <br>
                            <br>
                            <div class="float-right">
                                <b>{{ $t("invoices.forPayment") }}</b>:
                                <span v-if="invoice.klavzula === '76A'">
                                {{ subTotal() | reformat }}
                                </span>
                                <span v-else>
                                    {{ invoice.total | reformat | eur }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="container" style="margin-top: 70px; margin-bottom: 5px">
                        <p style="margin-bottom: 3%;" v-if="klavzula" class="klavzula-text" v-html="klavzula.description"></p>
                        <div class="mt-2 mb-5" v-if="invoice.klavzula === '76A'">
                            <table class="clen">
                                <tr>
                                    <td></td>
                                    <td>{{ $t("invoices.osnova").toUpperCase() }}</td>
                                    <td>{{ $t("invoices.ddv") }}</td>
                                </tr>
                                <tr>
                                    <td>{{ $t("invoices.total76A") }}</td>
                                    <td>{{ subTotal() | reformat }}</td>
                                    <td>{{ vatDifference76() | reformat }}</td>
                                </tr>
                            </table>
                        </div>
                        <div id="name" style="margin-top: 1%" v-for="cmp in company">
                            {{ author }}<br>
                            <img :src="image(cmp.stamp)" style="height: 110px;" alt="">
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
import {author, place, picturesPath} from "../../../global/variables";

export default {
    name: "PrintInvoice",
    data() {
        return {
            maximizedToggle: true,
            output: null,
            author: author,
            place: place
        }
    },
    computed: {
        ...mapGetters({
            dialog: 'general/getPrintInvoiceDialog',
            invoice: 'invoices/getInvoice',
            company: 'company/getCompany',
            items: 'invoices/getItems',
            customer: 'invoices/getInvoiceCustomer',
            recipient: 'invoices/getRecipient',
            klavzula: 'invoices/getKlavzula'
        })
    },
    created() {
        this.$store.dispatch('company/all')
    },
    filters: {
        formatNum(val) {
            if (!isNaN(val)) {
                val = parseFloat(val)
            }
            return !isNaN(val) ? val.toFixed(2) : val
        },
        reformat(val) {
            if (!isNaN(val)) {
                return val.toLocaleString('de-DE', { minimumFractionDigits: 2 })
            }
        },
        titleShort(val) {
            return val.substring(31,51)
        },
        titleLong(val) {
            return val.substring(0,30)
        },
        sifra(val) {
            if (val) {
                return val.replace(/\//g, '')
            }
        },
        uppercase(val) {
            if (val) {
                return val.toUpperCase()
            }
        },
        eur(val) {
            return val + ' EUR'
        },
        procent(val) {
            return val + ' %'
        }
    },
    methods: {
        ...mapActions({
            closeEditDialog: 'general/printInvoiceDialog',
        }),
        closeDialog() {
            this.closeEditDialog(false)
        },
        print() {
            this.$htmlToPaper('content');
        },
        image(img) {
            return picturesPath + img
        },
        subTotal() {
            let total = 0
            this.items.forEach(item => {
                return total += item.total_price
            })
            return total
        },
        vatDifference() {
            let total = 0
            let diff = 0
            total = this.subTotal()
            diff = this.invoice.vat * 0.01 * total
            return diff.toFixed(2)
        },
        vatDifference76() {
            let subtotal = this.subTotal()
            return subtotal * (0.01 * 22)
        },
        vat() {
            return this.invoice.vat
        },
        invoicePath() {
            return this.$router.currentRoute.fullPath === '/'
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
    .klavzula-text {
        font-size: 14px;
    }
    .recipient {
        font-size: 23px !important;
        margin-left: 3rem;
    }
    .clen {
        width: 80%;
    }
    .format-text {
        text-align: left;
    }
</style>
