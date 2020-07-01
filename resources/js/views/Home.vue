<template>
    <div class="home-view">
        <q-layout view="hHh lpR fFf">
            <q-header elevated class="bg-primary text-white" v-show="authenticated">
                <q-toolbar>
                    <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
                    <q-toolbar-title>Domov</q-toolbar-title>
                    <span class="q-mr-md">
                        <q-btn dense color="blue-10" round icon="email" class="q-ml-md">
                        <q-badge color="red" floating>1</q-badge>
                    </q-btn>
                    </span>
                    <span class="q-mr-md" v-if="currentUser">
                        <q-chip>
                            <q-avatar>
                              <img src="https://cdn.quasar.dev/img/avatar1.jpg">
                            </q-avatar>
                              {{ currentUser.name }}
                        </q-chip>
                    </span>
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
                                <q-icon name="article" />
                            </q-item-section>
                            <q-item-section>
                                <router-link to="/customers" class="text-black text-subtitle1">Predračuni</router-link>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon name="business_center" />
                            </q-item-section>
                            <q-item-section>
                                <router-link to="/customers" class="text-black text-subtitle1">Stranke</router-link>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon name="description" />
                            </q-item-section>
                            <q-item-section>
                                <router-link to="/customers" class="text-black text-subtitle1">Računi</router-link>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon name="poll" />
                            </q-item-section>
                            <q-item-section>
                                <router-link to="/customers" class="text-black text-subtitle1">Promet</router-link>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon name="public" />
                            </q-item-section>
                            <q-item-section>
                                <router-link to="/customers" class="text-black text-subtitle1">Spletna stran</router-link>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon name="people_outline" />
                            </q-item-section>
                            <q-item-section>
                                <router-link to="/customers" class="text-black text-subtitle1">Uporabniki</router-link>
                            </q-item-section>
                        </q-item>

                    </q-list>
                </q-scroll-area>
            </q-drawer>

            <q-page-container class="q-ml-md q-mt-md">

                <router-view></router-view>
            </q-page-container>

        </q-layout>
    </div>
</template>

<script>

    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "Home",
        data() {
            return {
                drawer: false,
                miniState: true,
                authenticated: true
            }
        },
        computed: {
            ...mapGetters({
                currentUser: 'user'
            })
        },
        methods: {
            ...mapActions({
               signoutAction: 'logout'
            }),
            signOut() {
                this.signoutAction()
                .then(() => {
                    this.$router.push('/login-register')
                })
            }
        }
    }
</script>

<style scoped>
    .text-black {
        text-decoration: none;
    }
</style>
