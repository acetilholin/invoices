<template>
    <div class="home-view">
        <div class="text-center q-pt-md">
            <q-btn push color="white" text-color="green" round icon="article" />
            <invoices-list class="q-mt-md"></invoices-list>
        </div>
    </div>
</template>

<script>

    import InvoicesList from "../components/Invoices/InvoicesList";

    export default {
        name: "Home",
        components: {
            InvoicesList
        }
    }
</script>

<style scoped>
    .text-black {
        text-decoration: none;
    }
</style>
