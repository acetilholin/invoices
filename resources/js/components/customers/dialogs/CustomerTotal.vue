<template>
    <div class="customer-total">
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
                    <span class="text-h6">{{ customer.naziv_partnerja}}</span>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-card>
                        <q-tabs
                            v-model="tab"
                            dense
                            class="text-grey"
                            active-color="primary"
                            indicator-color="primary"
                            align="justify"
                            narrow-indicator
                        >
                            <q-tab name="invoicesTotal" label="Predračuni" />
                            <q-tab name="finalTotal" label="Računi" />
                        </q-tabs>

                        <q-separator />

                        <q-tab-panels v-model="tab" animated>
                            <q-tab-panel name="invoicesTotal">
                                <total-invoices :invoices="invoices" :customer="customer"></total-invoices>
                            </q-tab-panel>
                            <q-tab-panel name="finalTotal">
                                <total-final :invoices="final" :customer="customer"></total-final>
                            </q-tab-panel>
                        </q-tab-panels>
                    </q-card>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import TotalInvoices from "../tables/TotalInvoices";
import TotalFinal from "../tables/TotalFinal";

export default {
    name: "CustomerTotal",
    data() {
        return {
            invoiceTab: 'predracuni',
            finalTab: 'racuni',
            maximizedToggle: true,
            tab: 'invoicesTotal'
        }
    },
    computed: {
        ...mapGetters({
            dialog: 'general/getCustomerTotalDialog',
            invoices: 'customers/getCustomerTotalInvoices',
            final: 'customers/getCustomerTotalFinal',
            customer: 'customers/getCustomer'
        })
    },
    components: {
        TotalFinal,
        TotalInvoices
    },
    methods: {
        ...mapActions({
            closeTotalDialog: 'general/customerTotalDialog'
        }),
        closeDialog() {
            this.closeTotalDialog(false)
        },
    }
}
</script>

<style scoped>

</style>
