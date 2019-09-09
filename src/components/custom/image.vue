<template>
    <figure v-lazyImage class="image__wrapper" >
        <loading/>
        <img class="image__item" :data-url="source" alt="">
    </figure>
</template>

<script>
    import loading from "@/components/custom/loading.vue";

    export default {
        name: "customImage",
        components: {
            loading
        },
        props: {
            source: {
                type: String,
                required: true
            }
        }
    };
</script>