<template>
    <view class="index-content">
        <view class="search-pop">
            <view class="main-title">
                <view class="search-tab">
                    <view class="search">
                        <input
                                type="text"
                                :value="keywords"
                                :placeholder="placeholder"
                                class="search_area"
                                @input="searchInput"
                                @confirm="submitSearch"
                        />
                        <view class="search_submit" @tap="submitSearch">搜 索</view>
                    </view>
                </view>
            </view>
        </view>
        <!--  #ifdef APP-PLUS -->
        <scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft"
                     style="position: fixed;z-index: 100;text-align: center;width: 100%;margin-top: 38px;border-bottom: 1px solid ghostwhite">
            <view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in tab"
                  @tap="tabSelect" :data-id="index">
                <text :style="index==TabCur?'background: #e10a07;color: white;padding: 2px 10px 2px 10px;border-radius: 16px;margin-right: -10px':'background: #ffffff;color: #333333;margin-right: -10px'">
                    {{item.name}}
                </text>

            </view>
        </scroll-view>
        <!--  #endif -->
        <!--  #ifndef APP-PLUS -->
        <scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft"
                     style="position: fixed;z-index: 100;text-align: center;width: 100%;margin-top: 6px">
            <view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in tab"
                  @tap="tabSelect" :data-id="index">
                <text :style="index==TabCur?'background: #e10a07;color: white;padding: 2px 10px 2px 10px;border-radius: 16px;margin-right: -10px':'background: #ffffff;color: #333333;margin-right: -10px'">
                    {{item.name}}
                </text>
            </view>
        </scroll-view>
        <!--  #endif -->
        <!-- 领券直播 -->
        <!--  #ifdef APP-PLUS -->
        <view class="index-coupon has-bg-white has-pd-10 top_30">
            <view class="goods-list" v-if="couponlist.length > 0" style="padding-top: 76px">
                <orange-goods-card-home
                        v-for="(item,index) in couponlist"
                        :index="index%2"
                        :tkmoney='item.tkmoney'
                        :itemid="item.itemid"
                        :itempic="item.itempic?item.itempic+'_310x310.jpg':'https://www.gomyorder.cn/logo.png'"
                        :itemtitle="item.itemtitle"
                        :itemprice='"¥"+item.itemprice'
                        :itemsale='item.itemsale'
                        :itemendprice='""+item.itemendprice'
                        :couponmoney="item.couponmoney"
                ></orange-goods-card-home>
            </view>
        </view>
        <!--  #endif -->
        <!--  #ifndef APP-PLUS -->
        <view class="index-coupon has-bg-white has-pd-10 top_30">
            <view class="goods-list" v-if="couponlist.length > 0" style="padding-top: 46px">
                <orange-goods-card-home
                        v-for="(item,index) in couponlist"
                        :index="index%2"
                        :tkmoney='item.tkmoney'
                        :itemid="item.itemid"
                        :itempic="item.itempic?item.itempic+'_310x310.jpg':'https://www.gomyorder.cn/logo.png'"
                        :itemtitle="item.itemtitle"
                        :itemprice='"¥"+item.itemprice'
                        :itemsale='item.itemsale'
                        :itemendprice='""+item.itemendprice'
                        :couponmoney="item.couponmoney"
                ></orange-goods-card-home>
            </view>
        </view>
        <!--  #endif -->
        <!-- 领券直播 -->

        <!-- 加载更多提示 -->
        <view class="s-col is-col-24" v-if="couponlist.length > 0">
            <load-more :loadingType="loadingType" :contentText="contentText"></load-more>
        </view>
        <!-- 加载更多提示 -->
        <!-- 悬浮上拉 -->
        <view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '','']"
              style="bottom: 56px;">
            <text class="iconfont icon-shangla"></text>
        </view>
        <empty v-if="couponlist.length === 0" des="没有搜索到数据 换个搜索条件试试" show="false"></empty>
    </view>
</template>

