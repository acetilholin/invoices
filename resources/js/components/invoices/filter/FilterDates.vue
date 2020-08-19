<template>
    <div class="row q-mt-sm q-mb-sm justify-center">
        <q-input
            ref="date"
            v-model="fromDate"
            label="Od"
            class="col-2 q-ml-sm"
            @click="$refs.fromDate.show()"
        >
            <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="fromDate">
                        <q-date
                            mask="YYYY-MM-DD"
                            v-model="fromDate"
                            @input="dateChanged"
                        />
                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
        <q-input
            ref="date"
            v-model="toDate"
            label="Do"
            class="col-2 q-ml-sm q-pl-sm"
            @click="$refs.toDate.show()"
        >
            <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="toDate">
                        <q-date
                            mask="YYYY-MM-DD"
                            v-model="toDate"
                            @input="dateChanged"
                        />
                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
        <div class="q-pa-md q-gutter-sm">
            <q-btn color="primary" outline label="Reset" @click="getAll"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "FilterDates",
    data() {
        return {
            fromDate: null,
            toDate: null
        }
    },
    methods: {
        showNotif(message, type) {
            this.$q.notify({
                message: message,
                timeout: 1500,
                position: 'top',
                type: type
            })
        },
        dateChanged() {
            if (this.fromDate && this.toDate) {
                if (this.fromDate > this.toDate) {
                    this.showNotif(`${this.$t('general.dateFromTo')}`,'warning');
                } else {
                    this.filterDataByDates()
                }
            }
        },
        getAll() {
            this.fromDate = null
            this.toDate = null
            this.$store.dispatch('invoices/allInvoices')
        },
        filterDataByDates() {
           let interval = {
               from: this.fromDate,
               to: this.toDate
           }
           this.$emit('interval', interval)
        }
    }
}
</script>

<style scoped>

</style>
