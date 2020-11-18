<template>
	<view class="uni-center" >
		<view class="goods-body" >
			<movable-area scale-area>
				<movable-view direction="all" @scale="onScale" scale scale-min="0.5" scale-max="4" :scale-value="scale">
					<image :src="url"  class="goods-image" mode="aspectFit" />
				</movable-view>
			</movable-area>
											
			<!-- <image :src="url"  class="goods-image" mode="aspectFit"
			 @touchstart="touchstart" @touchend="touchend"/> -->
		</view>
		<button class="larrow" @click="gobefore">&larr;</button>
		<button class="rarrow" @click="gonext">&rarr;</button>
		<view class="goods-carts">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
				index:-1,
				count:-1,
				list:[],
				startTime: 0,
				startX: 0,
				startY: 0,
				scale: 1,
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}],
				buttonGroup: [{
						text: '联系我们',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(option) {
			this.list = this.$store.getters.goodslist;
			this.count = this.$store.getters.goodslist.length;
			this.index = option.index;
			this.url = option.url;
		},
		methods: {
			phoneCall()
			{
				uni.makePhoneCall({
				    phoneNumber: '', 
					success: (res) => {
						console.log('调用成功!')	
					},
					fail: (res) => {
						console.log('调用失败!')
					}
				  });
			},
			preView()
			{
				let imgsArray = [];
				imgsArray.push(this.url);
				                
				uni.previewImage({
					urls:imgsArray,
				})
			},
			gobefore()
			{
				this.index--;
				if(this.index < 0 )
				{
				    this.index = this.count - 1;
				}
				this.url = this.list[this.index].url;
				this.scale = 1;
			},
			gonext()
			{
				this.index++;
				if(this.index >= this.count )
				{
					this.index = 0;
				}
				this.url = this.list[this.index].url;
				this.scale = 1;
			},
			onClick(e) {
				if(e.content.text == '客服')
				{
					console.log('客服');
					this.phoneCall();
				}
				else{
					console.log('店铺');
					uni.navigateBack({
						url: `/pages/index/index`, 
					});
				}
			},
			buttonClick(e) {
				console.log('联系我们');
				this.phoneCall();
			},
			touchstart(event) {
			      this.startTime = Date.now();
			      this.startX = event.changedTouches[0].clientX;
			      this.startY = event.changedTouches[0].clientY;
			},
			touchend(event) {
			      const endTime = Date.now();
			      const endX = event.changedTouches[0].clientX;
			      const endY = event.changedTouches[0].clientY;
			      // 判断按下的时常
			      if (endTime - this.startTime > 2000) {
			        return
			      }

			      let direction = -1;//1 left 2 right 3 up 4 down
			      let x = Math.abs(endX - this.startX);
				  let y = Math.abs(endY - this.startY);
				  
				  if(x < 30 && y < 30)
				  {
					  return;
				  }
				  
				  if(x >= y )
				  {
					  if(endX > this.startX)
					  {
						  direction = 2;
					  }
					  else{
						   direction = 1;
					  }
				  }
				  else
				  {
					  if(endY > this.startY)
					  {
					  	  direction = 4;
					  }
					  else{
					      direction = 3;
					  }
				  }
				  
				  if(this.count > 0)
				  {
					  switch(direction)
					  {
					  	 case 1:
						 case 3:
						 this.index--;
						 if(this.index < 0 )
						 {
							 this.index = this.count - 1;
						 }
						 this.url = this.list[this.index].url;
						 this.scale = 1;
						 break;
						 case 2:
						 case 4:
						 this.index++;
						 if(this.index >= this.count )
						 {
						 	this.index = 0;
						 }
						 this.url = this.list[this.index].url;
						 this.scale = 1;
						 break;
					  }
				  }
			}
		}
	}
</script>

<style>
	* {
	  margin:0;
	  padding:0;
	}
	
	.goods-body {
		position:absolute;
		top:0;
		bottom:0;
		left:0;
		right: 0;
	}
	
	movable-view {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
	}
	
	movable-area {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}
	
	.goods-image {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	
	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
	}
	
	.larrow{
		z-index: 9999; 
		position: fixed ! important; 
		top: 50%;
		left: 5%;
		width: 50rpx;
	}
	
	.rarrow{
		z-index: 9999; 
		position: fixed ! important; 
		top: 50%;
		right: 5%;
		width: 50rpx;
	}

</style>
