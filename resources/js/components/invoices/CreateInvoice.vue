<template>
    <div class="create-invoice">
        <div class="text-center">
            <create @triggerModal="modal"></create>
        </div>
    </div>
</template>

<script>

import Create from "../App/Create";

export default {
    name: "CreateInvoice",
    data() {
        return {

        }
    },
    components: {
        Create
    },
    methods: {
        modal() {

        }
    }
}
</script>

<style scoped>

</style>
