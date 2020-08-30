<template>
    <div>
        <div class="text-center mb-2" v-if="currentUser">
            <q-img :src="userImage(currentUser.picture)"
                   class="rounded-borders"
                   style="height: 140px; max-width: 150px"
            >
                <template v-slot:loading>
                    <q-spinner-gears color="secondary" />
                </template>
            </q-img>
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
                        type="submit"
                        color="secondary"
                 >
                 </q-btn>
             </div>
         </q-form>
    </div>
</template>

<script>

    import {mapActions} from "vuex";
    import {picturesPath} from "../../../global/variables";

    export default {
        name: "Picture",
        data() {
            return {
                file: null
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
                let photoData = {
                    'id': this.currentUser.id,
                    'file': this.file
                }
                this.newImage(photoData)
                    .then((response) => {
                        setTimeout(() => {
                            this.showNotif(response,'positive')
                        }, 500)
                    })
                    .catch((e) => {
                        this.showNotif(e, 'negative')
                    })
            },
            userImage(img) {
                return picturesPath + img
            },
        }
    }
</script>

<style scoped>
    .rounded-borders {
        border-radius: 50% !important;
    }
</style>
