import Vue from 'vue'
import App from './App'
import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import queue from './common/queue'
import loadMore from './components/uni-pro/load-more'
import orangeGoodsList from './components/uni-pro/orange-goods-list'
import orangeGoodsCarg from './components/uni-pro/orange-goods-card'
import orangeHandpick from './components/uni-pro/orange-handpick'
import orangeNews from './components/uni-pro/orange-news'

import orangeGoodsCargHome from './components/uni-pro/orange-goods-card-home'
import empty from './components/empty'



Vue.config.productionTip = false;
Vue.prototype.$Request = HttpRequest;
Vue.prototype.$queue = queue;


import 'js_sdk/ican-H5Api/ican-H5Api'
Vue.prototype.$Sysconf = HttpRequest.config;
Vue.prototype.$SysCache = HttpCache;

App.mpType = 'app';

Vue.component('orange-news', orangeNews);
Vue.component('orange-handpick', orangeHandpick);

Vue.component('load-more', loadMore);

Vue.component('empty', empty);
Vue.component('orange-goods-list', orangeGoodsList);
Vue.component('orange-goods-card', orangeGoodsCarg);
Vue.component('orange-goods-card-home', orangeGoodsCargHome);


const app = new Vue({
    ...App
});
app.$mount();
