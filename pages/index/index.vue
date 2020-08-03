<template>
	<view class="index-content" style="background: white">
		<view class="index-header" style="top: 0;">
			<view class="icon_header">
				<view class="icon-gender" @tap="showGender">
					<image v-if="gender===1" src="../../static/img/home/boy.png" style="width: 30px;height: 30px;margin-top: 8px"></image>
					<image v-else-if="gender===2" src="../../static/img/home/girl.png" style="width: 30px;height: 30px;margin-top: 8px"></image>
					<image v-else src="../../static/img/common/logo.jpg" style="width: 30px;height: 30px;margin-top: 8px"></image>
				</view>
				<view class="index-search" @tap="toSearchIndex" style="margin-left: 70px;margin-right: 60px">
					<view class="icon_search" style="text-align: left">
						<text class="cuIcon cuIcon-search" style="margin-right: 6px"></text>
						<text>输入关键字或粘贴宝贝标题</text>
					</view>
				</view>
				<view class="icon_suji" @tap="toZujiIndex" style="margin-right: 10px;margin-top: 2px">
					<text class="iconfont icon-zuji" style="color:#dcdcdc;font-size: 24px"></text>
				</view>
			</view>
		</view>

		<view class="swiper" style="padding-top: 86upx;background: white" v-if="banners.length>0">
			<swiper class="swiper-container" :autoplay="true" :interval="4000" :circular="true" :indicator-dots="true"
			 indicator-active-color="#e10a07" indicator-color="#cccccc" style="height: 480upx;padding: 18upx 16upx 8upx 16upx">
				<block v-for="(item, index3) in banners" :key="index3">
					<swiper-item class="swiper-wrapper">
						<image @tap="toGoodsInfos(item.itemid)" :src="item.itempic" style="width: 100%;height: 460upx" mode="scaleToFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<view style="background: white">
			<view class="index-navlist s-grids" v-if="couponlist.length > 0" style="padding-top: 10px;padding-bottom: 10px;background: white">
				<view class="is-col-1-5 is-center" v-for="(nav,index) in navlist" :key="index" @tap="toNavList(nav.url,nav.title)">
					<view class="has-pdtb-5">
						<image :src="nav.image" mode="widthFix" style="height: 45px;width: 45px"></image>
						<view v-if="nav.url=='13'" style="margin-top: 2px;color: red;font-weight: bold" class="is-size-14">
							{{nav['title']}}
						</view>
						<view v-else style="margin-top: 2px" class="is-size-14">{{nav['title']}}</view>
					</view>
				</view>
			</view>
		</view>
		<view style="display: flex;padding: 4px 10px 8px 10px" v-if="couponlist.length > 0">
			<view style="width:48%;height:120px;background:rgba(248,248,250,1);border-radius:6px;" @tap="toNavList('meishi','爆款美食')">
				<view style="margin:7px;color: #e10a07;font-size: 16px;font-weight: bold">
					爆款美食
					<text style="font-size: 14px;margin-left: 6px;background:#e10a07;border-radius:4px;color: white;padding: 2px">
						网红美食
					</text>
				</view>
				<view style="color:rgba(127,134,153,1);font-weight: 400;margin-left: 8px">刷新超低折扣价</view>
				<view style="height: 100px;text-align: center;width: 100%">
					<image src="../../static/img/home/suiguo.png" style="height: 60px;width: 90px"></image>
				</view>
			</view>
			<view style="margin-left: 16px;width:48%;height:120px;background:rgba(248,248,250,1);border-radius:6px;" @tap="toNavList(1,'每日上新')">
				<view style="margin:7px;color: #e10a07;font-size: 16px;font-weight: bold;">
					每日上新
					<text style="font-size: 14px;margin-left: 6px;background:#e10a07;border-radius:4px;color: white;padding: 2px">
						售完为止
					</text>
				</view>
				<view style="color:rgba(127,134,153,1);font-weight: 400;margin-left: 8px">热卖好货数量有限</view>
				<view style="height: 100px;text-align: center;width: 100%;margin-top: 10px;display: flex">
					<image src="../../static/img/home/tupian.png" style="height: 40px;width: 60px;margin-left: 16px;margin-right: 16px"></image>
					<image src="../../static/img/home/tupian3.png" style="height: 40px;width: 60px"></image>
				</view>
			</view>
		</view>
		<view style="display: flex;padding: 4px 10px 8px 10px" v-if="couponlist.length > 0">
			<view style="width:48%;height:60px;background:rgba(248,248,250,1);border-radius:6px;display: flex" @tap="toNavList(4,'巨划算')">
				<view>
					<view style="margin:7px;color: #e10a07;font-size: 16px;font-weight: bold;">
						巨划算
					</view>
					<view style="color:rgba(127,134,153,1);font-weight: 400;margin-left: 8px">保湿爽肤控油</view>
				</view>
				<image src="../../static/img/home/tupian1.png" style="border-radius: 8px;height: 40px;width: 40px;margin-top: 10px;margin-left: 22px"></image>
			</view>
			<view style="width:48%;height:60px;background:rgba(248,248,250,1);border-radius:6px;margin-left: 16px;display: flex"
			 @tap="toNavList(2,'9.9包邮')">
				<view>
					<view style="margin:7px;color: #e10a07;font-size: 16px;font-weight: bold">
						9.9包邮
					</view>
					<view style="color:rgba(127,134,153,1);font-weight: 400;margin-left: 8px">去细纹黑眼圈</view>
				</view>
				<image src="../../static/img/home/tupian2.png" style="border-radius: 8px;height: 40px;width: 40px;margin-top: 10px;margin-left: 22px"></image>
			</view>
		</view>
		<view style="display: flex;padding: 4px 10px 8px 10px" v-if="couponlist.length > 0">
			<view style="width:48%;height:60px;background:rgba(248,248,250,1);border-radius:6px;display: flex" @tap="toNavList(5,'嗨抢购')">
				<view>
					<view style="margin:7px;color: #e10a07;font-size: 16px;font-weight: bold;">
						嗨抢购
					</view>
					<view style="color:rgba(127,134,153,1);font-weight: 400;margin-left: 8px">亮肤清洁毛孔</view>
				</view>
				<image src="../../static/img/home/wanggong1.png" style="border-radius: 8px;height: 38px;width: 38px;margin-top: 10px;margin-left: 26px"></image>
			</view>
			<view style="width:48%;height:60px;background:rgba(248,248,250,1);border-radius:6px;margin-left: 16px;display: flex"
			 @tap="toNavList(3,'30元封顶')">
				<view>
					<view style="margin:7px;color: #e10a07;font-size: 16px;font-weight: bold">
						30元封顶
					</view>
					<view style="color:rgba(127,134,153,1);font-weight: 400;margin-left: 8px">潮男潮女必逛</view>
				</view>
				<image src="../../static/img/home/tupian4.png" style="border-radius: 8px;height: 38px;width: 38px;margin-top: 10px;margin-left: 24px"></image>
			</view>
		</view>
		<view class="home_ant_juhuasuan has-bg-white" v-if="juhuasuanlist.length > 0&&couponlist.length > 0" style="margin: 8px 8px 8px 8px;border-radius: 10px">
			<view @tap="toNavList('22','网红抖货')">
				<text style="float: left;margin-top:10px;color: transparent;font-size: 15px;font-weight: bold;background-image: url(../../static/img/home/wanghongdouhuo.png);background-repeat: round;height: 16px">
					网红抖货
				</text>
				<text class="fr-jutext">发现更多</text>
			</view>
			<view class="s-row juhuasuan-list">
				<view class="juhuasuan-list-goods" v-for="(item,index) in juhuasuanlist" :key="index" @tap="toGoodsInfos(item.itemid)">
					<view class="image" style="margin-bottom: 8px">
						<image :src="item.itempic?item.itempic+'_310x310.jpg':'https://www.gomyorder.cn/logo.png'" mode="widthFix" style="height: 91px"></image>
						<view class="name" style="text-align: center;">
							<text class="pinname">券后￥{{item.itemendprice}}</text>
							<text class="price"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<scroll-view v-if="couponlist.length > 0" scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft" style="z-index: 100;padding-left:8px;padding-right: 8px "
			 v-bind:class="[scrollTops ? 'scroll_top_act' : '','']">
				<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in category" :key="index" @tap="tabSelect"
				 :data-id="index">
					<text :style="index==TabCur?'background: #e10a07;color: white;padding: 2px 10px 2px 10px;border-radius: 16px;margin-right: -10px':'background: transparent;color: #333333;margin-right: -10px'">
						{{item.name}}
					</text>
				</view>
			</scroll-view>
		</view>
		<simpleModal ref="simpleModalTkl" @maskClose="TklmaskClose">
			<view class="buy-box-title">选择您的身份</view>
			<view class="buy-box-center">
				<view class="code-cent" style="padding: 30px 80px 40px 80px">
					<view style="margin-bottom: 16px" @tap="choseGender(1)">
						<image src="../../static/img/home/boy.png" style="width: 50px;height: 50px"></image>
						<view style="color: #0e80d2">我是帅哥</view>
					</view>
					<view @tap="choseGender(2)">
						<image src="../../static/img/home/girl.png" style="width: 50px;height: 50px"></image>
						<view style="color: pink">我是美女</view>
					</view>
				</view>
			</view>
		</simpleModal>
		<simpleModal ref="simpleModalTkls" @maskClose="TklmaskClose">
			<view style="width: 600upx;border-radius: 16upx;">
				<view class="buy-box-title" style="font-weight: bold;color: #FF6DB2;">全网超级搜</view>
				<view class="buy-box-center">
					<view class="code-cent">
						<view style="padding: 8px;font-size: 32upx">{{ copyTklStatus }}</view>
					</view>
					<view class="buy-btn-copy" @click="goSearch()">立即搜索</view>
				</view>
			</view>
		</simpleModal>
		<!-- 领券直播 -->
		<view class="index-coupon has-pd-10" style="margin: 4px;background: #F6F6F6">
			<view class="goods-list" v-if="couponlist.length > 0">
				<orange-goods-card-home v-for="(item,index) in couponlist" :index="index%2" :logo="logo" :tkmoney='"￥"+item.tkmoney'
				 :itemid="item.itemid" :itempic="item.itempic?item.itempic+'_310x310.jpg':'https://www.gomyorder.cn/logo.png'"
				 :itemtitle="item.itemtitle" :itemprice='"¥"+item.itemprice' :itemsale="item.itemsale" :itemendprice='""+item.itemendprice'
				 :couponmoney="item.couponmoney"></orange-goods-card-home>
			</view>
		</view>
		<!-- 加载更多提示 -->
		<view class="s-col is-col-24" v-if="couponlist.length> 0">
			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		</view>
		<!-- 悬浮上拉 -->
		<view class="scroll_top" @tap="topScrollTap" v-bind:class="[scrollTop ? 'active' : '','']" style="bottom: 56px;">
			<text class="iconfont icon-shangla"></text>
		</view>
		<!-- 加载更多提示 -->
		<!-- 加载更多提示 -->
		<network v-if="couponlist.length === 0&&showEmpty" des="暂无数据"></network>
	</view>
