<template>

    <view class="coupon-page s-row"
          @tap="open(itemid)"
          style="border-bottom: 1px solid ghostwhite">
        <view class="image">
            <image :src="itempic"></image>
        </view>
        <view class="content">
            <view style="display: flex">
                <image v-if="logo!=null"
                       style="margin-left:4px;height: 12px;width: 5%;margin-top: 4px;margin-right: 2px"
                       :src="logo"></image>
                <view class="twolist-hidden"
                      style="height: 40px;font-size: 14px;margin-right: 2px;margin-left: 2px;width: 95%;max-lines:2;overflow: hidden">
                    {{ itemtitle }}
                </view>
            </view>
            <view class="num s-row">
                <text class="tmprice">{{itemprice}}</text>
                <text class="volume">{{itemsale}}人付款</text>
            </view>
            <view class="money s-row" style="display: flex;width: 100%;">
                <view class="coupon-price" style="width: 50%">券后价
                    <text style="font-size: 12px">¥<text style="font-weight: bold">{{itemendprice}}</text></text>
                </view>
               <view style="width: 50%;font-size: 12px;padding-top:4px;text-align: center;background-image: url(../../static/img/home/youhuiquan.png);background-repeat: round;height: 22px;color: white;padding-left: 8px;padding-right: 8px">
                   {{couponmoney}}元券
               </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "orange-goods-list",
        props: [
            "itempic", "itemtitle", "itemprice", "itemsale", "itemendprice", "couponmoney", "itemid", "logo","tkmoney"
        ],
        methods: {
            open(itemid) {
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
        }
    }
</script>

<style>
    @import "../../static/css/index.css";
</style>
