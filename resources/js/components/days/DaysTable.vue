<template>
    <div class="q-pa-md" v-if="tableData">
        <q-table
            title="Dnevi"
            :data="tableData"
            :columns="columns"
            row-key="name"
            binary-state-sort
            :pagination.sync="pagination"
        >
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        {{ tableIndex(props.row) }}
                    </q-td>
                    <q-td key="date" :props="props">
                        {{ props.row.date | moment('dddd DD-MM-Y') }}
                        <q-popup-edit v-model="props.row.date"
                                      buttons
                                      label-set="Spremeni"
                                      @save="dateChanged"
                        >
                            <q-input
                                ref="date"
                                v-model="props.row.date"
                                label="Datum"
                                class="col-5 q-ml-sm"
                                @click="$refs.QChangeDay.show()"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy ref="QChangeDay">
                                            <q-date
                                                mask="YYYY-MM-DD"
                                                v-model="props.row.date"
                                                :options="date => checkWeekend(date)"
                                            />
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </q-popup-edit>
                    </q-td>
                    <q-td key="day_type" :props="props">
                        {{ props.row.day_type }}
                        <q-popup-edit v-model="props.row.day_type"
                                      buttons
                                      label-set="Spremeni"
                                      @save="changeDaysData(`${$t('hours.dayTypeChanged')}`)"
                        >
                            <q-select v-model="props.row.day_type"
                                      :options="DayTypes"
                                      label="Tip dneva"
                                      dense
                                      autofocus
                            />
                        </q-popup-edit>
                        <q-tooltip v-if="tooltipDisplay(props.row.day_type)" @before-show="tooltipInfo(props.row.day_type)">
                           {{ info }}
                        </q-tooltip>
                    </q-td>
                    <q-td key="edit" :props="props">
                        <q-icon name="delete_outline" @click="confirm(props.row)" class="pointer text-red action-icon"></q-icon>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </div>
</template>

<script>

import { DayTypesShort } from '../../global/variables'

export default {
    name: "DaysTable",
    data() {
        return {
            pagination: {
                rowsPerPage: 20
            },
            tableData: null,
            info: null,
            DayTypes: DayTypesShort,
            columns: [
                {
                    name: 'index',
                    label: '#',
                    align: 'center',
                    sortable: true
                },
                {
                    name: 'date',
                    required: true,
                    label: 'Datum',
                    align: 'center',
                    field: row => row.date,
                },
                {
                    name: 'day_type',
                    required: true,
                    label: 'Tip dneva',
                    align: 'center',
                    field: row => row.day_type,
                },
                {name: 'edit', label: 'Uredi', align: 'center'}
            ]
        }
    },
    props: ['days'],
    methods: {
        tableIndex(row) {
            return this.tableData.indexOf(row) + 1
        },
        changeDayType(type) {
           return type.value
        },
        tooltipDisplay(dayType) {
            return dayType !== 'praznk'
        },
        tooltipInfo(dayType) {
            switch (true) {
                case dayType === 'DD':
                    this.info = this.$t("hours.work_day")
                    break
                case dayType === 'LD':
                    this.info = this.$t("hours.holiday")
                    break
                case dayType === 'NU1':
                    this.info = this.$t("hours.NU1")
                    break
                case dayType === 'NU2':
                    this.info = this.$t("hours.NU2")
                    break
                case dayType === 'NU3':
                    this.info = this.$t("hours.NU3")
                    break
            }
        },
        showNotif(message, type) {
            this.$q.notify({
                message: message,
                timeout: 1500,
                position: 'top',
                type: type
            })
        },
        checkWeekend(date) {
            var dt = new Date(date)
            return dt.getDay() !== 0 && dt.getDay() !== 6
        },
        changeDaysData(message) {
            this.showNotif(message, 'positive')
        },
        dateChanged() {
            this.showNotif(`${this.$t('hours.dateChanged')}`, 'positive')
        },
        confirm(row) {
            this.$q.dialog({
                title: `${this.$t("general.deleteTitle")}`,
                message: `<span class='text-red'> ${this.$t("general.deleteMessage")}</span>`,
                html: true,
                cancel: true,
                persistent: true
            }).onOk(() => {
                let id = row.id
                this.$emit('removeDay', row)

                if (id !== null) {
                    this.$store.dispatch('months/removeDay', id)
                }

                this.showNotif(`${this.$t('hours.dayRemoved')}`, 'warning')
            })
        },
    },
    mounted() {
        this.tableData = this.days
    },
    watch: {
        days: {
            handler() {
                this.tableData = this.days
            }
        }
    }
}
</script>

<style scoped>

</style>