</template>

<script>
	import simpleModal from '@/components/simple-pro/customModal.vue';

	export default {
		onShareAppMessage(res) {
			return {
				title: '购物先领券，一年省一半',
				path: '/pages/index/index'
			}
		},
		components: {
			simpleModal
		},
		onPageScroll: function(e) {
			this.scrollTop = e.scrollTop > 200;
			this.scrollTops = e.scrollTop > 720;
		},
		onShow() {
			//#ifndef H5
			this.getClipboardData();
			//#endif
		},
		data() {
			return {
				logo: "../../static/img/mao.png",
				TabCur: 0,
				copyTklStatus: '',
				scrollLeft: 0,
				scrollTop: false,
				scrollTops: false,
				showEmpty: false,
				category: [{
						name: '精选'
					},
					{
						name: '女装'
					},
					{
						name: '男装'
					},
					{
						name: '内衣'
					},
					{
						name: '美妆'
					},
					{
						name: '配饰'
					},
					{
						name: '鞋品'
					},
					{
						name: '箱包'
					},
					{
						name: '儿童'
					},
					{
						name: '母婴'
					},
					{
						name: '居家'
					},
					{
						name: '美食'
					},
					{
						name: '数码'
					},
					{
						name: '家电'
					},
					{
						name: '其他'
					},
					{
						name: '车品'
					},
					{
						name: '文体'
					},
					{
						name: '宠物'
					},
				],
				banners: [],
				navlist: [{
						title: "天猫精选",
						image: "../../static/img/home/tianmaojingxuan.png",
						url: '9'

					},

					{
						title: "今日上新",
						image: "../../static/img/home/gaoyongjingxuan.png",
						url: '1'

					},
					{
						title: "超值大牌",
						image: "../../static/img/home/chaozhidapai.png",
						url: '8'

					},
					{
						title: "聚划算",
						image: "../../static/img/home/juhuasuan.png",
						url: '4'

					}, {
						title: "热门分类",
						image: "../../static/img/home/gengduofenlie.png",
						url: 'remeng'

					}
				],

				juhuasuanlist: [],
				couponlist: [],
				dataList: [],
				page: 1,
				min_id: 1,
				min_ids: 1,
				min_ida: 1,
				cat_id: 0,
				gender: 0,
				loadingType: 0,
				index: 0,
				genderKey: "gender",
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			}
		},
		methods: {
			//app查询
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search?keywords=' + this.copyTklStatus
				});
				this.$refs.simpleModalTkls.hide();
				this.copyTklStatus = '';
				uni.setClipboardData({
					data: '',
					success: r => {
						uni.showToast({
							icon: 'none',
							title: '搜索中',
							duration: 1500
						});
					}
				});
			},
			//app查询弹框
			TklmaskClose: function(e) {
				this.$refs.simpleModalTkls.hide();
				this.copyTklStatus = '';
				uni.setClipboardData({
					data: '',
					success: r => {
						uni.showToast({
							icon: 'none',
							title: '已取消',
							duration: 1500
						});
					}
				});
			},
			TklmaskCloses: function(e) {
				this.$refs.simpleModalTkls.hide();
			},
			//获取剪切板
			async getClipboardData() {
				let that = this;
				uni.getClipboardData({
					success: function(res) {
						that.copyTklStatus = res.data;
						if (res.data) {
							if (res.data.indexOf('http') == -1 && res.data.indexOf('&') == -1 && res.data.indexOf('￥') == -1) {
								that.$refs.simpleModalTkls.show({
									showConfirmButton: false
								});
							} else {
								that.$refs.simpleModalTkls.hide();
							}
						} else {
							that.$refs.simpleModalTkls.hide();
						}
					},
					fail: function(res) {}
				});
			},
			choseGender(type) {
				this.$queue.setData(this.genderKey, type);
				this.gender = type;
				this.page = 1;
				this.min_id = 1;
				if (type === 1) {
					this.TabCur = 2;
					this.cat_id = 2;
				}
				if (type === 2) {
					this.TabCur = 1;
					this.cat_id = 1;

				}
				this.loadBanner();
				this.loadJuhuasuanlist();
				this.loadCouponList("Refresh");
				this.$refs.simpleModalTkl.hide();
			},
			showGender() {
				this.$refs.simpleModalTkl.show({
					showConfirmButton: false,
				});
			},
		
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.cat_id = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.page = 1;
				this.min_id = 1;
				uni.showLoading({
					title: '加载中...'
				});
				this.loadCouponList("Refresh");
			},
			topScrollTap: function() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},

			loadCouponList: function(type) {
				this.loadingType = 1;
				this.$Request.get("/column/apikey/maxd/type/9/back/20/min_id/" + this.min_id + "/sort/9/cid/" + this.cat_id).then(
					res => {
						this.loadingType = 0;
						if (res.code === 1) {
							if (this.page === 1) {
								this.couponlist = [];
							}
							this.min_id = res.min_id;
							res.data.forEach(d => {
								d.tkmoney = (d.tkmoney / 2).toFixed(2);
								d.itemsale = d.itemsale > 10000 ? "已售 " + (d.itemsale / 10000).toFixed(1) + "万" : "已售 " + d.itemsale;
								this.couponlist.push(d);
							});
						} else {
							this.loadingType = 2;
						}
						this.showEmpty = true;
						if (type === "Refresh") {
							uni.stopPullDownRefresh(); // 停止刷新
						}
						uni.hideLoading();
					})
			},
			loadBanner: function() {
				this.$Request.get("/column/apikey/maxd/type/2/back/5/min_id/1/sort/0/cid/" + this.cat_id).then(res => {
					if (res.code === 1) {
						this.banners = []
						res.data.forEach(d => {
							this.banners.push(d);
						});

					}
				})
			},

			loadDataList: function() {
				this.$Request.get("/get_deserve_item/apikey/maxd").then(res => {
					for (let i = this.index; i < 8; i++) {
						this.dataList.push(res.item_info[i]);
					}
				})
			},
			loadJuhuasuanlist: function() {
				this.$Request.get("/column/apikey/maxd/type/1/back/10/min_id/" + this.min_ids + "/sort/0/cid/" + this.cat_id).then(
					res => {
						if (res.code === 1) {
							this.juhuasuanlist = [];
							for (let i = this.index; i < this.index + 8; i++) {
								this.juhuasuanlist.push(res.data[i]);
							}
							this.min_ids = res.min_id;
						}
						uni.stopPullDownRefresh(); // 停止刷新
					})
			},
			toNavList: function(url, title) {
				if (url === 'remeng') {
					uni.navigateTo({
						url: "/pages/categray/index"
					})
				} else if (url === 'pinduoduo') {
					//#ifndef H5
					uni.navigateTo({
						url: "/pages/member/ping?url=https://mobile.yangkeduo.com/duo_cms_mall.html?pid=8948958_104234125&cpsSign=CM_190809_8948958_104234125_05e68780da621fd572b728c3ae1ee027&range_items=1%3A0%3A10000%2C2%3A10%3A1000&duoduo_type=2"
					});
					//#endif
					//#ifdef H5
					window.location.href =
						"https://mobile.yangkeduo.com/duo_cms_mall.html?pid=8948958_104234125&cpsSign=CM_190809_8948958_104234125_05e68780da621fd572b728c3ae1ee027&range_items=1%3A0%3A10000%2C2%3A10%3A1000&duoduo_type=2";
					//#endif
				} else if (url === 'shoucang') {
					uni.navigateTo({
						url: "/pages/footer/like",
					})
				} else if (url === 'jingdong') {
					uni.navigateTo({
						url: "/pages/jd/list",
					})
				} else if (url === 'rexiao') {
					uni.switchTab({
						url: "/pages/hot/index",
					})
				} else if (url === 'daequan') {
					uni.navigateTo({
						url: "/pages/index/dae?title=" + title + "&type=9",
					})
				} else if (url === 'meishi') {
					uni.navigateTo({
						url: "/pages/index/food?title=" + title + "&type=9",
					})
				} else if (url === 'gaoyongjingxuan') {
					uni.navigateTo({
						url: "/pages/index/double?title=" + title + "&type=9"
					})
				} else if (url == 22) {
					uni.navigateTo({
						url: "/pages/cate/index",
					})
				} else {
					uni.navigateTo({
						url: "/pages/index/list?title=" + title + "&type=" + url,
					})
				}
			},
			toGoodsInfo: function(url) {
				console.error(url)
				if (url.indexOf("/pages/") !== -1) {
					uni.navigateTo({
						url
					});
				} else {
					//#ifndef H5
					uni.navigateTo({
						url: "/pages/member/webview?url=" + url
					});
					//#endif
					//#ifdef H5
					window.location.href = url;
					//#endif
				}
			},
			toGoodsInfos: function(itemid) {
				uni.navigateTo({
					url: "/pages/detail/goodsinfo?itemid=" + itemid,
				})
			},
			toSearchIndex: function() {
				uni.switchTab({
					url: "/pages/homeSearch/index"
				})
			},
			toZujiIndex: function() {
				uni.navigateTo({
					url: "/pages/footer/index"
				})
			}
		},
		onLoad: function() {
			let gender = this.$queue.getData(this.genderKey);
			if (gender) {
				if (gender === 1) {
					this.gender = gender;
					this.cat_id = 2;
				}
				if (gender === 2) {
					this.gender = gender;
					this.cat_id = 1;
				}

			}
			uni.showLoading({
				title: '加载中...'
			});
			this.loadBanner();
			this.loadDataList();
			this.loadJuhuasuanlist();
			this.loadCouponList();
		},
		onReady: function() {
			this.loadJuhuasuanlist();
		},
		onReachBottom: function() {
			this.page = this.page + 1;
			this.loadCouponList();
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.min_id = 1;
			this.loadBanner();
			this.loadJuhuasuanlist();
			this.loadCouponList("Refresh");
		}
	}
