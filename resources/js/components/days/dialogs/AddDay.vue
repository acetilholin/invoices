<template>
    <div class="add-day">
        <q-dialog
            v-model="medium"
            persistent
        >
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">{{ $t("general.newInsert") }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-form
                        @submit="onSubmit"
                        @reset="onReset"
                        class="q-gutter-md"
                    >

                        <div class="row">
                            <q-input
                                ref="date"
                                v-model="day.date"
                                label="Datum"
                                class="col-5 q-ml-sm"
                                @click="$refs.QDay.show()"
                                :rules="[val => !!val || `${$t('hours.chooseDate')}`]"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy ref="QDay">
                                            <q-date
                                                mask="YYYY-MM-DD"
                                                v-model="day.date"
                                                :options="date => checkWeekend(date)"
                                            />
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                            <q-select v-model="day.day_type"
                                      :options="types"
                                      bottom-slots
                                      label="Tip dneva"
                                      class="col-6 q-ml-sm"
                                      :rules="[val => !!val || `${$t('hours.dayType')}`]"
                            >
                                <template v-slot:hint>
                                </template>
                            </q-select>
                        </div>

                        <div>
                            <q-btn label="Dodaj"
                                   type="submit"
                                   color="green"
                            />
                            <q-btn label="Počisti" type="reset" color="primary" flat class="q-ml-sm" />
                        </div>
                    </q-form>
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="ZAPRI" @click="closeDialog" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    name: "AddDay",
    data() {
        return {
            day: {
                date: null,
                day_type: null
            },
            types: ['delovni dan','praznik','bolniška','dopust']
        }
    },
    computed: {
        ...mapGetters({
            medium: 'general/getAddDay'
        })
    },
    methods: {
        ...mapActions({
           close: 'general/addDayDialog'
        }),
        closeDialog() {
            this.close(false)
        },
        onReset() {
            this.day.date = null
            this.day.day_type = null
        },
        onSubmit() {
            let newDay = {
                date: this.day.date,
                day_type: this.day.day_type
            }
            this.$emit('newDay', newDay)
        },
        checkWeekend(date) {
            var dt = new Date(date)
            return dt.getDay() !== 0 && dt.getDay() !== 6
        }
    }
}
</script>

<style scoped>

</style>
