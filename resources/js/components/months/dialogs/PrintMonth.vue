<template>
    <div class="print-month">
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

                <q-card-section class="q-pt-none font-size-body" id="content">
                    <div class="container c-mt">
                        <div class="row" v-for="cmp in company">
                            <div class="column left">
                                {{ cmp.naziv | titleLong }}<br>
                                {{ cmp.naziv | titleShort }}<br>
                                {{ cmp.naslov }}<br>
                                {{ cmp.posta }}
                            </div>
                            <div class="column middle">

                                <img :src="image(cmp.logo)" style="height: 95px; width: 170px;" alt="">

                            </div>
                            <div class="column right text-right">
                                {{ cmp.telefon1 }}<br>
                                {{ cmp.telefon2 }}<br>
                                {{ cmp.email1 }}<br>
                                {{ cmp.email2 }}
                            </div>
                        </div>
                        <hr style="background: black">
                        <br>
                        <div class="text-center mb-1" v-if="monthData.month">
                            {{ $t("hours.hoursMonthReport") | uppercase }} - {{ monthData.month.date | moment('MMMM') | uppercase}}
                        </div>
                        <table class="table full-width table-font q-pt-xl">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" class="format-text">{{ $t("hours.date") }}</th>
                                <th scope="col" class="format-text">{{ $t("hours.day_type") }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(day, index) in monthData.days">
                                <th scope="row">{{ index + 1 }}</th>
                                <td>{{ day.date | moment('dddd DD-MM-Y') }}</td>
                                <td>{{ day.day_type }}</td>
                            </tr>
                            </tbody>
                        </table>
                        <hr style="background: black;" class="margin-line">
                        <div class="float-left mt-3">
                            {{ monthData.employee }}<br>
                            {{ monthData.address }}<br>
                            {{ monthData.posta }}<br>
                        </div>
                        <div class="float-right mt-3">
                            {{ $t("hours.daysTotal") }}: {{ daysTotal() }}
                        </div>
                    </div>
                </q-card-section>
                <q-page-container>
                    <q-page-sticky position="bottom-right" :offset="[25, 100]">
                        <q-btn fab icon="print" color="green" @click="print"/>
                    </q-page-sticky>
                </q-page-container>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import {picturesPath} from "../../../global/variables";

export default {
    name: "PrintMonth",
    data() {
        return {
            maximizedToggle: true
        }
    },
    computed: {
        ...mapGetters({
            dialog: 'general/getPrintMonth',
            company: 'company/getCompany',
            monthData: 'months/getMonthData'
        })
    },
    filters: {
        uppercase(val) {
            if (val) {
                return val.toUpperCase()
            }
        },
        titleShort(val) {
            return val.substring(31,51)
        },
        titleLong(val) {
            return val.substring(0,30)
        }
    },
    created() {
      this.$store.dispatch('company/all')
    },
    methods: {
        ...mapActions({
            closePrintDialog: 'general/monthPrint'
        }),
        closeDialog() {
            this.closePrintDialog(false)
        },
        print() {
            this.$htmlToPaper('content');
        },
        image(img) {
            return picturesPath + img
        },
        daysTotal() {
            let num = 0
            if (this.monthData.days) {
                this.monthData.days.forEach(item => {
                    num++
                })
                return num
            }
        }
    }
}
</script>

<style scoped>
.column {
    float: left;
}
.left {
    width: 45%;
}
.middle {
    width: 20%;
}
.right {
    width: 35%;
}
.text-right {
    text-align: right
}
.c-mt {
    margin-top: 10px
}
.column img {
    vertical-align: middle
}
.margin-line {
    margin-bottom: 2rem;
}
.font-size-body {
    font-size: 19px
}
.table-font {
    font-size: 14px;
}
.format-text {
    text-align: left;
}
</style>

