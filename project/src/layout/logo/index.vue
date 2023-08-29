<template>
    <div class="logo" v-if="setingLogo.logoHidden">
        <img :src="setingLogo.logo" alt="原神">
        <p style="white-space: nowrap">{{ setingLogo.title }}</p>
    </div>
</template>

<script setup lang="ts">
import setingLogo from "@/seting-logo.ts";

</script>

<style scoped lang="scss">
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding-left: 20px;
    background-color: "#001529";

    img {
        width: 70px;
    }

    p {
        font-size: $base-logo-title-fontSize;
        margin-left: 27px;
    }
}
</style>