</script>

<style>
	@import "../../static/css/index.css";


	.swiper-item img {
		display: block;
	}


	.title .fr {
		float: right;
		line-height: 50px;
		margin-right: 16px;
		font-size: 10px;
		color: #ccc;
	}

	/*#ifndef APP-PLUS*/
	.scroll_top_act {
		background: white;
		top: 45px;
		position: fixed;
	}

	/*#endif*/
	/*#ifdef APP-PLUS*/
	.scroll_top_act {
		background: white;
		top: 65px;
		position: fixed;
	}

	/*#endif*/

	.banner {
		border-radius: 10px;
		margin: 8px 8px 0 8px;
		overflow: hidden;
		display: flex;
	}

	.banner img {
		width: 100%;
	}

	.banner>.left {
		flex: 4;
		/* margin-right: 10upx; */
		border-right: 2px solid #f2f2f2;
		overflow: hidden;
	}

	.banner>.right {
		flex: 7;
	}

	.right .top {
		width: 100%;
		/* margin-bottom: 7upx; */
		/*border-bottom: 2px solid #f2f2f2;*/
		overflow: hidden;
	}

	.right .bottom {
		display: flex;
		width: 100%;
	}

	.right .bottom .bottom-left {
		flex: 6;
		/* margin-right: 5upx; */
		overflow: hidden;
		border-right: 1px solid #f2f2f2;
	}

	.right .bottom .bottom-right {
		flex: 6;
		/* margin-left: 5upx; */
		/* border-left: 1px solid #f2f2f2; */
		overflow: hidden;
	}

	.marquee-box {
		border-radius: 5px;
		overflow: hidden;
		position: relative;
		background: #fff;
		height: 26px;
		line-height: 26px;
	}

	.marquee-title {
		padding-left: 8px;
		padding-right: 8px;
		position: absolute;
		color: #ff5100;
		top: 0;
		left: 0;
		z-index: 3;
		background: #fff;
		font-size: 14px;
	}

	.marquee {
		padding: 6px 10px;
		color: #000;
		display: inline-block;
		white-space: nowrap;
		animation: 35s wordsLoop linear infinite normal;
		font-size: 14px;
	}

	@keyframes wordsLoop {
		0% {
			transform: translateX(350px);
			-webkit-transform: translateX(350px);
		}

		100% {
			transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
		}
	}
</style>
