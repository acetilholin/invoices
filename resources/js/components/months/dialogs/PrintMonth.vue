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
                        <div class="text-center mb-1" v-if="monthData.month">
                            {{ $t("hours.hoursMonthReport") | uppercase }} - {{ monthData.month.date | moment('MMMM YYYY') | uppercase }}, {{ monthData.employee | uppercase }}
                        </div>
                        <div class="mt-2 mb-2">
                            <span class="title-short">{{ $t("hours.NU1_short") }}</span> - <span class="text-long">{{ $t("hours.NU1_text") }}</span><br>
                            <span class="title-short">{{ $t("hours.NU2_short") }}</span> - <span class="text-long">{{ $t("hours.NU2_text") }}</span><br>
                            <span class="title-short">{{ $t("hours.NU3_short") }}</span> - <span class="text-long">{{ $t("hours.NU3_text") }}</span><br>
                        </div>
                        <table class="table full-width table-font q-pt-xl">
                            <thead>
                            <tr>
                                <th scope="col" class="text-center">#</th>
                                <th scope="col" class="text-center">{{ $t("hours.date") }}</th>
                                <th scope="col" class="text-center">{{ $t("hours.work_day") }}</th>
                                <th scope="col" class="text-center">{{ $t("hours.holiday") }}</th>
                                <th scope="col" class="text-center">{{ $t("hours.festival") }}</th>
                                <th scope="col" class="text-center">{{ $t("hours.NU1_short") }}</th>
                                <th scope="col" class="text-center">{{ $t("hours.NU2_short") }}</th>
                                <th scope="col" class="text-center">{{ $t("hours.NU3_short") }}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(day, index) in monthData.days">
                                <th class="text-center" scope="row">{{ index + 1 }}</th>
                                <td class="text-center">{{ day.date | moment('dddd DD-MM-Y') }}</td>
                                <td class="text-center">{{ day.day_type === 'DD' ? '8' : ' ' }}</td>
                                <td class="text-center">{{ day.day_type === 'LD' ? '8' : ' ' }}</td>
                                <td class="text-center">{{ day.day_type === 'praznik' ? '8' : ' ' }}</td>
                                <td class="text-center">{{ day.day_type === 'NU1' ? '8' : ' ' }}</td>
                                <td class="text-center">{{ day.day_type === 'NU2' ? '8' : ' ' }}</td>
                                <td class="text-center">{{ day.day_type === 'NU3' ? '8' : ' ' }}</td>
                            </tr>
                            <tr>
                                <th scope="col" class="text-center">{{ totalDays  | days }}</th>
                                <th scope="col" class="text-center"></th>
                                <th scope="col" class="text-center">{{ workDays | hours }}</th>
                                <th scope="col" class="text-center">{{ holidays | hours }}</th>
                                <th scope="col" class="text-center">{{ festivals | hours }}</th>
                                <th scope="col" class="text-center">{{ nu1 | hours }}</th>
                                <th scope="col" class="text-center">{{ nu2 | hours }}</th>
                                <th scope="col" class="text-center">{{ nu3 | hours }}</th>
                            </tr>
                            </tbody>
                        </table>
                        <hr style="background: black">
                        <div class="container">
                            <div class="row">
                                <div class="column left">
                                    {{ monthData.employee }}<br>
                                    {{ monthData.address }}<br>
                                    {{ monthData.posta }}<br>
                                </div>
                                <div class="column middle"></div>
                                <div class="column right" v-for="cmp in company">
                                    <span class="float-right">
                                        {{ author }}<br>
                                        <img :src="image(cmp.stamp)" style="height: 80px; width: 130px" alt="">
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </q-card-section>
                <q-page-container>
                    <q-page-sticky position="bottom-right" :offset="[25, 40]">
                        <q-btn fab icon="print" color="green" @click="print"/>
                    </q-page-sticky>
                </q-page-container>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import {picturesPath, author} from "../../../global/variables";

export default {
    name: "PrintMonth",
    data() {
        return {
            maximizedToggle: true,
            workDays:  0,
            totalDays: 0,
            holidays: 0,
            festivals: 0,
            nu1: 0,
            nu2: 0,
            nu3: 0,
            author: author
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
        days(val) {
          return val + ' dni'
        },
        hours(val) {
          return val + ' ur'
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
    beforeUpdate() {
        this.calculateTotal()
    },
    methods: {
        ...mapActions({
            closePrintDialog: 'general/monthPrint'
        }),
        calculateTotal() {
           this.workDays = 0
           this.totalDays = 0
           this.holidays = 0
           this.festivals = 0
           this.nu1 = 0
           this.nu2 = 0
           this.nu3 = 0
            let day = 8

            if (this.monthData.days) {
                this.monthData.days.forEach(item => {
                    this.workDays += item.day_type === 'DD' ? day : 0
                    this.holidays += item.day_type === 'LD' ? day : 0
                    this.festivals += item.day_type === 'praznik' ? day : 0
                    this.nu1 += item.day_type === 'NU1' ? day : 0
                    this.nu2 += item.day_type === 'NU2' ? day : 0
                    this.nu3 += item.day_type === 'NU3' ? day : 0
                    this.totalDays ++
                })
            }
        },
        closeDialog() {
            this.closePrintDialog(false)
        },
        print() {
            this.$htmlToPaper('content');
        },
        image(img) {
            return picturesPath + img
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
    width: 30%;
}
.left-bottom {
    width: 30%;
}
.middle-bottom {
    width: 55%;
}
.right-bottom {
    width: 15%;
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
    margin-bottom: 1rem;
}
.font-size-body {
    font-size: 19px
}
.table-font {
    font-size: 14px;
}
.title-short {
    font-size: 13px !important;
}
.text-long {
    font-size: 12px !important;
}
</style>

