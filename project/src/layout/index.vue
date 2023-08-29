<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <Logo> </Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- :collapse="LayOutSettingStore.fold ? true : false" -->
                <!-- 菜单组件-->
                <el-menu :collapse="LayOutSettingStore.fold ? true : false" :default-active="$route.path"
                    background-color="#001529" text-color="white" active-text-color="rgb(150,124,104)">
                    <!-- 根据路由动态生成菜单 -->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <el-menu class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <!-- layout组件的顶部导航tabbar -->
            <Tabbar></Tabbar>
        </el-menu>
        <!-- 内容展示区域 -->
        <div class="layout_main" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';
import Main from './main/index.vue';
import Tabbar from './tabbar/index.vue';
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user';
//获取layout配置相关的仓库
import useLayOutSettingStore from '@/store/modules/setting';

let LayOutSettingStore = useLayOutSettingStore();
let userStore = useUserStore();
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        color: white;
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        transition: all 0.3s;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
            padding: 0 20px;

            .el-menu {
                border-right: none;
            }

            ::v-deep .el-menu-item,
            ::v-deep .el-sub-menu__title {
                height: 2rem;
                border-radius: 9px;
                margin-top: 10px;
                font-size: 16px;
            }

            ::v-deep .el-sub-menu__title {
                background-image: url("@/assets/images/一级菜单图标.png");
                background-size: 1rem;
                background-position: 1.1rem center;
                background-repeat: no-repeat;
                padding-left: 2.8rem;

            }

            ::v-deep .el-menu-item:hover,
            ::v-deep .el-sub-menu__title:hover {
                background-color: rgb(245, 245, 245);
                color: rgb(150, 124, 104);
            }
        }

        &.fold {
            width: $base-menu-min-width ;
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0px;
        left: $base-menu-width;
        transition: all 0.3s;
        border-bottom: 1px solid $top-buttom-boder;

        &.fold {
            width: calc(100vw - $base-menu-min-width );
            left: $base-menu-min-width;
        }
    }

    .layout_main {
        position: absolute;
        top: $base-tabbar-height;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width );
            left: $base-menu-min-width;
        }
    }
}
</style>