<template>
	<view class="container">
		<uni-grid :column="2" :highlight="true" @change="change">
			<uni-grid-item v-for="(item, index) in imagelist" :index="index" :key="index">
				<view class="grid-item-box" >
					<image :src="item.url" class="grid-item-image" mode="aspectFill" />
				</view>
			</uni-grid-item>
		</uni-grid>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	import {products} from "../../api/shop.js"
	
	export default {
		data() {
			return {
				list: [],
				imagelist:[],
				loadMoreText: "加载中...",
				showLoadMore: false,
				page: 1,
			}
		},
		// created() {
		//       this.getproducts();
		// },
		onLoad() {
			this.getproducts();
		},
		onUnload() {
			this.page = 1,
			this.list = [],
			this.loadMoreText = "加载更多",
			this.showLoadMore = false;
		},
		onReachBottom() {
			if (this.list.length == 0) {
				this.loadMoreText = "没有更多数据了!"
				return;
			}
			this.showLoadMore = true;
			setTimeout(() => {
				this.setListData();
			}, 300);
		},
		methods: {
			async getproducts()
			{
				try{
					
					this.list = [];
					this.imagelist = [];
					this.page = 1;
					
					this.$store.dispatch('goods/list').then((data) => {
							var _obj = JSON.stringify(data),
						    _obj2 = JSON.parse(_obj);
					            this.list = _obj2;
					            this.setListData();
					          }).catch(error => {
						
						console.log(error);
						uni.showToast({
							title: `list ERR：${error}`,
							icon: 'none'
						});
					});
				}catch(e){
					console.log(e);
					uni.showToast({
						title: `E：${e}`,
						icon: 'none'
					})
				}
				
				setTimeout(() => {
					uni.stopPullDownRefresh();
				}, 300);
			},
			onPullDownRefresh() {
				this.getproducts();
			},
			change(e) {
				let {index} = e.detail;
				uni.navigateTo({
					url: `/pages/detail/detail?index=${this.imagelist[index].index}&url=${this.imagelist[index].url}`,
				});
			},
			setListData() {
				let count = this.page * 10;
				let temp = [];
				while(this.list.length > 0)
				{
					if(this.imagelist.length >= count) 
					{
						this.page ++;
						break;
					}	
					this.imagelist.push(this.list[0]);
					this.list.shift();
				}
				
				
				// this.$store.dispatch('goods/detail',temp).then((data) => {
				// 	data.forEach((value) => {
				// 	  this.imagelist.push(value);
				// 	});
				// 	console.log(this.imagelist);
				//           }).catch(error => {
					
				// 	console.log(error);
				// 	uni.showToast({
				// 		title: `detail ERR：${error}`,
				// 		icon: 'none'
				// 	});
				// });
				
				
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
	
	.grid-item-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 350rpx;
		overflow: hidden;
		padding: 15px;
	}
	

	.grid-item-image {
		width: 100%;
		height: 100%;
		flex: 1;
	}
	
</style>
