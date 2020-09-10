<template>
    <div class="employees-dialog">
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
                    <create-employee-button class="q-mt-md q-mb-lg" @newEmployee="createNew"></create-employee-button>
                    <employee-list></employee-list>
                </q-card-section>
            </q-card>
            <create-employee></create-employee>
        </q-dialog>
    </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import EmployeeList from "../EmployeeList";
import CreateEmployeeButton from "../CreateEmployeeButton";
import CreateEmployee from "./CreateEmployee";

export default {
    name: "EmployeesDialog",
    components: {CreateEmployee, CreateEmployeeButton, EmployeeList},
    data() {
        return {
            maximizedToggle: true
        }
    },
    computed: {
        ...mapGetters({
            dialog: 'general/getEmployeeDialog',
        })
    },
    methods: {
        ...mapActions({
            closeEditDialog: 'general/EmployeesDialog',
            createEmployee: 'general/CreateEmployeeDialog'
        }),
        closeDialog() {
            this.closeEditDialog(false)
        },
        createNew(val) {
            this.createEmployee(true)
        }
    }
}
</script>

<style scoped>

</style>
