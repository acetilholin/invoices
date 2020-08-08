<template>
    <div>
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
                        <q-tooltip content-class="bg-white text-primary">Zapri</q-tooltip>
                    </q-btn>
                </q-bar>

                <q-card-section>
                    <div class="text-h5">Urejanje predračuna: <span class="text-primary">{{ invoice.ime_priimek }}</span></div>
                    <div class="text-body1">Ustvaril: <span class="text-grey-8">{{ invoice.author}}, dne: {{ invoice.timestamp | moment('DD-MM-Y') }}</span></div>
                    <div class="text-body1">Datum zapadlosti: <span :class="$moment(today()).isBefore(invoice.expiration) ? 'text-green' : 'text-red'">{{ invoice.expiration | moment('DD-MM-Y') }}</span></div>
                    <div class="text-body1">Delo opravljeno: <span class="text-grey-8" v-if="invoice.work_date">{{ invoice.work_date | moment('DD-MM-Y') }}</span></div>
                    <div class="text-body1">Klavzula: <span class="text-grey-8">{{ invoice.klavzula }}</span></div>
                </q-card-section>

                <q-card-section class="q-pt-none">

                    <div class="row q-pa-md justify-center">

                        <q-select
                            v-model="customer"
                            use-input
                            hide-selected
                            fill-input
                            input-debounce="0"
                            label="Stranka"
                            class="col-3 q-ml-sm"
                            :options="options"
                            @filter="filterInput"
                            @input="strankaChanged"
                            option-label="naziv_partnerja"
                            type="text"
                            map-options
                        >
                            <template v-slot:prepend>
                                <q-icon name="person" />
                            </template>
                        </q-select>

                        <q-input
                            ref="date"
                            v-model="timestamp"
                            label="Ustvarjen dne"
                            class="col-2 q-ml-sm"
                            @click="$refs.qDateTimestamp.show()"
                        >
                            <template v-slot:prepend>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateTimestamp">
                                        <q-date
                                            mask="YYYY-MM-DD"
                                            v-model="invoice.timestamp"
                                            @input="timestampChanged"
                                        />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>

                        <q-input
                            ref="date"
                            v-model="expiration"
                            label="Zapade dne"
                            class="col-2 q-ml-sm"
                            @click="$refs.qDateExpiration.show()"
                        >
                            <template v-slot:prepend>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateExpiration">
                                        <q-date
                                            mask="YYYY-MM-DD"
                                            v-model="invoice.expiration"
                                            @input="expirationChanged"
                                        />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>

                        <q-input
                            ref="date"
                            v-model="workDate"
                            label="Opravljeno dne"
                            class="col-2 q-ml-sm"
                            @click="$refs.qDateWorkDate.show()"
                        >
                            <template v-slot:prepend>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateWorkDate">
                                        <q-date
                                            mask="YYYY-MM-DD"
                                            v-model="invoice.work_date"
                                            @input="workDateChanged"
                                        />
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>

                        <q-select v-model="klavzula"
                                  :options="klavzule"
                                  label="Klavzula"
                                  @input="kChanged"
                                  option-value="short_name"
                                  option-label="short_name"
                                  class="col-1 q-ml-sm"
                        />
                        <q-select v-model="vat"
                                  :options="vatOptions"
                                  @input="vChanged"
                                  option-value="val"
                                  option-label="desc"
                                  label="DDV"
                                  suffix="%"
                                  class="col-1 q-ml-sm"
                        />

                    </div>
                </q-card-section>
                <q-card-section>
                    <div class="text-center">
                        <q-btn push
                               color="white"
                               text-color="green"
                               round
                               icon="add"
                               @click="addItem"
                        >
                            <q-tooltip anchor="top middle"
                                       self="bottom middle"
                                       :offset="[10, 10]"
                            >
                                Dodaj artikel
                            </q-tooltip>
                        </q-btn>
                    </div>
                </q-card-section>

                <q-card-section>
                    <div class="text-center">
                        <q-btn color="secondary"
                               outline
                               :loading="submitting"
                               label="Posodobi predračun"
                               @click="update(invoice.id)"
                        >
                            <template v-slot:loading>
                                <q-spinner-tail
                                    color="secondary"
                                />
                            </template>
                        </q-btn>
                    </div>
                </q-card-section>

                <q-card-section>
                    <add-item @newItem="addNewItem"></add-item>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <edit-table :invoice="invoice" :items="items"></edit-table>
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

    import EditTable from "../tables/EditTable";
    import Create from "../../App/Create";
    import AddItem from "./AddItem";
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "EditDialog",
        data() {
            return {
                submitting: false,
                options: this.customers,
                maximizedToggle: true,
                vatOptions: [
                    {
                        val: 0,
                        desc: '0'
                    },
                    {
                        val: 9.5,
                        desc: '9.5 %'
                    },
                    {
                        val: 22,
                        desc: '22 %'
                    },
                ]
            }
        },
        computed: {
            ...mapGetters({
                dialog: 'general/getEditInvoiceDialog',
                invoice: 'invoices/getInvoice',
                items: 'invoices/getItems',
                klavzule: 'klavzule/getKlavzule',
                customers: 'customers/getCustomers'
            }),
            timestamp: function () {
                return this.$moment(this.invoice.timestamp).format('DD-MM-Y')
            },
            expiration: function () {
                return this.$moment(this.invoice.expiration).format('DD-MM-Y')
            },
            workDate: {
                get: function () {
                    return this.invoice.work_date !== null ? this.$moment(this.invoice.work_date).format('DD-MM-Y') : null
                },
                set: function (newValue) {
                    return this.$moment(newValue).format('DD-MM-Y')
                }
            },
            klavzula: {
                get: function () {
                    return this.invoice.klavzula
                },
                set: function (newValue) {
                    this.invoice.klavzula = newValue.short_name
                }
            },
            vat: {
                get: function () {
                    return this.invoice.vat
                },
                set: function (newValue) {
                    this.invoice.vat = newValue.val
                }
            },
            customer: {
                get: function () {
                    return this.invoice.ime_priimek
                },
                set: function (newValue) {
                    this.invoice.ime_priimek = newValue.naziv_partnerja
                }
            }
        },
        components: {
            AddItem,
            Create,
            EditTable
        },
        created() {
          this.$store.dispatch('klavzule/klavzuleAction')
          this.$store.dispatch('customers/all')
        },
        methods: {
            ...mapActions({
               closeEditDialog: 'general/editInvoiceDialogAction',
               addItemDialog: 'general/addItemDialog',
               updateInvoice: 'invoices/update'
            }),
            addNewItem(newItem) {
                this.showNotif('Artikel dodan', 'positive')
                this.items.push(newItem)
            },
            addItem() {
                this.addItemDialog(true)
            },
            filterInput (val, update, abort) {
                update(() => {
                    const needle = val.toLowerCase()
                    this.options = this.customers.filter(
                        v => v.naziv_partnerja.toLowerCase().indexOf(needle) > -1
                    )
                })
            },
            showNotif(message, type) {
                this.$q.notify({
                    message: message,
                    position: 'top',
                    type: type
                })
            },
            update(id) {
                this.submitting = true
                let invoiceData = {
                    id: id,
                    invoice: this.invoice,
                    items: this.items
                }

                this.updateInvoice(invoiceData)
                    .then((response) => {
                        this.showNotif(response, 'positive')
                        setTimeout(() => {
                            this.submitting = false
                        }, 500)
                    })
                    .catch((e) => {
                        this.showNotif(e, 'negative')
                        this.submitting = false
                    })
            },
            closeDialog() {
                this.closeEditDialog(false)
            },
            today() {
                return this.$moment().format('Y-MM-DD')
            },
            kChanged() {
                this.showNotif('Klavzula spremenjena', 'positive')
            },
            vChanged() {
                this.showNotif('Davek spremenjen', 'positive')
            },
            timestampChanged() {
                this.$refs.qDateTimestamp.hide()
                this.showNotif('Ustvarjen dne spremenjen', 'positive')
            },
            expirationChanged() {
                this.$refs.qDateExpiration.hide()
                this.showNotif('Datum zapadlosti spremenjen', 'positive')
            },
            workDateChanged() {
                this.$refs.qDateWorkDate.hide()
                this.showNotif('Delo opravljeno spremenjeno', 'positive')
            },
            strankaChanged() {
                this.showNotif('Stranka je spremenjena', 'positive')
            }
        }
    }
</script>

<style scoped>

</style>
