<template>
    <RouterLink to="/" class="btn-more">
        <img src="@/assets/images/bars.svg" alt="">Подробнее
    </RouterLink>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.btn-more{
    display: flex;
    padding: 10px 15px;
    gap: 10px;
    color: white;
    background: #149A03;
    font-size: 20px;
    border-radius: 10px;
    align-items: center;
    transition: .3s;
    &:hover{
        background: #0D7000;
    }
}
</style>