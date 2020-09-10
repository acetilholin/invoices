<template>
    <div class="edit-month">
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
                        <q-tooltip>Zapri</q-tooltip>
                    </q-btn>
                </q-bar>

                <q-card-section>
                    <div class="text-h6">{{ $t("hours.newMonthlyReport") }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <div class="text-body1">{{ $t("hours.employee") }}: <b>{{ person }}</b></div>
                    <div class="text-body1" v-if="monthData.month">{{ $t("hours.month") }}: <b>{{ reportMonth }}</b></div>
                </q-card-section>
                <q-card-section class="q-pt-none">

                    <div class="row q-pa-md justify-center">
                        <q-select v-model="person"
                                  :options="employees"
                                  label="Zaposleni"
                                  v-if="monthData.employee"
                                  class="col-2 q-ml-sm"
                                  option-label="person"
                                  option-value="person"
                        />
                        <q-select v-model="reportMonth"
                                  :options="months"
                                  label="Mesec"
                                  v-if="monthData.month"
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
                               icon="autorenew"
                               label="Posodobi"
                               @click="update(monthData.month.id)"
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
                    <add-day @newDay="addNewDay"></add-day>
                </q-card-section>
                <q-card-section class="q-pt-none">
                    <days-table :days="monthData.days" @removeDay="removeFromDays"></days-table>
                </q-card-section>
            </q-card>
        </q-dialog>
        <add-day ></add-day>
    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import DaysTable from "../../days/DaysTable";
import { Months } from '../../../global/variables'
import AddDay from "../../days/dialogs/AddDay";

const d = new Date();
const year = d.getFullYear();

export default {
    name: "EditMonth",
    data() {
        return {
            maximizedToggle: true,
            submitting: false,
            months: Months,
            employee_id: null
        }
    },
    components: {AddDay, DaysTable},
    computed: {
        ...mapGetters({
            dialog: 'general/getEditMonth',
            monthData: 'months/getMonthData',
            employees: 'employees/getEmployees'
        }),
        person: {
            get: function () {
               return this.monthData.employee
            },
            set: function (newValue) {
                this.monthData.eId = newValue.id
                this.monthData.employee = newValue.person
            }
        },
        reportMonth: {
            get: function () {
                return this.$moment(this.monthData.month.date).format('MMMM')
            },
            set: function (newValue) {
                this.monthData.month.date = year + '-' + newValue.value + '-01'
            }
        }
    },
    created() {
      this.$store.dispatch('employees/all')
    },
    methods: {
        ...mapActions({
            closeEditDialog: 'general/editMonthDialog',
            removeDay: 'months/removeDayFromMonth',
            addDayDialog: 'general/addDayDialog',
            addDayToMonth: 'months/addDay',
            updateMonthReport: 'months/update'
        }),
        closeDialog() {
            this.closeEditDialog(false)
        },
        removeFromDays(item) {
            this.removeDay(item)
        },
        showNotif(message, type) {
            this.$q.notify({
                message: message,
                position: 'top',
                timeout: 1500,
                type: type
            })
        },
        addDay() {
            this.addDayDialog(true)
        },
        addNewDay(day) {
            day.id = null
            day.month_id = this.monthData.month.id
            day.employee_id = this.monthData.month.employee_id
            this.addDayToMonth(day)
            this.showNotif(`${this.$t('hours.dayAdded')}`, 'positive')
        },
        update(id) {
            this.submitting = true
            let monthData = {
                id: id,
                employee_id: this.monthData.eId,
                days: this.monthData.days,
                month: this.monthData.month
            }

            this.updateMonthReport(monthData)
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
