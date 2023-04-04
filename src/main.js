import { createApp } from 'vue'
import './css/common.css'
import App from './App.vue'
import router from './router/index'
import * as echarts from 'echarts'

import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(ElementUI)
app.config.globalProperties.$echarts = echarts

app.mount('#app')
