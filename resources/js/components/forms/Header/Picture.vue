<template>
    <div>
        <div class="text-center mb-2" v-if="currentUser">
            <q-avatar size="100px">
                <img :src="userImage(currentUser.picture)">
            </q-avatar>
            <br>
            <span class="text-h6">{{ currentUser.username }}</span>
        </div>
         <q-form
             @submit="changePicture">
             <q-file color="primary"
                     v-model="file"
                     accept=".jpg, .jpeg, .png"
                     @rejected="showNotif(`${this.$t('general.pictureFormats')}`,'negative')"
                     :rules="[val => !!val || `${this.$t('general.choosePicture')}`]"
                     label="Datoteka">
                 <template v-slot:prepend>
                     <q-icon name="attach_file" />
                 </template>
             </q-file>
             <div class="q-mt-md">
                 <q-btn label="Spremeni"
                        :loading="submitting"
                        type="submit"
                        color="secondary"
                 >
                     <template v-slot:loading>
                         <q-spinner-tail
                             color="white"
                         />
                     </template>
                 </q-btn>
             </div>
         </q-form>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "Picture",
        data() {
            return {
                file: null,
                submitting: false
            }
        },
        props: ['currentUser'],
        methods: {
            ...mapActions({
                newImage: 'users/changeImage'
            }),
            showNotif(message, type) {
                this.$q.notify({
                    message: message,
                    position: 'top',
                    timeout: 1500,
                    type: type
                })
            },
            changePicture() {
                this.submitting = true
                let photoData = {
                    'id': this.currentUser.id,
                    'file': this.file
                }
                this.newImage(photoData)
                    .then((response) => {
                        setTimeout(() => {
                            this.showNotif(response,'positive')
                            this.submitting = false
                        }, 500)
                    })
                    .catch((e) => {
                        this.showNotif(e, 'negative')
                        this.submitting = false
                    })
            },
            userImage(img) {
                return '/pictures/' + img
            },
        }
    }
</script>

<style scoped>

</style>
