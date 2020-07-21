<template>
    <div class="customers">
        <customers-list></customers-list>
    </div>
</template>

<script>

    import CustomersList from "../components/customers/CustomersList";

    export default {
        name: "Customers",
        components: {
            CustomersList
        }
    }
</script>

<style scoped>

</style>
