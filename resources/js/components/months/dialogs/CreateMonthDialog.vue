<template>
    <div class="c-m-d">
        <q-dialog
            v-model="dialog"
            persistent
            ref="createMonth"
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
                    <div class="text-h6">{{ $t("hours.newMonthlyReport") }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="text-body1">{{ $t("hours.employee") }}: <b>{{ report.employee }}</b></div>
                    <div class="text-body1">{{ $t("hours.month") }}: <b>{{ report.month }}</b></div>
                    <q-btn color="red" class="q-mt-lg" icon="delete" @click="deleteAll()" label="Izbriši">
                        <q-tooltip>
                            {{ $t("hours.listTotal") }}
                        </q-tooltip>
                    </q-btn>
                </q-card-section>
                <q-card-section class="q-pt-none">

                    <div class="row q-pa-md justify-center">
                        <q-select v-model="employee"
                                  :options="employees"
                                  label="Zaposleni"
                                  class="col-2 q-ml-sm"
                                  option-label="person"
                                  option-value="person"
                        />
                        <q-select v-model="month"
                                  :options="months"
                                  label="Mesec"
                                  option-label="label"
                                  option-value="value"
                                  class="col-2 q-ml-sm"
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
                               @click="addDay"
                        >
                            <q-tooltip anchor="top middle"
                                       self="bottom middle"
                                       :offset="[10, 10]"
                            >
                                {{ $t("employees.addInsert") }}
                            </q-tooltip>
                        </q-btn>
                    </div>
                </q-card-section>
                <q-card-section>
                    <div class="text-center">
                        <q-btn color="secondary"
                               outline
                               :loading="submitting"
                               icon="save"
                               label="Shrani"
                               @click="save"
                        >
                            <template v-slot:loading>
                                <q-spinner-tail
                                    color="secondary"
                                />
                            </template>
                        </q-btn>
                    </div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <days-table :days="days" @removeDay="removeFromDays"></days-table>
                </q-card-section>
            </q-card>
            <add-day @newDay="addNewDay"></add-day>
        </q-dialog>
    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import { Months } from '../../../global/variables'
import AddDay from "../../days/dialogs/AddDay";
import DaysTable from "../../days/DaysTable";

export default {
    name: "CreateMonthDialog",
    components: {DaysTable, AddDay},
    data() {
        return {
            maximizedToggle: true,
            submitting: false,
            report: {
                month: '',
                employee: '',
                employee_id: '',
                month_no: ''
            },
            months: Months,
            days: [],
            saved: false
        }
    },
    created() {
      this.$store.dispatch('employees/all')
    },
    computed: {
        ...mapGetters({
            dialog: 'general/getCreateMonth',
            employees: 'employees/getEmployees'
        }),
        employee: {
            get: function () {
                return this.report.employee
            },
            set: function (newVal) {
                this.report.employee = newVal.person
                this.report.employee_id = newVal.id
            }
        },
        month: {
            get: function () {
                return this.report.month
            },
            set: function (newVal) {
                this.report.month = newVal.label
                this.report.month_no = newVal.value
            }
        }
    },
    methods: {
        ...mapActions({
            closeCreateDialog: 'general/createMonthDialog',
            addDayDialog: 'general/addDayDialog',
            createMonthReport: 'months/create'
        }),
        showNotif(message, type) {
            this.$q.notify({
                message: message,
                timeout: 1500,
                position: 'top',
                type: type
            })
        },
        removeFromDays(val) {
            this.days = this.days.filter(item => {
                return item !== val
            })
            localStorage.setItem('days', JSON.stringify(this.days));
        },
        mandatoryFields() {
            switch(true) {
                case !this.report.employee:
                    this.showNotif(`${this.$t('hours.chooseEmployee')}`,'warning');
                    return true
                case !this.report.month:
                    this.showNotif(`${this.$t('hours.chooseMonth')}`,'warning');
                    return true
                default:
                    return false
            }
        },
        save() {
            if (!this.mandatoryFields()) {
                let monthHours = {
                    report: this.report,
                    days: this.days,
                }
                this.saved = true
                this.submitting = true

                localStorage.removeItem('days')

                this.createMonthReport(monthHours)
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
        },
        closeDialog() {
            this.closeCreateDialog(false)
            if (this.saved) {
                this.report.month = ''
                this.report.employee = ''
                this.days.length = 0
            }
        },
        deleteAll() {
            this.$q.dialog({
                title: `${this.$t("general.deleteTitle")}`,
                message: `<span class='text-red'> ${this.$t("general.deleteALL")}</span>`,
                html: true,
                cancel: true,
                persistent: true
            }).onOk(() => {
                localStorage.removeItem('days')
                this.report.month = ''
                this.report.employee = ''
                this.days.length = 0
                this.closeCreateDialog(false)
            })
        },
        addDay() {
            this.addDayDialog(true)
        },
        addNewDay(day) {
            day.id = null
            this.days.push(day)
            localStorage.setItem('days', JSON.stringify(this.days));
            this.showNotif(`${this.$t('hours.dayAdded')}`, 'positive')
        }
    },
    mounted() {
        if (localStorage.getItem('days')) {
            this.days = JSON.parse(localStorage.getItem('days'))
        }
    }
}
</script>

<style scoped>

</style>
