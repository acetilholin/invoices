<template>
    <div class="home-view">
        <div class="text-center q-pt-md">
            <Create></Create>
            <invoices-list class="q-mt-md"></invoices-list>
        </div>
    </div>
</template>

<script>

    import InvoicesList from "../components/invoices/InvoicesList";
    import Create from "../components/App/Create";

    export default {
        name: "Home",
        components: {
            InvoicesList,
            Create
        }
    }
</script>

<style scoped>
    .text-black {
        text-decoration: none;
    }
</style>
