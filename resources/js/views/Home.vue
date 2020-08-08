<template>
    <div class="home-view">
        <invoices-list></invoices-list>
    </div>
</template>

<script>

    import InvoicesList from "../components/invoices/InvoicesList";

    export default {
        name: "Home",
        components: {
            InvoicesList
        }
    }
</script>

<style scoped>

</style>
