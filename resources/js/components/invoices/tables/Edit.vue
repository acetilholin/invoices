<template>
    <div class="q-pa-md">
        <span class="text-h6 text-grey-8">{{ invoice.sifra_predracuna }}</span>
        <q-table
            :data="items"
            :columns="columns"
            row-key="index"
            binary-state-sort
            :filter="filter"
            :pagination.sync="pagination"
        >
             <template v-slot:top-left>
               <span class="q-ml-xl text-subtitle1">
                   Vseh artiklov: <q-badge outline color="green">{{ invoice.totalQty }}</q-badge>
               </span>
               <span class="q-ml-xs text-subtitle1">
                   Skupna cena: <q-badge outline color="primary">{{ totalPrice() | price }} </q-badge>
               </span>
           </template>
            <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Išči">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        {{ tableIndex(props.row) }}
                    </q-td>
                    <q-td key="description" :props="props">
                        {{ props.row.description }}
                        <q-popup-edit v-model="props.row.description" title="Spremeni opis" buttons>
                            <q-input type="text" v-model="props.row.description" dense autofocus />
                        </q-popup-edit>
                    </q-td>
                    <q-td key="qty" :props="props">
                        {{ props.row.qty }}
                        <q-popup-edit v-model="props.row.qty" title="Spremeni količino" buttons>
                            <q-input type="number" v-model="props.row.qty" dense autofocus />
                        </q-popup-edit>
                    </q-td>
                    <q-td key="unit" :props="props">
                        {{ props.row.unit }}
                    </q-td>
                    <q-td key="price" :props="props">
                        {{ props.row.price | price }}
                        <q-popup-edit v-model="props.row.price" title="Spremeni ceno" buttons>
                            <q-input type="number" v-model="props.row.price" dense autofocus />
                        </q-popup-edit>
                    </q-td>
                    <q-td key="priceItem" :props="props">
                        {{ props.row.priceItem | price }}
                        <q-popup-edit v-model="props.row.priceItem" title="Spremeni ceno/kos" buttons>
                            <q-input type="number" v-model="props.row.priceItem" dense autofocus />
                        </q-popup-edit>
                    </q-td>
                    <q-td key="discount" :props="props">
                        {{ props.row.discount | discount }}
                        <q-popup-edit v-model="props.row.discount" title="Spremeni popust" buttons>
                            <q-input type="number" v-model="props.row.discount" dense autofocus />
                        </q-popup-edit>
                    </q-td>
                    <q-td key="vat" :props="props">
                        {{ invoice.vat | discount }}
                    </q-td>
                    <q-td key="edit" :props="props">
                        <q-icon name="delete_outline" @click="confirm(props.row.id)" class="pointer text-red action-icon"></q-icon>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script>

    export default {
        name: "Edit",
        props: ['invoice', 'items'],
        data() {
            return {
                filter: '',
                pagination: {
                    rowsPerPage: 20
                },
                columns: [
                    {
                        name: 'index',
                        label: '#',
                        align: 'center',
                        sortable: true
                    },
                    {
                        name: 'description',
                        required: true,
                        label: 'Opis',
                        align: 'center',
                        field: row => row.description,
                    },
                    {
                        name: 'qty',
                        required: true,
                        label: 'Količina',
                        align: 'center',
                        field: row => row.qty,
                    },
                    {
                        name: 'unit',
                        required: true,
                        label: 'EM',
                        align: 'center',
                        field: row => row.unit,
                    },
                    {
                        name: 'price',
                        required: true,
                        label: 'Cena',
                        align: 'center',
                        sortable: true,
                        field: row => row.price,
                    },
                    {
                        name: 'priceItem',
                        required: true,
                        label: 'Cena/kos',
                        align: 'center',
                        sortable: true,
                        field: row => row.priceItem,
                    },
                    {
                        name: 'discount',
                        required: true,
                        label: 'Popust',
                        align: 'center',
                        sortable: true,
                        field: row => row.discount,
                    },
                    {
                        name: 'vat',
                        required: true,
                        label: 'DDV',
                        align: 'center'
                    },
                    {name: 'edit', label: 'Uredi', align: 'center'}
                ]
            }
        },
        filters: {
            price(val) {
                return Math.round(val * 100) / 100 + ' €'
            },
            discount(val) {
                return val + ' %'
            }
        },
        methods: {
            tableIndex(row) {
                return this.items.indexOf(row) + 1
            },
            totalPrice() {
                return this.invoice.total
            }
        }
    }
</script>

<style scoped>

</style>
