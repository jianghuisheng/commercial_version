<template>
    <view class="s-page-wrapper">
        <view class="search-pop">
            <view class="main-title">
                <view class="search-tab">
                    <view
                            class="my-sub-src"
                            @tap="switchTab(1)"
                            v-bind:class="[current === 1 ? 'cur' : '', '']"
                    >
                        全网超级搜
                    </view>
                    <view class="search">
                        <input
                                type="text"
                                :value="keywords"
                                @confirm="submitSearch"
                                :placeholder="placeholder"
                                class="search_area"
                                @input="searchInput"
                        />
                        <view class="search_submit" @tap="submitSearch">搜 索</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="search-cat">
            <view v-if="recentKeyword.length>0">
                <view class="search-cat-tit" @tap="deleteKeyword">
                    <text class="up-menu" style="font-size: 16px" @tap="deleteKeyword">搜索历史
                        <text style="font-size: 14px;margin-left: 70%" @tap="deleteKeyword">清空</text>
                    </text>
                </view>
                <view class="src-content">
                    <view class="main-src">
                        <view
                                class="src-item "
                                v-for="(key, index) in recentKeyword"
                                @click="addKeyword(key.keyword)"
                        >
                            {{ key.keyword }}
                        </view>
                    </view>
                </view>
            </view>

        </view>

        <view class="search-cat">
            <view class="search-cat-tit" v-if="keywordlist.length>0">
                <text class="up-menu" style="font-size: 16px">热门搜索</text>
            </view>
            <view class="src-content">
                <view class="main-src">
                    <view
                            class="src-item "
                            v-for="(key, index) in keywordlist"
                            :key="index"
                            @click="addKeywords(index)"
                    >
                        {{ key.keyword }}
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        onShareAppMessage(res) {
            return {
                title: '购物先领券，一年省一半',
                path: '/pages/index/index'
            }
        },
        data() {
            return {
                placeholder: '输入关键字或粘贴宝贝标题',
                keywords: '',
                keywordlist: [],
                recentKeyword: [],
                localKeyword: 'orange-tyh-keyword',
                current: 0
            };
        },
        onShow() {
            this.recentKeyword = this.$queue.get(this.localKeyword);
        },
        onLoad() {
            this.$Request.get("/hot_key/apikey/maxd").then(res => {
                if (res.code === 1) {
                    this.keywordlist = [];
                    for (let i = 0; i < res.data.length; i++) {
                        this.keywordlist.push(res.data[i]);
                        if (i === 18) {
                            break;
                        }
                    }
                } else {
                    this.loadingType = 2;
                }
            });
            let userId = this.$queue.getData("userId");
            if (!userId) {
                this.$Request.getT("/user/" + userId).then(res => {
                    if (res.status === 0) {
                        this.$queue.setData("openid", res.data.openId);
                        this.$queue.setData("image_url", res.data.image_url);
                        this.$queue.setData("mobile", res.data.phone);
                        this.$queue.setData("nickName", res.data.nickName);
                        this.$queue.setData("relation_id", res.data.relationId);
                        this.$queue.setData("gender", parseInt(res.data.gender));
                    }
                });
            }
        },
        methods: {
            clearInput() {
                this.keywords = '';
            },
            navigateBack: function () {
                uni.navigateBack();
            },
            searchInput: function (e) {
                this.keywords = e.detail.value;
            },
            deleteKeyword() { //清空最近搜索的关键词
                this.recentKeyword = [];
                this.$queue.remove(this.localKeyword);
            },

            submitSearch: function () {
               if (this.$queue.getSearchKeys(this.keywords)) {
                   uni.showToast({
                       title: "输入内容带有非法关键字请重新输入",
                       mask: false,
                       duration: 1500,
                       icon: "none"
                   });
                   this.keywords = '';
               } else {
                   this.$queue.insert({
                       key: this.localKeyword,
                       value: {
                           keyword: this.keywords
                       },
                       capacityNum: 20, //队列容量
                   });
                   uni.navigateTo({
                       url: '/pages/search/search?keywords=' + this.keywords
                   });
               }
            },
            swiperChange: function (e) {
                this.current = e.detail.current;
            },
            switchTab: function (current) {
                this.current = current;
            },
            addKeywords(current) {
                this.keywords = this.keywordlist[current].keyword;
                // //#ifdef APP-PLUS
                // plus.key.hideKeyboard();
                // //#endif
                uni.navigateTo({
                    url: '/pages/search/search?keywords=' + this.keywords
                });
            },
            addKeyword(keywords) {
                this.keywords = keywords;
                uni.navigateTo({
                    url: '/pages/search/search?keywords=' + this.keywords
                });
            }
        }
    };
</script>

<style>
    .swiper {
        height: 100%;
    }

    .help-tips {
        font-size: 13px;
        color: #999;
        line-height: 26px;
        padding: 0 0 0 30px;
        margin: 0;
        width: 80%;
        text-align: left;
    }

    .help-tips.color999 {
        color: #999999;
    }

    .search-default {
        text-align: center;
        height: 150px;
        margin: auto;
    }

    .search-default image {
        display: block;
        margin: auto;
        width: 80%;
    }

    .search-cat {
        position: fixed;
        top: 0;
        bottom: 0;
        padding-top: 130px;
        width: 100%;
        height: 100%;
        padding-bottom: 11px;
        background-color: #fff;
    }

    .search-cat .search-cat-tit {
        position: relative;
        height: 10px;
        margin: 13px 3% 20px;
    }

    .search-cat .search-cat-tit .up-menu {
        display: block;
        height: 20px;
        line-height: 20px;
        font-size: 0.9em;
        color: #999;
    }

    .src-content {
        margin: 20px 0 30px;
        width: 97%;
    }

    .main-src .src-item {
        float: left;
        border-radius: 22px;
        padding: 0 10px;
        height: 23px;
        line-height: 23px;
        background-color: #f6f6f6;
        margin: 10px;
        position: relative;
        font-size: 13px;
        color: #333;
    }

    .main-title {
        height: 130px;
    }

    .main-title {
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

    .clear {
        color: crimson;
        width: 23px;
        height: 22px;
        position: relative;
        z-index: 100;
        background: white;
    }

    .clears {
        float: right;
        color: crimson;
        margin-left: 8px;
        z-index: 100;
    }

    .uni-input-input, .uni-input-placeholder {
        width: 93%;
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
        margin-top: 15px;
    }

    .main-title .search-tab .close-src .iconfont {
        font-size: 20px;
    }

    .main-title .search {
        background-color: #fff;
        border-radius: 20px;
        width: 78%;
        margin-left: 12%;
        position: relative;
        padding: 0 9px;
        height: 32px;
        line-height: 32px;
        font-size: 13px;
        margin-top: 10px;
    }

    .uni-input-wrapper {
        width: 87% !important;
    }

    .search_submit {
        width: 25%;
        height: 32px;
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

    .main-title .search input {
        border: none;
        outline: 0;
        height: 64upx;
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
