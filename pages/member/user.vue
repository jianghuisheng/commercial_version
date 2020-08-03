<template>
	<view class="container">

		<view class="user-section">
			<view class="bg"></view>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" src="../../static/img/common/logo.jpg"></image>
				</view>
				<view>
					<view class="info-box" style="margin-top: 8px">
						<text class="username">省钱兄</text>
					</view>
				</view>
			</view>
			<view class="vip-card-box">
				<view class="tit">
					<text class="yticon icon-iLinkapp-" style="margin-right: 2px;"></text>
					你的网购省钱专家
				</view>
			</view>
		</view>

		<view class="cover-container">
			<view style="background: white;border-radius: 8px">
				<image class="arc" src="/static/arc.png"></image>
				<view class="tj-sction" style="margin-top: -8px">
				</view>
			</view>

			<view class="history-section icon">
				<list-cell icon="icon-lishijilu" iconColor="#5eba8f" title="我的足迹" @eventClick="navTo('/pages/footer/index')"></list-cell>
				<list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="我的收藏" @eventClick="navTo('/pages/footer/like')"></list-cell>

			</view>
		</view>


	</view>
</template>
<script>
	import listCell from '../../components/mix-list-cell';

	export default {
		components: {
			listCell
		},
		data() {
			return {

			}
		},



		methods: {

			navTo(url) {
				uni.navigateTo({
					url
				})

			}




		}
	}
</script>
<style lang='scss'>
	page {
		background: #f5f5f5;
	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10px;
	}

	.tixian {
		background: -moz-linear-gradient(left, #e10a07, #FF6DB2 100%);
		background: -webkit-gradient(linear, left top, left right, color-stop(0, #e10a07), color-stop(100%, #FF6DB2));
		background: -webkit-linear-gradient(left, #e10a07 0, #FF6DB2 100%);
		background: -o-linear-gradient(left, #e10a07 0, #FF6DB2 100%);
		background: -ms-linear-gradient(left, #e10a07 0, #FF6DB2 100%);
		background: linear-gradient(to left, #e10a07 0, #FF6DB2 100%);
	}

	.user-section {
		margin-top: -10px;
		height: 300px;
		padding: 50px 15px 0;
		position: relative;

		.bg {
			background: #e10a07;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
		}
	}

	.user-info-box {
		height: 100px;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 70px;
			height: 70px;
			/*border: 5px solid #fff;*/
			border-radius: 50%;
		}

		.username {
			font-size: 16px;
			color: #f2f2f2;
			margin-top: 16px;
			margin-left: 10px;
		}

		.username1 {
			font-size: 14px;
			color: whitesmoke;
			margin-top: 16px;
			margin-left: 10px;
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 180px;
		background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
		border-radius: 12px 16px 0 0;
		overflow: hidden;
		position: relative;
		padding: 20px 24px;

		.card-bg {
			position: absolute;
			top: 20px;
			right: 0;
			width: 220px;
			height: 160px;
		}

		.b-btn {
			position: absolute;
			right: 10px;
			top: 16px;
			width: 80px;
			height: 30px;
			text-align: center;
			line-height: 30px;
			font-size: 14px;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: 14px;
			color: #f7d680;
			margin-bottom: 16px;
		}

	}

	.cover-container {
		background: $page-color-base;
		margin-top: -80px;
		padding: 0 18px;
		position: relative;
		background: #f5f5f5;
		padding-bottom: 12px;

		.arc {
			position: absolute;
			left: 0;
			top: -17px;
			width: 100%;
			height: 22px;
		}
	}

	.tj-sction {
		@extend %section;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 80px;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8px;
		}
	}

	.order-section {
		@extend %section;
		padding: 16px 0;
		margin-top: 12px;

		.order-item {
			@extend %flex-center;
			width: 70px;
			height: 70px;
			border-radius: 10px;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 24px;
			margin-bottom: 12px;
			color: #fa436a;
		}

		.icon-shouhoutuikuan {
			font-size: 22px;
		}
	}

	.history-section {
		padding: 16px 0 0;
		margin-top: 12px;
		background: #fff;
		border-radius: 10px;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 22px;
			margin-left: 15px;

			.yticon {
				font-size: 22px;
				color: #5eba8f;
				margin-right: 10px;
				line-height: 20px;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 15px 15px 0;

			image {
				display: inline-block;
				width: 100px;
				height: 100px;
				margin-right: 12px;
				border-radius: 10px;
			}
		}
	}
</style>
