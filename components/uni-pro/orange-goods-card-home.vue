<template>
    <view>
        <view @click="open(itemid)" class="itemInfo1">
            <view style="position: relative">
                <image :src="itempic" style="border-radius: 5px;width: 100%;height: 200px"></image>
            </view>
            <view>
                <view style="display: flex">
                    <image v-if="logo!=null"
                           style="margin-left:4px;height: 12px;width: 5%;margin-top: 4px;margin-right: 2px"
                           :src="logo"></image>
                    <view class="twolist-hidden"
                          style="height: 70upx;font-size: 28upx;margin-right: 4upx;margin-left: 4upx;width: 95%;max-lines:2;overflow: hidden">
                        {{ itemtitle }}
                    </view>
                </view>
                <view style="margin-bottom: 4px;margin-top:4px;font-size: 12px;color: grey;display: flex">
                    <view style="width: 50%;text-align: center;text-decoration: line-through">天猫价{{ itemprice }}</view>
                    <view style="width: 50%;text-align: center; text-overflow: ellipsis;overflow: hidden">{{ itemsale}}
                    </view>
                </view>
                <view style="display: flex;margin-bottom: 16upx;">
                    <view style="margin-bottom: 4px;margin-left: 20px;font-size: 16px;color:rgb(255, 86, 58);padding-top: 2px;width: 40%;text-align: left;">
                        <text style="font-size: 10px;margin-right: 2px">¥</text>
                        <text style="text-align: left;font-weight: bold">{{ itemendprice }}</text>
                    </view>
                    <view style="width: 60%;text-align: center;margin-bottom: 4px;margin-left: 8px">
                        <view style="width: 80%;font-size: 12px;padding-top:4px;text-align: center;background-image: url(../../static/img/home/youhuiquan.png);background-repeat: round;height: 22px;color: white;padding-left: 8px;padding-right: 8px">
                            {{couponmoney}}元券
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        name: "orange-goods-card",
        props: [
            "itempic", "itemtitle", "itemprice", "itemsale", "itemendprice", "couponmoney", "itemid", "logo", "index", "tkmoney"
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


    .itemInfo1 {
        float: left;
        width: 49%;
        border-radius: 10px;
        background-color: #fff;
        margin-top: 8px;
        margin-right: 3px;
    }

    .quan {
        z-index: 1;
        zoom: 1;
        top: 0;
        overflow: hidden;
        float: right;
        background: -moz-linear-gradient(left, #e10a07 0, #FF927C 100%);
        background: -webkit-gradient(linear, left top, left right, color-stop(0, #e10a07), color-stop(100%, #FF927C));
        background: -webkit-linear-gradient(left, #e10a07 0, #FF927C 100%);
        background: -o-linear-gradient(left, #e10a07 0, #FF927C 100%);
        background: -ms-linear-gradient(left, #e10a07 0, #FF927C 100%);
        background: linear-gradient(to left, #e10a07 0, #FF927C 100%);
        position: relative;
        font-style: normal;
        display: block;
        border-radius: 3px;
        -moz-border-radius: 3px;
        -webkit-border-radius: 3px;
        -o-border-radius: 3px;
        -ms-border-radius: 3px;
        font-size: 14px;
        margin-left: 10px;
        min-width: 20px;
        text-align: center;
        padding: 1px 10px;
        margin-bottom: 4px;
        color: #fff;
    }

    .quan:before {
        position: absolute;
        z-index: 1;
        zoom: 1;
        top: 50%;
        margin-top: -3px;
        background: #fff;
        display: block;
        width: 5px;
        height: 5px;
        content: "";
        border-radius: 10px;
        border: 1px solid #fff;
        left: auto;
        right: -4px;
    }

    .quan:after {
        position: absolute;
        z-index: 1;
        zoom: 1;
        top: 50%;
        margin-top: -3px;
        background: #fff;
        display: block;
        width: 5px;
        height: 5px;
        content: "";
        border-radius: 10px;
        border: 1px solid #fff;
        left: -4px;
    }

    .twolist-hidden {
        max-height: 40px;
        color: #333;
        font-weight: 400;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
