<template>
    <div class="bookSkeleton" v-else>
        <div class="border-b">
            <h6 class="mb-0 ion-text-uppercase">
                <ion-skeleton-text animated style="width: 40%; line-height: 20px;"></ion-skeleton-text>
            </h6>
            <h3 class="ion-margin-vertical">
                <ion-skeleton-text animated style="width: 70%; line-height: 25px;"></ion-skeleton-text>
            </h3>
            <p class="mt-0 mb-8">
                <ion-skeleton-text animated style="width: 30%; line-height: 18px;"></ion-skeleton-text>
            </p>

        </div>
        <div class="">
            <ion-text class="ion-text-start">
                <p class="mb-0 mt-8"><b>Categories :</b></p>
                <p class="ion-no-margin">
                    <ion-skeleton-text animated style="width: 34%; --border-radius: 25px; line-height: 25px;"></ion-skeleton-text>
                </p>
            </ion-text>
        </div>

        <div class="">
            <ion-text class="ion-text-start">
                <p class="mb-8 mt-8"><b>Description :</b></p>
                <p class="mt-0">
                    <ion-skeleton-text animated style="width: 100%; line-height: 16px;"></ion-skeleton-text>
                </p>
                <p class="my-0">
                    <ion-skeleton-text animated style="width: 100%; line-height: 16px;"></ion-skeleton-text>
                </p>
                <p class="mt-0">
                    <ion-skeleton-text animated style="width: 100%; line-height: 16px;"></ion-skeleton-text>
                </p>
                <p class="mt-0">
                    <ion-skeleton-text animated style="width: 60%; line-height: 16px;"></ion-skeleton-text>
                </p>
            </ion-text>
        </div>

        <ion-button expand="block" class="ion-margin-vertical"
                    @click="goToViewer"
                    disabled>
            Book Viewer
        </ion-button>
    </div>
</template>

<script>

    export default {
        name: "BookSkeleton",

    }
</script>

<style scoped>

</style>
