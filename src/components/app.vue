<template>
    <div class="app">
        <div class="app_head">
            <custom-image :source="data.icon"></custom-image>
            <h2 class="app_title">{{data.name}}</h2>
            <div class="app_params">
                <div class="param">
                    <android-s-v-g  class="platform" v-if="data.platform === 'android'" ></android-s-v-g>
                    <apple-s-v-g    class="platform" v-if="data.platform === 'apple'"> </apple-s-v-g>
                    <span>{{data.price}}</span>
                </div>
                <div class="param">
                    <star-s-v-g id="star"></star-s-v-g>
                    <p>{{data.rating}}</p>
                </div>
                <div class="param">
                    <location-s-v-g id="location"></location-s-v-g>
                    <p>{{data.location}}</p>
                </div>
            </div>
        </div>
        <div class="app_stats">
            <div class="stat">
                <p>ASO index</p>
                <h3>{{ data.asoindex }}</h3>
            </div>
            <div class="stat">
                <p>Установок за месяц</p>
                <h3>{{ $H.roundToShort( data.installations ) }}</h3>
            </div>
            <div class="stat">
                <p>В категории</p>
                <h3>{{ data.categoryPosition }}</h3>
            </div>
        </div>
    </div>
</template>
<script>
    import starSVG      from "@/assets/svg/star.svg"
    import locationSVG  from "@/assets/svg/mark.svg"
    import androidSVG   from "@/assets/svg/android.svg"
    import appleSVG     from "@/assets/svg/apple.svg"
    import customImage  from '@/components/custom/image.vue'

    export default {
        name: 'app',
        props:['data'],
        components:{ customImage, starSVG, locationSVG, androidSVG, appleSVG }

    }
</script>