import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        type: 'all',
        lang: 'fr',
        orderBy: 'newest',
        filter: 'all',

        books: [],
        startIndex: 0,
        maxResults: 10,
        totalItems: null,

        titleSearch: '',
        authorSearch: '',
        globalSearch: '',
        showTitleSearch: true,
        showAuthorSearch: false,
        showGlobalSearch: false,
    },
    mutations: {
        changeType(state, newType) {
            state.type = newType
        },
        changeLang(state, newLang) {
            state.lang = newLang
        },
        changeOrderBy(state, newOrderBy) {
            state.orderBy = newOrderBy
        },
        changeFilter(state, newFilter) {
            state.filter = newFilter
        },

        changeBooks(state, newBooks) {
            state.books = newBooks
        },
        changeStartIndex(state, newStartIndex) {
            state.startIndex = newStartIndex
        },
        changeMaxResults(state, newMaxResults) {
            state.maxResults = newMaxResults
        },
        changeTotalItems(state, newTotalItems) {
            state.totalItems = newTotalItems
        },

        changeTitleSearch(state, newTitleSearch) {
            state.titleSearch = newTitleSearch
        },
        changeAuthorSearch(state, newAuthorSearch) {
            state.authorSearch = newAuthorSearch
        },
        changeGlobalSearch(state, newGlobalSearch) {
            state.globalSearch = newGlobalSearch
        },
        changeShowTitleSearch(state, newShowTitleSearch) {
            state.showTitleSearch = newShowTitleSearch
        },
        changeShowAuthorSearch(state, newShowAuthorSearch) {
            state.showAuthorSearch = newShowAuthorSearch
        },
        changeShowGlobalSearch(state, newShowGlobalSearch) {
            state.showGlobalSearch = newShowGlobalSearch
        },
    },
    actions: {},
    modules: {}
})
