import {createRouter, createWebHistory} from "vue-router";
import VideoData from "@/views/VideoData.vue";
import Manage from "@/views/Manage.vue";
import Home from "@/views/Home.vue";

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
            },{
               path: "/Home",
                name: "Home",
                component: Home
            }
            ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;