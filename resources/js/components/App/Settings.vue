<template>
    <div>
        <q-btn-dropdown
            class="glossy"
            color="white"
            icon="settings"
            outline
        >
            <div class="row no-wrap q-pa-md">
                <div class="column">
                    <div class="text-h6 q-mb-md">{{ $t("general.settings") }}</div>
                    <q-toggle :value="company" label="Prikaži podatke o podjetju" @input="changeCompany" />
                    <q-toggle :value="klavzule" label="Prikaži klavzule" @input="changeKlavzule"/>
                </div>
            </div>
        </q-btn-dropdown>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    name: "Settings",
    computed: {
        ...mapGetters({
            company: 'general/getCompany',
            klavzule: 'general/getKlavzule'
        })
    },
    methods: {
        ...mapActions({
            changeSetting: 'general/changeSetting'
        }),
        showNotif(message, type) {
            this.$q.notify({
                message: message,
                position: 'top',
                timeout: 1500,
                type: type
            })
        },
        changeCompany() {
            let settings = {
                status: !this.company,
                setting: 'company'
            }
            this.changeSetting(settings)
                .then((response) => {
                    this.showNotif(response, 'positive')
                })
                .catch((e) => {
                    this.showNotif(e, 'negative')
                })
        },
        changeKlavzule() {
            let settings = {
                status: !this.klavzule,
                setting: 'klavzule'
            }
            this.changeSetting(settings)
                .then((response) => {
                    this.showNotif(response, 'positive')
                })
                .catch((e) => {
                    this.showNotif(e, 'negative')
                })
        }
    }
}
</script>

<style scoped>

</style>
