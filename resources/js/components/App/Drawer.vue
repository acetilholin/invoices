<template>
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
                        <q-icon :class="{'icon-active' : currentPage === '/'}" name="article" />
                    </q-item-section>
                    <q-item-section>
                        <router-link to="/" class="text-subtitle1">Predračuni</router-link>
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon :class="{'icon-active' : currentPage === '/customers'}" name="business_center" />
                    </q-item-section>
                    <q-item-section>
                        <router-link to="/customers" class="text-subtitle1">Stranke</router-link>
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon :class="{'icon-active' : currentPage === '/final-invoices'}" name="description" />
                    </q-item-section>
                    <q-item-section>
                        <router-link to="/final-invoices" class="text-subtitle1">Računi</router-link>
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon :class="{'icon-active' : currentPage === '/statistics'}" name="timeline" />
                    </q-item-section>
                    <q-item-section>
                        <router-link to="/statistics" class="text-subtitle1">Promet</router-link>
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon :class="{'icon-active' : currentPage === '/website'}" name="public" />
                    </q-item-section>
                    <q-item-section>
                        <router-link to="/website" class="text-subtitle1">Web stran</router-link>
                    </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                    <q-item-section avatar>
                        <q-icon :class="{'icon-active' : currentPage === '/users'}" name="people_outline" />
                    </q-item-section>
                    <q-item-section>
                        <router-link to="/users" class="text-subtitle1">Uporabniki</router-link>
                    </q-item-section>
                </q-item>

            </q-list>
        </q-scroll-area>
    </q-drawer>
</template>

<script>

    import {mapGetters} from 'vuex'

    export default {
        name: "Drawer",
        data() {
            return {
                miniState: true
            }
        },
        computed: {
            ...mapGetters({
                currentUser: 'auth/user',
                authenticated: 'auth/authenticated',
                drawer: 'general/getDrawer'
            }),
            currentPage() {
                return this.$route.path
            }
        }
    }
</script>

<style scoped>

    a {
        text-decoration: none;
        color: black;
    }
    .router-link-exact-active {
        color: #1976d2;
        font-weight: 500;
    }
    .icon-active {
        color: #1976d2;
    }
</style>
