<template>
    <div class="q-pa-md">
        <div class="row justify-center q-mb-md">
            <div class="col-3">
                <span v-for="cmp in company">
                    <q-img height="200px" :src="image(cmp.logo)" native-context-menu>
                           <q-icon class="absolute all-pointer-events" size="22px" name="info" color="grey" style="top: 8px; left: 8px">
                            <q-tooltip>
                              Logotip podjetja
                            </q-tooltip>
                          </q-icon>
                    </q-img>
                </span>
            </div>
        </div>
        <q-separator />
        <div class="q-pt-md">
            <q-table
                title="Podjetje"
                :data="company"
                :columns="columns"
                row-key="naziv"
                binary-state-sort
            >
                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td key="naziv" :props="props">
                            {{ props.row.naziv | limitText }}
                            <q-popup-edit v-model="props.row.naziv" title="Spremeni naziv" label-set="Spremeni" buttons>
                                <q-input v-model="props.row.naziv" dense autofocus counter />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="naslov" :props="props">
                            {{ props.row.naslov | limitText }}
                            <q-popup-edit v-model="props.row.naslov" title="Spremeni naslov" label-set="Spremeni" buttons>
                                <q-input type="text" v-model="props.row.naslov" dense autofocus />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="posta" :props="props">
                            <div class="text-pre-wrap">{{ props.row.posta | limitText }}</div>
                            <q-popup-edit v-model="props.row.posta">
                                <q-input type="text" v-model="props.row.posta" dense autofocus />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="telefon1" :props="props">
                            <div class="text-pre-wrap">{{ props.row.telefon1 }}</div>
                            <q-popup-edit v-model="props.row.telefon1" title="Spremeni telefon" label-set="Spremeni" buttons>
                                <q-input type="text" v-model="props.row.telefon1" dense autofocus />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="telefon2" :props="props">
                            <div class="text-pre-wrap">{{ props.row.telefon2 }}</div>
                            <q-popup-edit v-model="props.row.telefon2" title="Spremeni telefon" label-set="Spremeni" buttons>
                                <q-input type="text" v-model="props.row.telefon2" dense autofocus />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="email1" :props="props">
                            <div class="text-pre-wrap">{{ props.row.email1 }}</div>
                            <q-popup-edit v-model="props.row.email1" title="Spremeni email" label-set="Spremeni" buttons>
                                <q-input type="text" v-model="props.row.email1" dense autofocus />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="email2" :props="props">
                            <div class="text-pre-wrap">{{ props.row.email2 }}</div>
                            <q-popup-edit v-model="props.row.email2" title="Spremeni email" label-set="Spremeni" buttons>
                                <q-input type="text" v-model="props.row.email2" dense autofocus />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="davcna_stevilka" :props="props">
                            <div class="text-pre-wrap">{{ props.row.davcna_stevilka }}</div>
                            <q-popup-edit v-model="props.row.davcna_stevilka" title="Spremeni davčno" label-set="Spremeni" buttons>
                                <q-input type="text" v-model="props.row.davcna_stevilka" dense autofocus />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="zavezanec_za_ddv" :props="props">
                            <div class="text-pre-wrap">{{ props.row.zavezanec_za_ddv }}</div>
                            <q-popup-edit v-model="props.row.zavezanec_za_ddv" title="Spremeni DDV" label-set="Spremeni" buttons>
                                <q-input type="text" v-model="props.row.zavezanec_za_ddv" dense autofocus />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="trr1" :props="props">
                            <div class="text-pre-wrap">{{ props.row.trr1 }}</div>
                            <q-popup-edit v-model="props.row.trr1" title="Spremeni TRR" label-set="Spremeni" buttons>
                                <q-input type="text" v-model="props.row.trr1" dense autofocus />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="trr2" :props="props">
                            <div class="text-pre-wrap">{{ props.row.trr2 }}</div>
                            <q-popup-edit v-model="props.row.trr2" title="Spremeni TRR" label-set="Spremeni" buttons>
                                <q-input type="text" v-model="props.row.trr2" dense autofocus />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="banka1" :props="props">
                            <div class="text-pre-wrap">{{ props.row.banka1 }}</div>
                            <q-popup-edit v-model="props.row.banka1" title="Spremeni banko" label-set="Spremeni" buttons>
                                <q-input type="text" v-model="props.row.banka1" dense autofocus />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="banka2" :props="props">
                            <div class="text-pre-wrap">{{ props.row.banka2 }}</div>
                            <q-popup-edit v-model="props.row.banka2" title="Spremeni banko" label-set="Spremeni" buttons>
                                <q-input type="text" v-model="props.row.banka2" dense autofocus />
                            </q-popup-edit>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </div>
        <div class="text-center q-pt-lg">
            <q-btn color="secondary"
                   outline
                   :loading="submitting"
                   label="Posodobi"
                   @click="update"
            >
                <template v-slot:loading>
                    <q-spinner-tail
                        color="secondary"
                    />
                </template>
            </q-btn>
        </div>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import {picturesPath} from "../global/variables";

export default {
    name: "Company",
    data(){
        return {
            submitting: false,
            columns: [
                {
                    name: 'naziv',
                    required: true,
                    label: 'Naziv',
                    align: 'center',
                    field: 'naziv'
                },
                { name: 'naslov', align: 'center', label: 'Naslov', field: 'naslov' },
                { name: 'posta', align: 'center', label: 'Pošta', field: 'posta' },
                { name: 'telefon1', align: 'center', label: 'Tel 1', field: 'telefon1' },
                { name: 'telefon2', align: 'center', label: 'Tel 2', field: 'telefon2' },
                { name: 'email1', align: 'center', label: 'Email 1', field: 'email1' },
                { name: 'email2', align: 'center', label: 'Email 2', field: 'email2' },
                { name: 'davcna_stevilka', align: 'center', label: 'Davčna', field: 'davcna_stevilka' },
                { name: 'zavezanec_za_ddv', align: 'center', label: 'DDV', field: 'zavezanec_za_ddv' },
                { name: 'trr1', align: 'center', label: 'TRR 1', field: 'trr1' },
                { name: 'trr2', align: 'center', label: 'TRR 2', field: 'trr2' },
                { name: 'banka1', align: 'center', label: 'IBAN 1', field: 'banka1' },
                { name: 'banka2', align: 'center', label: 'IBAN 2', field: 'banka2' }
            ],
        }
    },
    created() {
        this.$store.dispatch('company/all')
    },
    computed: {
        ...mapGetters({
            company: 'company/getCompany'
        })
    },
    filters: {
        limitText(val) {
            let limit = 15
            if (val.length > limit ) {
                return val.substr(0, limit) + '...';
            } else {
                return val
            }
        }
    },
    methods: {
        ...mapActions({
            updateCompany: 'company/update'
        }),
        image(img) {
            return picturesPath + img
        },
        showNotif(message, type) {
            this.$q.notify({
                message: message,
                position: 'top',
                timeout: 1500,
                type: type
            })
        },
        update() {
            this.submitting = true
            this.updateCompany(this.company)
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
        }
    }
}
</script>

<style scoped>

</style>
