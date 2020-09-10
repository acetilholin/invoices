<template>
    <div>
        <q-fab color="primary" glossy icon="keyboard_arrow_right" direction="right">
            <q-fab-action external-label
                          label-position="top"
                          color="green"
                          text-color="white"
                          @click="trigger"
                          icon="person"
                          label="Nov uporabnik"
                          v-show="routeUsers()"
            />
            <q-fab-action external-label
                          label-position="top"
                          color="deep-orange"
                          text-color="white"
                          @click="trigger"
                          icon="business_center"
                          label="Nova stranka"
                          v-show="routeCustomers()"
            />
            <q-fab-action external-label
                          label-position="top"
                          color="indigo"
                          text-color="white"
                          @click="trigger"
                          icon="article"
                          label="Nov predračun"
                          v-show="routeInvoices()"
            />
            <q-fab-action external-label
                          label-position="top"
                          color="teal-9"
                          text-color="white"
                          @click="trigger"
                          icon="list"
                          label="Nova klavzula"
                          v-show="routeKlavzule()"
            />
            <q-fab-action external-label
                          label-position="top"
                          color="red-9"
                          text-color="white"
                          @click="trigger"
                          icon="query_builder"
                          label="Nov mesečni vnos"
                          v-show="months()"
            />
        </q-fab>
    </div>
</template>

<script>
    export default {
        name: "Create",
        methods: {
            routeUsers() {
                return this.$router.currentRoute.fullPath === '/users'
            },
            routeCustomers() {
                return this.$router.currentRoute.fullPath === '/customers'
            },
            routeKlavzule() {
                return this.$router.currentRoute.fullPath === '/klavzule'
            },
            months() {
                return this.$router.currentRoute.fullPath === '/months'
            },
            routeInvoices() {
                return this.$router.currentRoute.fullPath === '/'
            },
            trigger() {
                this.$emit("triggerModal", true);
            }
        }
    }
</script>

<style scoped>

</style>
