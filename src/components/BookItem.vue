<template>
    <ion-item @click="goToBook" class="transitionBookItem">
        <ion-thumbnail slot="start" class="bookImg">
            <ion-img :src="book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail.replace(/^https?:\/\//i, 'https://') : require('@/assets/NotAvailable.jpg')"></ion-img>
        </ion-thumbnail>
        <ion-label class="labels">
            <h2>{{book.volumeInfo.title}}</h2>
            <h3>{{getAuthors}}</h3>
            <p>{{book.volumeInfo.description ? book.volumeInfo.description : 'No description'}}</p>
            <div class="pagesQuick">
                <p>{{book.volumeInfo.pageCount ? book.volumeInfo.pageCount : 'Unknown '}} pages</p>
                <ion-button class="ion-no-margin" fill="clear" @click.stop="showQuickView">Quick View</ion-button>
            </div>
        </ion-label>
    </ion-item>
</template>
<script>
    import BookModal from '@/components/BookModal.vue'

    export default {
        name: "book",
        props: ["book"],
        data() {
            return {

            }
        },
        computed: {
            getAuthors () {
                if (this.book.volumeInfo.authors) {
                    let authors = this.book.volumeInfo.authors[0]
                    this.book.volumeInfo.authors[1] ? authors.concat(', ' + this.book.volumeInfo.authors[1]) : false
                    return authors
                } else {
                    return 'Unknown Author'
                }
            },
        },
        methods: {
            goToBook() {
                this.$router.push({ name: 'book', params: { bookId: this.book.id }})
                this.$store.commit('changeRouterHistory', true)
            },
            showQuickView() {
                return this.$ionic.modalController
                    .create({
                        component: BookModal,
                        componentProps: {
                            propsData: {
                                book: this.book
                            }
                        }
                    }).then(m => {
                        m.present()
                    })
            },
        }
    }
</script>
<style lang="scss">
    .bookImg {
        height: 100%;
    }
    .labels {
        margin-bottom: 5px;
    }
    .pagesQuick {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .transitionBookItem {
        transition: all 0.5s;
    }
</style>
