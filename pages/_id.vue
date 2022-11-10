<template>
    <character-page :id="id"/>
</template>

<script lang="ts">
export default {
    data() {
        return {
            id: this.$route.params.id,
        }
    }
}
</script>

<style lang="scss" scoped>
</style>