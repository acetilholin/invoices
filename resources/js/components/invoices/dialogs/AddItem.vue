<template>
    <div>
        <q-dialog
            v-model="addItemDialog"
            persistent transition-show="scale" transition-hide="scale"
        >
            <q-card style="width: 750px; max-width: 85vw;">
                <q-card-section>
                    <div class="text-h6">Dodaj artikel</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-form
                        @submit="onSubmit"
                        @reset="onReset"
                        class="q-gutter-md"
                    >
                       <div class="row">
                           <q-input
                               v-model="item.description"
                               autofocus
                               label="Opis"
                               class="col-12"
                               :rules="[ val => val && val.length > 0 || `${this.$t('general.enterDescription')}`]"
                           />
                       </div>
                       <div class="row">
                           <q-select v-model="item.unit"
                                     :options="units"
                                     class="col-3 input-margin"
                                     label="Enota mere"
                                     :rules="[ val => !!val || `${this.$t('general.enterEM')}`]"
                           />
                           <q-input
                               v-model="item.price"
                               label="Cena na 2 decimalki"
                               mask="#.##"
                               fill-mask="0"
                               reverse-fill-mask
                               hint="Format: #.##"
                               input-class="text-right"
                               class="col-3 input-margin"
                               suffix="€"
                               :rules="[ val => !!val || `${this.$t('general.enterPrice')}`]"
                           />
                           <q-input
                               v-model.number="item.qty"
                               label="Količina"
                               type="number"
                               class="col-2 input-margin"
                               :rules="[ val => !!val && val > 0 || `${this.$t('general.biggerThan0')}`]"
                           />
                           <q-input
                               v-model.number="item.discount"
                               label="Popust"
                               type="number"
                               suffix="%"
                               class="col-2 input-margin"
                               :rules="[ val => val >= 0 && val < 100 || `${this.$t('general.lessThan100prc')}`]"
                           />

                       </div>

                        <div>
                            <q-btn label="Dodaj" type="submit" color="green"/>
                            <q-btn label="Počisti" type="reset" color="primary" flat class="q-ml-sm" />
                        </div>
                    </q-form>
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="Zapri" @click="closeDialog" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    name: "AddItem",
    data() {
        return {
            item: {
                description: "",
                discount: 0,
                qty: 0,
                price: 0,
                priceItem: null,
                unit: ""
            },
            units: ['kos','m','ura','kg','m2']
        }
    },
    computed: {
        ...mapGetters({
            addItemDialog: 'general/getAddItemDialog'
        })
    },
    methods: {
        ...mapActions({
            closeAddItemDialog: 'general/addItemDialog',
            addItem: 'invoices/addItem'
        }),
        closeDialog() {
            this.closeAddItemDialog(false)
        },
        onSubmit() {
            let discount = parseInt(this.item.discount)
            let price = parseFloat(this.item.price)
            let qty = parseInt(this.item.qty)
            let total_price = 0

            total_price = discount > 0 ? price * qty - (price * qty * discount / 100) : price * qty

            let newItem = {
                invoice_id: null,
                qty: qty,
                unit: this.item.unit,
                item_price: price,
                discount: discount,
                total_price: total_price,
                description: this.item.description
            }
            this.$emit('newItem', newItem);
        },
        onReset() {
            this.item = []
        }
    }
}
</script>

<style scoped>

</style>
