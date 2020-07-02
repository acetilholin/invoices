<template>
    <div class="home-view">
        <q-layout view="hHh lpR fFf">
            <q-header></q-header>
            <q-drawer></q-drawer>
            <q-page-container class="q-ml-md q-mt-md">
                <router-view></router-view>
            </q-page-container>
        </q-layout>
    </div>
</template>

<script>

    import Drawer from "../components/App/Drawer";
    import Header from "../components/App/Header";

    export default {
        name: "App",
        components: {
            'q-drawer': Drawer,
            'q-header': Header
        },
        data() {
            return {
                state: null
            }
        }
    }
</script>

<style scoped>

</style>
