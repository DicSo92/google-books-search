<template>
    <div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-nav-link slot="start" router-direction="back">
                    <ion-buttons >
                        <ion-back-button></ion-back-button>
                    </ion-buttons>
                </ion-nav-link>
                <ion-title v-if="book">{{book.volumeInfo.title}}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" v-if="book">
            <div class="modalHeader">
                <ion-thumbnail class="thumbnailImg">
                    <ion-img :src="imageLink != null ? imageLink : require('@/assets/NotAvailable.jpg')"></ion-img>
                </ion-thumbnail>
            </div>
            <div class="border-b">
                <ion-text class="ion-text-start" color="medium">
                    <h6 class="mb-0 ion-text-uppercase">{{getAuthors}}</h6>
                </ion-text>
                <ion-text class="ion-text-start">
                    <h3 class="ion-no-margin"><b>{{book.volumeInfo.title}}</b></h3>
                </ion-text>
                <ion-text class="ion-text-start" color="medium">
                    <p class="mt-0 mb-8">{{book.volumeInfo.publisher ? book.volumeInfo.publisher : 'Independently Published'}} - {{book.volumeInfo.publishedDate}}</p>
                </ion-text>
            </div>
            <div class="" v-if="book.volumeInfo.categories">
                <ion-text class="ion-text-start">
                    <p class="mb-0 mt-8"><b>Categories :</b></p>
                    <p class="ion-no-margin">
                        <ion-chip color="tertiary" class="chip" outline
                                  v-for="(category, index) in book.volumeInfo.categories">
                            <ion-label>{{category}}</ion-label>
                        </ion-chip>
                    </p>
                </ion-text>
            </div>

            <div class="">
                <ion-text class="ion-text-start">
                    <p class="mb-8 mt-8"><b>Description :</b></p>
                    <p class="mt-0"><span v-html="getDescription"></span></p>
                </ion-text>
            </div>

            <ion-button expand="block" class="ion-margin-vertical"
                        @click="goToViewer"
                        :disabled="book.accessInfo.viewability === 'NO_PAGES'">
                Book Viewer
            </ion-button>

            <div class="">
                <ion-text class="ion-text-start">
                    <p class="mb-8 mt-8"><b>Details :</b></p>
                </ion-text>
                <ion-list>
                    <ion-item>
                        <ion-label>Publisher :</ion-label>
                        <ion-text>
                            <p class="ion-no-margin">{{book.volumeInfo.publisher}}</p>
                        </ion-text>
                    </ion-item>
                    <ion-item>
                        <ion-label>Publish Date :</ion-label>
                        <ion-text>
                            <p class="ion-no-margin">{{book.volumeInfo.publishedDate}}</p>
                        </ion-text>
                    </ion-item>
                    <ion-item>
                        <ion-label>Pages :</ion-label>
                        <ion-text>
                            <p class="ion-no-margin">{{book.volumeInfo.pageCount ? book.volumeInfo.pageCount : 'Unknown '}}</p>
                        </ion-text>
                    </ion-item>
                    <ion-item>
                        <ion-label>ISBN :</ion-label>
                        <ion-text>
                            <p class="ion-no-margin">{{getIsbn}}</p>
                        </ion-text>
                    </ion-item>
                    <ion-item>
                        <ion-label>Language :</ion-label>
                        <ion-text>
                            <p class="ion-no-margin">{{book.volumeInfo.language}}</p>
                        </ion-text>
                    </ion-item>
                </ion-list>
            </div>

            <div class="qrCodeContainer">
                <ion-thumbnail class="thumbnailQrCode">
                    <ion-img :src="`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=https://books.google.fr/books?id=${this.$route.params.bookId}&source=qrcode`"></ion-img>
                </ion-thumbnail>
            </div>
        </ion-content>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Book',
        components: {

        },
        data() {
            return {
                book: null
            }
        },
        mounted() {
            this.getBook()
        },
        watch: {
        },
        computed: {
            getAuthors () {
                return this.book.volumeInfo.authors ? this.book.volumeInfo.authors.join(', ') : 'Unknown Author'
            },
            getDescription() {
                return this.book.volumeInfo.description ? this.book.volumeInfo.description : 'Doesn\'t have Description...'
            },
            getIsbn() {
                return this.book.volumeInfo.industryIdentifiers[0].identifier
            },
            imageLink() {
                if (this.book.volumeInfo.imageLinks) {
                    // if (this.book.volumeInfo.imageLinks.extraLarge) {
                    //     return this.book.volumeInfo.imageLinks.extraLarge
                    // }
                    if (this.book.volumeInfo.imageLinks.large) {
                        return this.book.volumeInfo.imageLinks.large.replace(/^https?:\/\//i, "https://")
                    } else if (this.book.volumeInfo.imageLinks.medium) {
                        return this.book.volumeInfo.imageLinks.medium.replace(/^https?:\/\//i, "https://")
                    } else if (this.book.volumeInfo.imageLinks.small) {
                        return this.book.volumeInfo.imageLinks.small.replace(/^https?:\/\//i, "https://")
                    } else if (this.book.volumeInfo.imageLinks.thumbnail) {
                        return this.book.volumeInfo.imageLinks.thumbnail.replace(/^https?:\/\//i, "https://")
                    } else if (this.book.volumeInfo.imageLinks.smallThumbnail) {
                        return this.book.volumeInfo.imageLinks.smallThumbnail.replace(/^https?:\/\//i, "https://")
                    }
                } else {
                    return null
                }
            }
        },
        methods: {
            goToViewer() {
                this.$router.push({ name: 'viewer', params: { bookId: this.book.id }});
            },
            getBook() {
                    axios.get(`https://www.googleapis.com/books/v1/volumes/${this.$route.params.bookId}`)
                        .then(response => {
                            this.book = response.data
                        })
                        .catch(error => {
                            console.log(error)
                        });
            }
        },
    }
</script>

<style scoped lang="scss">
    #BookModal {
        /*--background: #a6a6a6;*/
    }
    .bookModalContent {
        /*--background: #dfdfdf;*/
    }
    .thumbnailImg {
        margin-top: 5px;
        margin-bottom: 5px;
        height: auto;
        width: 80%;
        display: flex;
        align-items: center;
    }
    .modalHeader {
        margin-left: -16px;
        margin-right: -16px;
        margin-top: -16px;
        background-color: #303030;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 400px;
    }
    .chip {
        margin-left: 0;
    }
    .qrCodeContainer {
        display: flex;
        justify-content: center;
        .thumbnailQrCode {
            width: 75%;
            height: auto;
        }
    }

    .border-b {
        border-bottom: 1px grey solid;
    }
    .mt-0 {
        margin-top: 0;
    }
    .mb-0 {
        margin-bottom: 0;
    }
    .mt-8 {
        margin-top: 8px;
    }
    .mb-8 {
        margin-bottom: 8px;
    }
</style>

