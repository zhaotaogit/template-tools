import {createRouter, createWebHistory} from "vue-router";
import Manage from "@/views/Manage.vue";
import Home from "@/views/Home.vue";

const routes = [
    {
        path: "/",
        component: Manage,
        name: '首页',
        redirect: "/TemplateLayerTool",
        children: [
            {
                path: "/Home",
                name: "Home",
                component: Home
            },
            {
                path: "/TemplateLayerTool",
                name: "TemplateLayerTool",
                component: () => import("@/views/TemplateLayerTool.vue")
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;