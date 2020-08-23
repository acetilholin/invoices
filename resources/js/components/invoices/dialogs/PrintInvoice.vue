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
                    <div class="text-h6">Ogled predračuna</div>
                </q-card-section>

                <q-card-section class="q-pt-none" id="content">

                    <table class="table full-width">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Opis blaga</th>
                            <th scope="col">EM</th>
                            <th scope="col">Količina</th>
                            <th scope="col">Cena</th>
                            <th scope="col">Popust</th>
                            <th scope="col">DDV</th>
                            <th scope="col">Vrednost</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in items">
                            <th scope="row">{{ index + 1 }}</th>
                            <td>{{ item.description }}</td>
                            <td>{{ item.unit }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.item_price | decimals }}</td>
                            <td>{{ item.discount }}</td>
                            <td>{{ item.vat }}</td>
                            <td>{{ item.total_price | decimals }}</td>
                        </tr>
                        </tbody>
                    </table>
                </q-card-section>
                <q-page-container>
                    <q-page-sticky position="bottom-right" :offset="[25, 18]">
                        <q-btn fab icon="print" color="green" @click="print"/>
                    </q-page-sticky>
                </q-page-container>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    name: "PrintInvoice",
    data() {
        return {
            maximizedToggle: true,
            output: null
        }
    },
    computed: {
        ...mapGetters({
            dialog: 'general/getPrintInvoiceDialog',
            invoice: 'invoices/getInvoice',
            items: 'invoices/getItems'
        })
    },
    filters: {
        decimals(value) {
            return Math.round(value * 100) / 100
        }
    },
    methods: {
        ...mapActions({
            closeEditDialog: 'general/printInvoiceDialog'
        }),
        closeDialog() {
            this.closeEditDialog(false)
        },
        print() {
            this.$htmlToPaper('content');
        }
    }
}
</script>

<style scoped>

</style>
