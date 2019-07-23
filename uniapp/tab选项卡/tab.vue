<template>
	<view>

		<view v-if="!isSearch" style="display:flex;flex-direction: column;height:100vh">

			<scroll-view scroll-x="true" class="h-tab" :scroll-left="scroll_left" scroll-with-animation="true">
				<view v-for="(elem,i) of tabData" :key="i" @tap="changeTab" :data-index="i" :class="{'h-tab-item':true,'active':tabIndex==i}">
					{{elem.title}}
				</view>
			</scroll-view>


			<swiper style="flex:1;margin-top:80upx" duration="800" @change="changeSwiper" :current="swiperIndex">
				<swiper-item v-for="(elem,i) of swiperData" :key="i">
					<scroll-view scroll-y="true" style="height:100%" @scrolltolower="onToButtom">
						<!-- scroll-view的样式是关键 -->
						<h-card-list :cardData="list" :cardTitle="cardTitle" @showDetail="showDetail">
						</h-card-list>
					</scroll-view>
				</swiper-item>
			</swiper>

		</view>
		<view style="height:100vh;background:#fff;" v-if="isSearch">
			search
		</view>


	</view>
</template>

<script>
	import dataModel from "../../models/api.js"
	import Bus from "../../util/bus.js"
	import HCardList from "@/components/HCardList"
	import HButton from "@/components/HButton"
	export default {
		data() {
			return {
				list: [],
				listData: [],
				isSearch: false,
				tabIndex: 0,
				isActived: true,
				scroll_left: "25vh",
				swiperIndex: 0,
				tabData: [{
					title: "周保养"
				}, {
					title: "月保养"
				}, {
					title: "季保养"
				}, {
					title: "年保养"
				}],
				swiperData:[{
					title: "设备周保养"
				}, {
					title: "设备月保养"
				}, {
					title: "设备季保养"
				}, {
					title: "设备年保养"
				}],
				
				
				
			}
		},
		methods: {
			getList() {

				dataModel.getList().then((data) => {
					this.list = [{
							machineName: "A-01",
							position: "1-1",
							line: "A",
							lineName: 6601,
							shiftClassName: "白班",
							worker: "15141514"
						}, {
							machineName: "A-02",
							position: "1-1",
							line: "A",
							lineName: 6601,
							shiftClassName: "白班",
							worker: "15141514"
						},
						{
							machineName: "A-03",
							position: "1-1",
							line: "A",
							lineName: 6601,
							shiftClassName: "白班",
							worker: "15141514"
						},
						{
							machineName: "A-04",
							position: "1-1",
							line: "A",
							lineName: 6601,
							shiftClassName: "白班",
							worker: "15141514"
						},
						{
							machineName: "A-05",
							position: "1-1",
							line: "A",
							lineName: 6601,
							shiftClassName: "白班",
							worker: "15141514"
						},
						{
							machineName: "A-06",
							position: "1-1",
							line: "A",
							lineName: 6601,
							shiftClassName: "白班",
							worker: "15141514"
						},
						{
							machineName: "A-01",
							position: "1-1",
							line: "A",
							lineName: 6601,
							shiftClassName: "白班",
							worker: "15141514"
						},
						{
							machineName: "A-01",
							position: "1-1",
							line: "A",
							lineName: 6601,
							shiftClassName: "白班",
							worker: "15141514"
						},
						{
							machineName: "A-01",
							position: "1-1",
							line: "A",
							lineName: 6601,
							shiftClassName: "白班",
							worker: "15141514"
						},

					];

				})

			},
			setData() {
				this.list = this.list.concat([{
					machineName: "A-02",
					position: "1-1",
					line: "A",
					lineName: 6601,
					shiftClassName: "白班",
					worker: "15141514"
				}, {
					machineName: "A-02",
					position: "1-1",
					line: "A",
					lineName: 6601,
					shiftClassName: "白班",
					worker: "15141514"
				}])
			},
			filterData(data, i) {
				let [d] = data.filter((elem, j) => {
					return i === j
				})
				return d
			},
			showDetail(i) {
				uni.setStorageSync("moveMachineDetail", this.filterData(this.list, i))
				uni.navigateTo({
					url: "detail"
				})
			},
			changeTab(e) {
				this.tabIndex = e.currentTarget.dataset.index;
				this.swiperIndex = this.tabIndex
			},
			//滚动到底部事件，因为是设置了scroll-view所以无法使用原生的onReachBottom生命周期函数
			onToButtom() {
				console.log('refresh');
				uni.showLoading({
					title: '加载中',
				});

				setTimeout(() => {
					this.setData();
					uni.hideLoading();
				}, 1000)
			},
			changeSwiper(e) {
				let index = e.target.current;
				this.tabIndex = index;
				let view = uni.createSelectorQuery().select(".h-tab-item");
				view.boundingClientRect(data => {
					this.scroll_left = data.width * index //根据下标移动tab
				}).exec();
			},
			
		},
		computed:{
			cardTitle(){
				return this.swiperData[this.tabIndex].title
			}
		},
		components: {
			HCardList,
			HButton
		},
		onLoad() {
			this.getList()
		},
		onReachBottom() {
			console.log('refresh');
			uni.showLoading({
				title: '加载中',
			});

			setTimeout(() => {
				this.setData();
				uni.hideLoading();
			}, 1000)
		},
		//监听用户点击搜索框
		onNavigationBarSearchInputClicked(e) {
			uni.navigateTo({
				url: '/pages/template/nav-search-input/detail/detail'
			});
		},
		//监听用户搜索提交
		onNavigationBarSearchInputConfirmed(e) {
			//e.text获取搜索词
			console.log(e.text)
		}
	}
</script>

<style scoped lang="scss">
	.card_body {
		display: flex !important;
		flex-direction: column !important;
	}

	.h-tab {
		white-space: nowrap;
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		position: fixed;
		top: 0;
		left: 0;
		background: #fff;
				.h-tab-item {
					display: inline-block;
					width: 25vw;
					text-align: center;
				}
		

		.active {
			background: #2b9939;
			color: #fff;
			// border-bottom: 10upx solid #2b9939;
		}

	}


</style>
