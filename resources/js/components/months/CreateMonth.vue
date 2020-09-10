<template>
    <div class="create-month">
        <div class="text-center">
            <create @triggerModal="modal"></create>
        </div>
    </div>
</template>

<script>

import Create from "../App/Create";

export default {
    name: "CreateMonth",
    data() {
        return {

        }
    },
    components: {
        Create
    },
    methods: {
        modal(val) {
            this.$store.dispatch('general/createMonthDialog',true)
        }
    }
}
</script>

<style scoped>

</style>