<script>
    export default {
        onShareAppMessage(res) {
            return {
                title: '购物先领券，一年省一半',
                path: '/pages/index/index'
            }
        }, data() {
            return {
                recentKeyword: [],
                tab: [
                    {name: '热销', position: 2, total: 0, data: []},
                    {name: '综合', position: 0, total: 0, data: []},
                    {name: '最新', position: 1, total: 0, data: []},
                    {name: '价格', position: 4, total: 0, data: []},
                ],
                TabCur: 0,
                scrollLeft: 0,
                scrollTop: false,
                placeholder: "输入关键字或粘贴宝贝标题",
                couponlist: [
					{
						tkmoney: 'tkmoney',
						itemid: 123,
						itemtitle: '标题',
						itemprice: 99,
						itemsale: 'sale',
						itemendprice: 65,
						couponmoney: 50
					},
				],
                page: 1,
                localKeyword: 'orange-tyh-keyword',
                min_id: 1,
                sort: 2,
                tb_p: 1,
                keywords: "",
                loadingType: 0,
                contentText: {
                    contentdown: "上拉显示更多",
                    contentrefresh: "正在加载...",
                    contentnomore: "没有更多数据了"
                }
            }
        },
        onLoad: function (e) {
            uni.showLoading({
                title: '加载中...'
            });
            this.keywords = e.keywords;
            this.loadCouponList();
        },
        onPageScroll: function (e) {
            this.scrollTop = e.scrollTop > 200;
        },
        methods: {
            clearInput() {
                this.keywords = '';
            },
            tabSelect(e) {
                this.TabCur = e.currentTarget.dataset.id;
                this.sort = this.tab[e.currentTarget.dataset.id].position;
                this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
                this.page = 1;
                this.min_id = 1;
                this.tb_p = 1;
                uni.showLoading({
                    title: '加载中...'
                });
                this.loadCouponList("Refresh");
                //#ifdef H5
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 300
                });
                //#endif
            },
            topScrollTap: function () {
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 300
                });
            },

            deleteKeyword() { //清空最近搜索的关键词
                this.recentKeyword = [];
                this.$queue.remove(this.localKeyword);
            },

            loadCouponList: function (type) {
                this.loadingType = 1;
                this.$Request.get('/supersearch/apikey/maxd/keyword/' + this.keywords + '/back/20/sort/' + this.sort + '/min_id/' + this.min_id + '/is_coupon/1/tb_p/' + this.tb_p).then(res => {
                    this.loadingType = 0;
                    if (res.code === 1) {
                        if (this.page === 1) {
                            this.couponlist = [];
                        }
                        this.min_id = res.min_id;
                        this.tb_p = res.tb_p;
                        res.data.forEach(d => {
                            d.tkmoney = ((d.itemendprice * (d.tkrates * 0.01)) / 2).toFixed(2);
                            d.itemsale = d.itemsale > 10000 ? "已售 " + (d.itemsale / 10000).toFixed(1) + "万" : "已售 " + d.itemsale;
                            this.couponlist.push(d);
                        })
                    } else {
                        this.loadingType = 2;
                    }
                    uni.hideLoading();

                    if (type === "Refresh") {
                        uni.stopPullDownRefresh(); // 停止刷新
                    }
                })
            },
            navigateBack: function () {
                uni.navigateBack();
            },
            toGoodsInfo: function (itemid) {
                let relation_id = this.$queue.getData("relation_id");
                if (relation_id) {
                    uni.navigateTo({
                        url: "/pages/detail/goodsinfo?itemid=" + itemid + "&relation_id=" + relation_id,
                    })
                } else {
                    uni.navigateTo({
                        url: "/pages/detail/goodsinfo?itemid=" + itemid,
                    })
                }
            },
            searchInput: function (e) {

                this.keywords = e.detail.value;

            },
            submitSearch: function () {
                let keywords = this.$queue.get(this.localKeyword);
                if (JSON.stringify(keywords).indexOf(this.keywords) === -1) {
                    this.$queue.insert({
                        key: this.localKeyword,
                        value: {
                            keyword: this.keywords
                        },
                        capacityNum: 20, //队列容量
                    });
                }
                uni.showLoading({
                    title: '加载中...'
                });
                if (this.$queue.getSearchKeys(this.keywords)) {
                    uni.showToast({
                        title: "输入内容带有非法关键字请重新输入",
                        mask: false,
                        duration: 1500,
                        icon: "none"
                    });
                    this.keywords = '';
                } else {
                    this.page = 1;
                    this.min_id = 1;
                    this.tb_p = 1;
                    this.loadCouponList("Refresh");
                    this.topScrollTap();
                }

            },

        },
        onReady: function () {
            this.loadCouponList();
        }
        ,
        onReachBottom: function () {
            this.page = this.page + 1;
            this.loadCouponList();
        }
        ,
        onPullDownRefresh: function () {
            this.page = 1;
            this.min_id = 1;
            this.tb_p = 1;
            this.loadCouponList("Refresh");
        }
    }
