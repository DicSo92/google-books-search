<template>
    <ion-toolbar class="ion-text-start">
        <ion-text>
            <p class="ion-no-margin">
                <ion-chip color="primary" class="chip" :outline="showTitleSearch" @click="toggleTitleSearch">
                    <ion-label>Title</ion-label>
                    <ion-icon :name="!showTitleSearch ? 'add-circle' : 'close-circle'"></ion-icon>
                </ion-chip>
                <ion-chip color="secondary" class="chip" :outline="showAuthorSearch"
                          @click="toggleAuthorSearch">
                    <ion-label>Author</ion-label>
                    <ion-icon :name="!showAuthorSearch ? 'add-circle' : 'close-circle'"></ion-icon>
                </ion-chip>
                <ion-chip color="tertiary" class="chip" :outline="showGlobalSearch" @click="toggleGlobalSearch">
                    <ion-label>Global</ion-label>
                    <ion-icon :name="!showGlobalSearch ? 'add-circle' : 'close-circle'"></ion-icon>
                </ion-chip>
            </p>
        </ion-text>

        <transition-group name="list" tag="div">
            <ion-searchbar animated position="start"
                           :placeholder="'Title...'"
                           v-bind:value="titleSearch"
                           @input="titleSearch = $event.target.value"
                           @ionClear="titleSearch = ''"
                           v-if="this.showTitleSearch"
                           key="title"
                           class="searchBars">
            </ion-searchbar>
            <ion-searchbar animated position="start"
                           :placeholder="'Author...'"
                           v-bind:value="authorSearch"
                           @input="authorSearch = $event.target.value"
                           @ionClear="authorSearch = ''"
                           v-if="this.showAuthorSearch"
                           key="author"
                           class="searchBars">
            </ion-searchbar>
            <ion-searchbar animated position="start"
                           :placeholder="'Global Search...'"
                           v-bind:value="globalSearch"
                           @input="globalSearch = $event.target.value"
                           @ionClear="globalSearch = ''"
                           v-if="this.showGlobalSearch"
                           key="global"
                           class="searchBars">
            </ion-searchbar>
        </transition-group>
    </ion-toolbar>
</template>

<script>
    export default {
        name: "SearchBars",
        data () {
            return {
                titleSearch: '',
                authorSearch: '',
                globalSearch: '',
                showTitleSearch: false,
                showAuthorSearch: false,
                showGlobalSearch: false,
            }
        },
        mounted() {
            this.titleSearch = this.getTitleSearch
            this.authorSearch = this.getAuthorSearch
            this.globalSearch = this.getGlobalSearch
            this.showTitleSearch = this.getShowTitleSearch
            this.showAuthorSearch = this.getShowAuthorSearch
            this.showGlobalSearch = this.getShowGlobalSearch
        },
        watch: {
            titleSearch(val) {
                this.$store.commit('changeTitleSearch', val)
            },
            authorSearch(val) {
                this.$store.commit('changeAuthorSearch', val)
            },
            globalSearch(val) {
                this.$store.commit('changeGlobalSearch', val)
            },
            showTitleSearch(val) {
                this.$store.commit('changeShowTitleSearch', val)
            },
            showAuthorSearch(val) {
                this.$store.commit('changeShowAuthorSearch', val)
            },
            showGlobalSearch(val) {
                this.$store.commit('changeShowGlobalSearch', val)
            },
        },
        computed: {
            getTitleSearch () {
                return this.$store.state.titleSearch
            },
            getAuthorSearch() {
                return this.$store.state.authorSearch
            },
            getGlobalSearch() {
                return this.$store.state.globalSearch
            },
            getShowTitleSearch () {
                return this.$store.state.showTitleSearch
            },
            getShowAuthorSearch() {
                return this.$store.state.showAuthorSearch
            },
            getShowGlobalSearch() {
                return this.$store.state.showGlobalSearch
            },
        },
        methods: {
            toggleTitleSearch() {
                this.titleSearch = ''
                this.showTitleSearch = !this.showTitleSearch
            },
            toggleAuthorSearch() {
                this.authorSearch = ''
                this.showAuthorSearch = !this.showAuthorSearch
            },
            toggleGlobalSearch() {
                this.globalSearch = ''
                this.showGlobalSearch = !this.showGlobalSearch
            }
        },
    }
</script>

<style scoped lang="scss">
    .searchBars {
        transition: all 0.5s;
        padding-bottom: 0 !important;
        padding-top: 0 !important;
    }

    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateX(-50px);
    }
    .list-leave-active {
        /*position: absolute;*/
        /*z-index: 10;*/
    }
    .list-move {
        transition: transform 0.5s;
    }
</style>
