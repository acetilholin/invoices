<template>
    <div class="create-customer">
        <div class="text-center">
            <create @triggerModal="modal"></create>
        </div>
        <q-dialog
            v-model="medium"
        >
            <q-card style="width: 700px; max-width: 80vw;">
                <q-card-section>
                    <div class="text-h6">Nova stranka</div>
                </q-card-section>

                <q-card-section class="q-pt-none">

                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="ZAPRI" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>

    import {mapActions} from 'vuex'
    import Create from "../App/Create";

    export default {
        name: "CreateCustomer",
        data() {
            return {
                medium: false
            }
        },
        components: {
            Create
        },
        methods: {
            modal(param) {
                this.medium = param
            },
        }

    }
</script>

<style scoped>

</style>
