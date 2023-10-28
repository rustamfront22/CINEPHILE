<template> 
      <div class="media-info current-info" v-if="media">
        <div class="media-info-content current-info-content" >
            <div class="media-info-content-block current-info-content-block">
                <h2>{{media.title || media.name}}</h2>
                <p>{{media.overview || 'Неописуемый...'}}</p>
                <p class="media-info-content-block-descr current-info-content-block-descr">
                    <span>{{ new Date (media.release_date || media.first_air_date).getFullYear() }}</span>
                    <span>{{getGenres}}</span>
                    <span>
                        {{type == 'movie' ? `${Math.floor(media.runtime / 60)}h ${media.runtime % 60}m` :
                        `${media.number_of_seasons}s ${media.number_of_episodes}e`}}
                    </span>
                </p>
                <a :href="`http://www.youtube.com/watch/${trailer}`" target="_blank"  v-if="trailer" class="btn-more">Смотреть трейлер! </a>
                <div class="actors-content">
                    <span>В главных ролях</span>
                    <Actors :actors="actors"/>    
                </div>
                
            </div>
            <img v-lazy="imgFull + media.backdrop_path" alt="" />
        </div>
    <img v-lazy="imgFull + media.poster_path" alt="" class="poster">
    </div>
        <ul class="container media-content-list" v-if="media">
            <li>
                <h3>Бюджет</h3>
                <span v-if="media.budget">${{getBudget}}</span>
                <span v-else>Неизвестно</span>
            </li>
            <li>
                <h3>Сборы</h3>
                <span v-if="media.revenue">${{getRevenue}}</span>
                <span v-else>${{media.revenue || 'Неизвестно'}}</span>
            </li>
            <li>
                <h3>Статус</h3>
                <span>{{media.status || 'Неизвестно'}}</span>
            </li>
            <li>
                <h3>Исходное название</h3>
                <span>{{media.original_title || 'Неизвестно'}}</span>
            </li>
        </ul>
        <section class="container rec">
            <h2>Рекомендации</h2>
            <div class="rec-content">
                <RouterLink :to="`/${type}/${item.id}`" v-for="item in rec" :key="item.id" @click="changeContent(item.id)">
                    <img v-lazy="imgMini + item.poster_path" alt="">
                </RouterLink>
            </div>
        </section>
        
</template>

<script setup>
import { useRoute } from "vue-router";
const props = defineProps(["type"]);
import { imgMini, imgFull } from "@/url";
import { ref, computed, onMounted } from "vue";
import { useGetItemById } from "@/store/getItemById";
const getItemById = useGetItemById();
import { useActors } from "@/store/actors";
const actorsStore = useActors();
import { useTrailer } from "@/store/trailer";
const trailerStore = useTrailer();
import { useRec } from "@/store/rec";
const recStore = useRec();
let media = ref(null)
let actors = ref(null)
let trailer = ref(null)
let rec = ref(null)
onMounted(async () => {
    await getItemById.getItemById({type: props.type, id: useRoute().params.id})
    media.value = props.type == 'movie' ? getItemById.movie : getItemById.tv 
    await actorsStore.getActors({type: props.type, id: media.value.id, count: 6})
    actors.value = props.type == 'movie' ? actorsStore.actorsMovie : actorsStore.actorsTv
    trailer.value = trailerStore.movieTrailer = trailerStore.tvTrailer = null 
    await trailerStore.getTrailer({type: props.type, id: media.value.id})
    trailer.value = props.type == 'movie' ? trailerStore.movieTrailer : trailerStore.tvTrailer
    await recStore.getRec({type: props.type, id: media.value.id})
    rec.value = props.type == 'movie' ? recStore.recMovie : recStore.recTv
})
const getGenres  = computed(() => media.value.genres.reduce((acc, item) => acc + `, ${item.name}`, ''))

const getBudget  = computed(() => media.value.budget  ? media.value.budget.toString().split("").reverse().join("").match(/.{1,3}/g).reverse().join(","): '')
const getRevenue = computed(() => media.value.revenue ? media.value.revenue.toString().split("").reverse().join("").match(/.{1,3}/g).reverse().join(","): '')
const changeContent = async (id) => {
    await getItemById.getItemById({type: props.type, id: id})
    window.location.reload()
}
</script>