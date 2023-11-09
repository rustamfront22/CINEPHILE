<template>
<section class="container search">
    <input type="text" v-model="query" placeholder="Найти фильм, сериал..." required autofocus @input="search(query)">
    <div class="search-content">
        <RouterLink :to="item.title ? '/movie/' + item.id : '/tv/' + item.id" v-for="item in content" :key="item.id">
            <img v-lazy="imgMini + item.poster_path" alt="">
        </RouterLink>
    </div>
</section>
</template>
<script setup>
import { imgMini } from "@/url";
import { ref, onMounted } from "vue";
import { useSearch } from "@/store/search";
const searchStore = useSearch()
const query = ref('')
const content = ref([])
const search = async (query) => {
    await searchStore.getSearch(query)
    content.value = searchStore.content
}

</script>
<style lang="scss">
.search{
    margin-top: 30px;
    input{
        width: 100%;
        padding: 20px;
        border-radius: 10px;
        border: none;
        outline: none;
        color: #141414;
        font-size: 18px;
        font-weight: 700;
        &::placeholder{
            color: #141414;
        }
    }
    &-content{
        display: flex;
        flex-wrap: wrap;
        gap: 15.3px;
        a{
            width: 311px;
            height: 462px;
            border-radius: 10px;
            img{
                width: 100%;
                height: 100%;
                border: 1px solid #000;
                box-shadow: 0px 4px 4px 0px #000;
                border-radius: 10px;
            }
        }
    }
}
</style>