</script>

<style>
    @import "../../static/css/index.css";

    .top_30 {
        margin-top: 60px;
    }

    .search-default image {
        display: block;
        margin: auto;
        width: 80%;
    }


    .main-title {
        /*background: -moz-linear-gradient(left, #fa4dbe 0, #fbaa58 100%);*/
        /*background: -webkit-gradient(*/
        /*        linear,*/
        /*        left top,*/
        /*        left right,*/
        /*        color-stop(0, #fa4dbe),*/
        /*        color-stop(100%, #fbaa58)*/
        /*);*/
        /*background: -webkit-linear-gradient(left, #fa4dbe 0, #fbaa58 100%);*/
        /*background: -o-linear-gradient(left, #fa4dbe 0, #fbaa58 100%);*/
        /*background: -ms-linear-gradient(left, #fa4dbe 0, #fbaa58 100%);*/
        /*background: linear-gradient(to left, #fa4dbe 0, #fbaa58 100%);*/
        /*background: -moz-linear-gradient(left, #e10a07, #FF6DB2 100%);*/
        /*background: -webkit-gradient(linear, left top, left right, color-stop(0, #e10a07), color-stop(100%, #FF6DB2));*/
        /*background: -webkit-linear-gradient(left, #e10a07 0, #FF6DB2 100%);*/
        /*background: -o-linear-gradient(left, #e10a07 0, #FF6DB2 100%);*/
        /*background: -ms-linear-gradient(left, #e10a07 0, #FF6DB2 100%);*/
        /*background: linear-gradient(to left, #e10a07 0, #FF6DB2 100%);*/
        background: #e10a07;
        border-bottom-color: transparent;
        padding: 8px 10px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 120;
        display: block;
        box-sizing: border-box;
    }

    .search-pop .search-tab {
        margin: 5px 0 10px;
        color: #fff;
        font-size: 15px;
        text-align: center;
        /* #ifdef APP-PLUS */
        padding-top: var(--status-bar-height);
        /* #endif */
    }

    .search-pop .search-tab .my-sub-src {
        margin: 0 auto 0 20px;
        display: inline-block;
        color: #fff;
        line-height: 30px;
        margin-bottom: 10px !important;
    }

    .search-pop .search-tab .my-sub-src:nth-child(1) {
        margin-left: 0px !important;
    }

    .main-title .search-tab .cur {
        opacity: 1;
        border-bottom: 1px solid #fff;
    }

    .main-title .search-tab .close-src {
        position: absolute;
        left: 20px;
        display: block;
        float: left;
        color: #ffffff;
        margin-top: 5px;
    }

    .main-title .search-tab .close-src .iconfont {
        font-size: 20px;
    }

    .uni-input-input, .uni-input-placeholder {
        width: 93%;
    }

    .main-title .search {
        background-color: #fff;
        border-radius: 20px;
        width: 76%;
        margin-left: 12%;
        position: relative;
        padding: 0 9px;
        height: 32px;
        line-height: 32px;
        font-size: 13px;
        margin-top: 10px;
    }

    .search_submit {
        width: 25%;
        height: 64upx;
        background: #ffb925;
        color: #fff;
        float: right;
        position: relative;
        border-radius: 15px;
        margin-right: -20px;
		/* #ifndef MP-ALIPAY */
		margin-top: -64upx;
		/* #endif */
        z-index: 30;
    }

    .clear {
        float: right;
        color: crimson;
        width: 23px;
        height: 22px;
        margin-top: -31px;
        position: relative;
        margin-right: 50px;
        z-index: 100;
        background: white;
    }

    .main-title .search input {
        border: none;
        outline: 0;
        height: 32px;
        font-size: 13px;
        line-height: 30px;
        background: #fff;
        color: #666;
        border-radius: 5px;
        padding: 0 0 0 5px;
        text-align: left;
    }

    .main-title .search input.search_area {
        background-color: transparent;
        position: relative;
        z-index: 99;
        width: 80%;
        color: #333;
        font-size: 12px;
    }
</style>
