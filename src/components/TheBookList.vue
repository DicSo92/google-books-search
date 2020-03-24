<template>
    <ion-content fullscreen ref="theBookList" @ionScrollEnd="changeOffsetTop">
        <transition name="fadeTop">
            <div class="ion-text-center ion-margin-vertical" id="loaderTop"
                 v-show="this.loading">
                <ion-spinner color="warning"></ion-spinner>
            </div>
        </transition>


        <transition name="fade">
            <ion-text  class="ion-text-start" color="medium" v-if="this.$store.state.totalItems">
                <p class="nbResults">{{this.$store.state.totalItems}} Results</p>
            </ion-text>
        </transition>
        <ion-list class="booksContainer" scroll-y="true">
            <transition-group name="list" tag="div">
                <BookItem v-for="(book, index) in this.books"
                          :book="book"
                          :key="book.etag">
                </BookItem>
            </transition-group>
        </ion-list>

        <ion-infinite-scroll threshold="100px" ref="infiniteScroll" v-show="this.books.length > 0">
            <ion-infinite-scroll-content
                    loading-spinner="bubbles"
                    loading-text="Loading more data...">
            </ion-infinite-scroll-content>
        </ion-infinite-scroll>

        <div class="booksIconContainer">
            <transition name="fade">
                <ion-img class="booksIcon"
                         :class="this.nothing && this.isSearching ? 'grayFilter' : ''"
                         :src="require('@/assets/booksIcon.png')"
                         v-show="this.nothing || !this.isSearching">
                </ion-img>
            </transition>
            <transition name="fade">
                <ion-text color="medium" class="errorText" v-show="this.nothing && this.isSearching">
                    <ion-icon name="search" style="margin-right: 4px;"></ion-icon>
                    <h6 class="ion-no-margin">No Result</h6>
                </ion-text>
            </transition>
        </div>
    </ion-content>
</template>

<script>
    import axios from 'axios'

    import BookItem from '@/components/BookItem.vue'

    export default {
        name: 'TheBookList',
        props: [
        ],
        components: {
            BookItem
        },
        data() {
            return {
                loading: false,
                infiniteLoading: false,

                books: [],
            }
        },
        created() {
            this.debouncedGetSearch = _.debounce(this.getBooks, 500)

        },
        mounted() {
            this.$bus.$on('changeFilter', () => {
                if (!this.$store.state.routerHistory) {
                    this.loading = true
                    this.$nextTick(function () {
                        this.getBooks()
                    })
                }
            })

            if (this.$store.state.routerHistory) {
                this.books = this.$store.state.books
                this.$refs.theBookList.scrollToPoint(null, this.$store.state.offsetTop)
                this.$nextTick(function () {
                    this.$store.commit('changeRouterHistory', false)
                })
            }

            this.$refs.infiniteScroll.addEventListener("ionInfinite", event => {
                setTimeout(() => {
                    this.infiniteLoading = true
                    this.$store.state.startIndex += this.$store.state.maxResults
                    this.getBooks()
                    // event.target.complete()  // In getBooksFunction

                    if (this.$store.state.startIndex + this.$store.state.maxResults >= this.$store.state.totalItems) {
                        event.target.disabled = true
                    }
                }, 500)
            })
        },
        watch: {
            getTitleSearch: function (newSearch, oldSearch) {
                if (!this.$store.state.routerHistory) {
                    console.log("J'attends que vous arrêtiez de taper...")
                    this.loading = true
                    this.debouncedGetSearch()
                }
            },
            getAuthorSearch: function (newSearch, oldSearch) {
                if (!this.$store.state.routerHistory) {
                    console.log("J'attends que vous arrêtiez de taper...")
                    this.loading = true
                    this.debouncedGetSearch()
                }
            },
            getGlobalSearch: function (newSearch, oldSearch) {
                if (!this.$store.state.routerHistory) {
                    console.log("J'attends que vous arrêtiez de taper...")
                    this.loading = true
                    this.debouncedGetSearch()
                }
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
            getFilter() {
                return this.$store.state.filter === 'all' ? '' : '&filter=' + this.$store.state.filter
            },
            nothing() {
                return this.$store.state.totalItems <= 0;
            },
            isSearching() {
                return this.getTitleSearch.length > 0 || this.getAuthorSearch.length > 0 || this.getGlobalSearch.length > 0
            }
        },
        methods: {
            changeOffsetTop(e) {
                e.target.getScrollElement().then(promise => {
                    this.$store.commit('changeOffsetTop', promise.scrollTop)
                })
            },
            getBooks() {
                console.log('getBooks')
                if (!this.infiniteLoading && this.$refs.theBookList) {
                    this.$refs.theBookList.scrollToTop(200)
                    this.$store.commit('changeStartIndex', 0)
                }

                if (this.getTitleSearch.length > 0 || this.getAuthorSearch.length > 0 || this.getGlobalSearch.length > 0) {
                    axios
                        .get(
                            `https://www.googleapis.com/books/v1/volumes?q=${
                                this.getGlobalSearch ? this.getGlobalSearch : ''
                            }${
                                this.getTitleSearch ? 'intitle:' + this.getTitleSearch : ''
                            }${
                                this.getAuthorSearch ? '+inauthor:' + this.getAuthorSearch : ''
                            }&printType=${
                                this.$store.state.type
                            }&langRestrict=${
                                this.$store.state.lang
                            }&orderBy=${
                                this.$store.state.orderBy
                            }${
                                this.getFilter
                            }&startIndex=${
                                this.$store.state.startIndex
                            }&maxResults=${
                                this.$store.state.maxResults
                            }`
                        )
                        .then(response => {
                            if (response.data.items) {
                                if (!this.infiniteLoading) {
                                    this.$store.commit('changeTotalItems', response.data.totalItems)
                                    this.books = response.data.items
                                } else {
                                    response.data.items.forEach( book => {
                                        this.books.push(book)
                                    })
                                    this.$refs.infiniteScroll.complete()
                                    this.infiniteLoading = false
                                }
                            } else {
                                this.$store.commit('changeTotalItems', response.data.totalItems ? response.data.totalItems : null)
                                this.books = []
                            }
                            this.$store.commit('changeBooks', this.books)
                            this.loading = false
                        })
                        .catch(error => {
                            console.log(error)
                        });
                } else {
                    this.books = []
                    this.$store.commit('changeBooks', this.books)
                    this.loading = false
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .grayFilter {
        filter: grayscale(100%);
    }
    .booksIcon {
        visibility: visible; // Prevent bug
    }
    .booksIconContainer {
        width: 40%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .errorText {
        display: flex;
        align-items: center;
    }
    .nbResults {
        margin: 0 5px;
    }

    /*-----------------------*/
    /* ---- transitions ---- */
    /*-----------------------*/
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    #loaderTop {
        position: absolute;
        z-index: 1;
        transform: translateX(-50%);
        left: 50%;
    }
    .fadeTop-enter-active {
        transition: all .5s;
    }
    .fadeTop-leave-active {
        transition: all .3s;
    }
    .fadeTop-enter, .fadeTop-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        /*<!--transform: translateY(-20px);-->*/
    }
</style>
