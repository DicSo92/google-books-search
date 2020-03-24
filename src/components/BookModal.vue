<template>
    <div id="BookModal">
        <ion-header translucent>
            <ion-toolbar>
                <ion-title color="dark">{{book.volumeInfo.title}}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismissModal">
                        <ion-icon slot="icon-only" name="close" color="dark"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding bookModalContent" fullscreen>
            <div class="modalHeader">
                <ion-thumbnail class="thumbnailImg">
                    <ion-img :src="book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail.replace(/^https?:\/\//i, 'https://') : require('@/assets/NotAvailable.jpg')"></ion-img>
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
                    <p class="mt-0">{{book.volumeInfo.description ? book.volumeInfo.description : 'Doesn\'t have Description...'}}</p>
                </ion-text>
            </div>


<!--            <ion-button expand="block" @click="showDetail">A block button</ion-button>-->
        </ion-content>
    </div>
</template>

<script>
    import router from '../router';


    export default {
        name: 'BookModal',
        props: ["book"],
        components: {
        },
        data() {
            return {

            }
        },
        created() {
        },
        mounted() {
        },
        watch: {
        },
        computed: {
            getAuthors () {
                return this.book.volumeInfo.authors ? this.book.volumeInfo.authors.join(', ') : 'Unknown Author'
            }
        },
        methods: {
            dismissModal() {
                this.$ionic.modalController.dismiss()
            },
            showDetail(title) {
                router.push('about');
            },
        }
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
