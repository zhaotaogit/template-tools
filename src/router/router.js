import {createRouter, createWebHistory} from "vue-router";
import VideoData from "@/components/VideoData/VideoData.vue";
import Manage from "@/components/Manage/Manage.vue";

const routes = [
    {
        path: "/",
        component: Manage,
        name:'首页',
        redirect: "/VideoData",
        children: [
            {
                path: "/VideoData",
                name: "VideoData",
                component: VideoData
            }]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;