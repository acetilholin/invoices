<template>
    <div class="home-view">
        <q-layout view="hHh lpR fFf">
            <q-header elevated class="bg-primary text-white" v-show="authenticated">
                <q-toolbar>
                    <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
                    <q-toolbar-title>Domov</q-toolbar-title>
                    <span class="q-mr-md" v-if="currentUser">{{ currentUser.name }}</span>
                    <q-btn @click.prevent="signOut" outline color="white" label="Odjava" />
                </q-toolbar>
            </q-header>
            <q-drawer
                v-model="drawer"
                show-if-above

                :mini="miniState"
                @mouseover="miniState = false"
                @mouseout="miniState = true"
                mini-to-overlay
                v-show="authenticated"
                :width="200"
                :breakpoint="500"
                bordered
                content-class="bg-grey-3"
            >
                <q-scroll-area class="fit">
                    <q-list padding>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon name="house" />
                            </q-item-section>
                            <q-item-section>
                                <router-link to="/">Domov</router-link>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon name="article" />
                            </q-item-section>
                            <q-item-section>
                                <router-link to="/customers">Predračuni</router-link>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon name="people" />
                            </q-item-section>
                            <q-item-section>
                                <router-link to="/customers">Stranke</router-link>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon name="description" />
                            </q-item-section>
                            <q-item-section>
                                <router-link to="/customers">Računi</router-link>
                            </q-item-section>
                        </q-item>

                    </q-list>
                </q-scroll-area>
            </q-drawer>

            <q-page-container class="q-ml-md q-mt-md">
                {{ authenticated }}
                <router-view></router-view>
            </q-page-container>

        </q-layout>
    </div>
</template>

<script>

    export default {
        name: "Home",
        data() {
            return {
                drawer: false,
                miniState: true,
                currentUser: {
                    name: 'Uporabnik'
                },
                authenticated: true
            }
        },
        methods: {
            signOut() { }
        }
    }
</script>

<style scoped>
    a:-webkit-any-link {
        text-decoration: none;
    }
    .router-link-exact-active {
        color: black;
        font-weight: bold;
    }
    .router-link-active {
        color: black !important;
    }
</style>
