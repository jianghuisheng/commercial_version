<template>
    <view>
        <view style="font-size: 13px;color: #999999;padding: 10px">
            提示: 足迹最多保存100个宝贝，如果超出100个宝贝，如果此时浏览了新的宝贝，最末尾的宝贝将会自动删除
        </view>
        <view class="index-content">
            <view class="index-coupon has-bg-white has-pd-10 top_30">
                <view class="goods-list" v-if="couponlist.length > 0">
                    <orange-goods-list
                            v-for="(item,index) in couponlist"
                            :itemid="item.itemid"
                            :itempic="item.itempic+'_310x310.jpg'"
                            :tkmoney='"赚 ￥"+item.tkmoney'
                            :itemtitle="item.itemtitle"
                            :itemprice='"在售价 ¥"+item.itemprice'
                            :itemsale='item.itemsale'
                            :itemendprice="item.itemendprice"
                            :couponmoney="item.couponmoney"
                    ></orange-goods-list>
                </view>
            </view>
            <!-- 悬浮上拉 -->
            <view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '','']"
                  style="bottom: 56px;">
                <text class="iconfont icon-shangla"></text>
            </view>
            <!-- 空白页 -->
            <empty v-if="couponlist.length === 0" des="你还没有足迹，快去逛逛吧"></empty>
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
                couponlist: [],
                loadingType: 0,
                scrollTop: false,
                footprintKey: 'orange-sqx-footprint',

            }
        },
        onLoad: function (e) {
            this.$queue.get(this.footprintKey).forEach(d => {
                d.tkmoney = (d.tkmoney / 2).toFixed(2);
                d.itemsale = d.itemsale > 10000 ? (d.itemsale / 10000).toFixed(1) + "万" : d.itemsale;
                this.couponlist.push(d);
            })
        },
        onPullDownRefresh: function () {
            this.couponlist = this.$queue.get(this.footprintKey);
            uni.stopPullDownRefresh(); // 停止刷新
        },
        methods: {
            remove() {
                this.$queue.remove(this.footprintKey);
                this.couponlist = this.$queue.get(this.footprintKey);
            },
            topScrollTap: function () {
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 300
                });
            },
            onPageScroll: function (e) {
                this.scrollTop = e.scrollTop > 200;
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
        },

    }
</script>

<style>
    @import "../../static/css/index.css";
</style>
