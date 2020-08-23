<template>
    <div class="q-pa-md">
        <create-klavzula class="q-mt-sm q-mb-md"></create-klavzula>
        <q-table
            title="Klavzule"
            :data="klavzule"
            :columns="columns"
            row-key="name"
        >
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        {{ tableIndex(props.row) }}
                    </q-td>
                    <q-td key="short_name" :props="props">
                        {{ props.row.short_name }}
                    </q-td>
                    <q-td key="description" :props="props">
                        {{ props.row.description | limitDescription }}
                    </q-td>
                    <q-td key="edit" :props="props">
                        <q-btn-dropdown color="primary" outline icon="settings">
                            <q-list>
                                <q-item clickable v-close-popup @click="editKlavzula(props.row.id)">
                                    <q-item-section class="text-center">
                                        <q-item-label><q-icon name="create" class="pointer text-black action-icon"></q-icon> {{ $t("general.edit") }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item clickable v-close-popup @click="confirm(props.row.id)">
                                    <q-item-section class="text-center text-red">
                                        <q-item-label><q-icon name="delete_outline" class="pointer action-icon"></q-icon> {{ $t("general.delete") }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
        <edit-klavzula></edit-klavzula>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import CreateKlavzula from "../dialogs/CreateKlavzula";
import EditKlavzula from "../dialogs/EditKlavzula";

export default {
    name: "KlavzuleList",
    components: {
        CreateKlavzula,
        EditKlavzula
    },
    computed: {
      ...mapGetters({
          klavzule: 'klavzule/getKlavzule'
      })
    },
    created() {
      this.$store.dispatch('klavzule/all')
    },
    data() {
        return {
            columns: [
                {
                    name: 'index',
                    label: '#',
                    align: 'center'
                },
                {name: 'short_name', align: 'center', label: 'Kratica', field: 'short_name'},
                {name: 'description', label: 'Opis', field: 'description', align: 'center'},
                {name: 'edit', label: 'Uredi', align: 'center'}
            ]
        }
    },
    filters: {
        limitDescription(val) {
            let limit = 60
            if (val.length > limit ) {
                return val.substr(0, limit) + '...';
            } else {
                return val
            }
        }
    },
    methods: {
        ...mapActions({
           remove: 'klavzule/remove'
        }),
        tableIndex(row) {
            return this.klavzule.indexOf(row) + 1
        },
        editKlavzula(id) {
            this.$store.dispatch('general/editKlavzulaDialog', true)
            this.$store.dispatch('klavzule/show', id)
        },
        showNotif(message, type) {
            this.$q.notify({
                message: message,
                position: 'top',
                timeout: 1500,
                type: type
            })
        },
        confirm(id) {
            this.$q.dialog({
                title: `${this.$t("general.deleteTitle")}`,
                message: `<span class='text-red'> ${this.$t("general.deleteMessage")}</span>`,
                html: true,
                cancel: true,
                persistent: true
            }).onOk(() => {
                this.remove(id)
                    .then((response) => {
                        this.showNotif(response, 'warning')
                    })
                    .catch((e) => {
                        this.showNotif(e, 'negative')
                    })
            })
        },
    }
}
</script>

<style scoped>

</style>
