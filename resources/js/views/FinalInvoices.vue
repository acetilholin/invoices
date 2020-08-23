<template>
    <div class="final-invoices">
        <final-list></final-list>
    </div>
</template>

<script>

    import FinalList from "../components/finalInvoices/tables/FinalList";

    export default {
        name: "FinalInvoices",
        components: {
            FinalList
        }
    }
</script>

<style scoped>

</style>
