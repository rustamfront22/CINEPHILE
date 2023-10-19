<template>
 <div class="media-info current-info" v-if="media">
    <div class="media-info-content current-info-content">
      <div class="media-info-content-block current-info-content-block">
        <h2>{{ media.title || media.name }}</h2>
        <p>{{ media.overview || "Неописуемый..." }}</p>
        <p class="media-info-content-block-descr current-info-content-block-descr">
          <span>{{ new Date(media.release_date || media.first_air_date).getFullYear() }}</span>
          <span>{{getGenres}}</span>
          <span>{{
                type == 'movie' ? `${Math.floor(media.runtime / 60)}h ${media.runtime % 60}m` :
                `${media.number_of_seasons}s ${media.number_of_episodes}e`
                }}
          </span>
        </p>
        <Actors :actors="actors" />
      </div>
      <img v-lazy="imgFull + media.backdrop_path" alt="" />
    </div>
    <img v-lazy="imgMini + media.poster_path" alt="" class="poster">
  </div>
</template>

<script setup>
const props = defineProps(['type'])
import { imgMini, imgFull } from "@/url";
import { ref, computed, onMounted } from 'vue';
import { useGetItemById } from '@/store/getItemById'
const getItemById = useGetItemById()
import { useActors } from '@/store/actors'
const actorsStore = useActors()
let media = ref(null)
let actors = ref(null)
import { useRoute } from "vue-router";
onMounted(async () => {
    await getItemById.getItemById({type: props.type, id: useRoute().params.id})
    media.value = props.type == 'movie' ? getItemById.movie : getItemById.tv 
    await actorsStore.getActors({type: props.type, id: media.value.id, count: 6})
    actors.value = props.type == 'movie' ? actorsStore.actorsMovie : actorsStore.actorsTv
})
const getGenres = computed(() => media.value.genres.reduce((acc, item) => acc + `, ${item.name}`, ''))
</script>