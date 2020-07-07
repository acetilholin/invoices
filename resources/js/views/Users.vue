<template>
    <div class="users">
        <users-list></users-list>
    </div>
</template>

<script>

    import UsersList from "../components/users/UsersList";

    export default {
        name: "Users",
        components: {
            UsersList
        }
    }
</script>

<style scoped>

</style>
