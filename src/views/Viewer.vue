<template>
    <div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-nav-link slot="start" router-direction="back">
                    <ion-buttons >
                        <ion-back-button></ion-back-button>
                    </ion-buttons>
                </ion-nav-link>
                <ion-title>BookViewer</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="displayViewer">Refresh</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <div id="viewerCanvas" style="width: 100%; height: 100%;"></div>
        </ion-content>
    </div>
</template>

<script>
    export default {
        name: 'Viewer',
        components: {

        },
        data() {
            return {
            }
        },
        beforeCreate() {
            // let viewerApi = document.createElement('script')
            // viewerApi.setAttribute('src', 'https://www.google.com/books/jsapi.js')
            // document.head.appendChild(viewerApi)

            // window.google.books.load({"language": "en"})
        },
        created() {
        },
        mounted() {
            setTimeout(() => {
                this.displayViewer()
            }, 500)
            // window.google.books.setOnLoadCallback(this.displayViewer)
        },
        watch: {
        },
        computed: {},
        methods: {
            displayViewer() {
                console.log('init')

                let viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));

                viewer.load(this.$route.params.bookId, this.notFound(), this.initialized()); // Callbacks doesn't work...
            },
            notFound() {
                console.log("could not embed the book!");
            },
            initialized() {
                console.log("book successfully loaded and initialized!");
            },
        },
    }
</script>

<style lang="scss">

</style>

