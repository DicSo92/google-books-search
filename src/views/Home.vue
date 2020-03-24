<template>
    <div class="ion-page">
        <ion-header>
            <TheTopHeader></TheTopHeader>

            <SearchBars></SearchBars>

            <Filters></Filters>
        </ion-header>

        <keep-alive>
            <TheBookList></TheBookList>
        </keep-alive>
    </div>
</template>

<script>
    import TheBookList from '@/components/TheBookList.vue'
    import TheTopHeader from '@/components/TheTopHeader.vue'
    import SearchBars from '@/components/SearchBars.vue'
    import Filters from '@/components/Filters.vue'

    export default {
        name: 'Home',
        components: {
            TheBookList,
            TheTopHeader,
            SearchBars,
            Filters
        },
        data() {
            return {
            }
        },
        mounted() {
        },
        watch: {
        },
        computed: {},
        methods: {
        },
    }
</script>

<style lang="scss">

</style>
