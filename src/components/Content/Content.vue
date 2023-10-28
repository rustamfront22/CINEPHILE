<template>
  <section class="container content">
    <h2>Все {{ type == "movie" ? "фильмы" : "сериалы" }}</h2>
    <div class="content-cards">
      <RouterLink :to="`${type}/${item.id}`" v-for="item in content" :key="item.id">
        <img v-lazy="imgMini + item.poster_path" alt="" />
        <h3>{{ item.title || item.name }}</h3>
      </RouterLink>
    </div>
    <div class="pagination">
        <button :disabled="carrentPage == 1" @click="changePage('back')">BAC</button>
        <span>Страница {{ currentPage }} - {{ totalPages }}</span>
        <button :disabled="carrentPage == totalPages" @click="changePage('next')">NEXT</button>
    </div>
  </section>
</template>

<script setup>
import { imgMini } from "@/url";
import { ref, computed, onMounted } from "vue";
import { usePopular } from "@/store/popular";

const props = defineProps(["type"]);
const popular = usePopular();
const content = ref(null)
const currentPage = ref(1)
const totalPages = ref(500)
onMounted(async () => {
  await popular.getPopular(props.type);
  content.value = props.type == "movie" ? popular.popularMovies : popular.popularTvs
})
const changePage = async (dir) => {
    if(dir == 'next') currentPage.value++
    else currentPage.value--
    await popular.getPopular(props.type, currentPage.value)
    content.value = props.type == "movie" ? popular.popularMovies : popular.popularTvs
    window.scroll(0, 0)
}

</script>