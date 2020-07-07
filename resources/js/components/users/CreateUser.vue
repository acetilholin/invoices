<template>
<div class="create-user">
   <div class="text-center">
       <q-btn push color="white" text-color="green" title="Nov uporabnik" @click="medium = true" round icon="person" />
   </div>
   <q-dialog
       v-model="medium"
       ref="createModal"
   >
       <q-card style="width: 700px; max-width: 80vw;">
           <q-card-section>
               <div class="text-h6">Nov uporabnik</div>
           </q-card-section>

           <q-card-section class="q-pt-none">
               <q-form
                   @submit="createNew"
                   @reset="clearForm"
                   class="q-col-gutter-lg"
               >
                   <q-input
                       v-model="user.email"
                       label="Email"
                       type="email"
                       :rules="[ val => val && val.length > 0 || 'Vnesite email naslov']"
                   >
                       <template v-slot:prepend>
                           <q-icon name="alternate_email" />
                       </template>
                   </q-input>

                   <q-input
                       v-model="user.username"
                       label="Uporabniško ime"
                       type="text"
                       :rules="[ val => val && val.length > 3  || 'Vnesite uporabniško ime']"
                   >
                       <template v-slot:prepend>
                           <q-icon name="person" />
                       </template>
                   </q-input>

                   <div>
                       <q-btn
                           type="submit"
                           :loading="submitting"
                           label="Ustvari"
                           class="q-mt-md"
                           color="green"
                       >
                           <template v-slot:loading>
                               <q-spinner-tail
                                   color="white"
                               />
                           </template>
                       </q-btn>
                       <q-btn label="Počisti" type="reset" color="primary" flat class="q-ml-sm" />
                   </div>
               </q-form>
           </q-card-section>

           <q-card-actions align="right" class="bg-white text-teal">
               <q-btn flat label="Zapri" v-close-popup />
           </q-card-actions>
       </q-card>
   </q-dialog>
</div>
</template>

<script>

    import {mapActions} from 'vuex'

    export default {
        name: "CreateUser",
        data() {
            return {
                medium: false,
                user: {
                    email: '',
                    username: ''
                },
                submitting: false
            }
        },
        methods: {
            ...mapActions({
               addUser: 'users/addUser'
            }),
            clearForm() {
                this.user = {}
            },
            showNotif(message, type) {
                this.$q.notify({
                    message: message,
                    position: 'top',
                    type: type
                })
            },
            createNew() {
                this.submitting = true
                this.addUser(this.user)
                    .then((response) => {
                        this.showNotif(response, 'positive')
                        setTimeout(() => {
                            this.submitting = false
                            this.$refs.createModal.hide()
                        }, 1500)
                    })
                    .catch((e) => {
                        this.showNotif(e, 'negative')
                        this.submitting = false
                    })
            }
        }
    }
</script>

<style scoped>

</style>
