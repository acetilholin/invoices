<template>
    <div class="c-e-button text-center">
        <q-fab color="primary"
               glossy
               icon="keyboard_arrow_right"
               direction="right"
        >
            <q-fab-action external-label
                          label-position="top"
                          color="amber"
                          text-color="white"
                          @click="trigger"
                          icon="person"
                          label="Nov zaposleni"
            />
        </q-fab>
    </div>
</template>

<script>
export default {
    name: "CreateEmployeeButton",
    methods: {
        trigger() {
            this.$emit('newEmployee',true)
        }
    }
}
</script>

<style scoped>

</style>
