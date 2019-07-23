import http from "./http"

http.initConfig({
	baseURL:"http://192.168.1.14:10009/",
	timeout:10000
})

//请求拦截
http.interceptors.request.use((config)=>{
	// console.log("ready to request")
	config.header['x-Token']="sdada";
	return Promise.resolve(config)
})
//响应拦截
http.interceptors.response.use((res)=>{
	console.log(res.config.method)
	if (res.statusCode == 200) {
		let data=JSON.parse(res.data);
		if((data.length>0||Object.keys(data).length>0)&&data){
			console.log(1)
		}
		else{
			uni.showToast({
				title:"暂无数据",
				icon:"none"
			})
		}
		return Promise.resolve(data)
	} else {
		return Promise.reject("HTTP:状态码异常!");
	}
})



class Request {
	
	get(url, data = {},method="GET") {
		
		let config={
		url,
		data,
		method,
		header:{}
		};
	
		function getPromise(config){
			return new Promise((resolve, reject) => {	
					uni.request({
					...config,
					success: (res) => {
						resolve(Object.assign({config},res))
					}
				})
		})		
		}
		function dispatchRequest(config){
			if(http.config.baseURL){
				config.url=http.config.baseURL + url
			}
			return new Promise((resolve, reject) => {	
						uni.request({
						...config,
						success: (res) => {
							resolve(Object.assign({config},res))
						}
					})
			})	
		}

		let chain=[dispatchRequest,undefined];
		
		http.interceptors.request.forEach(function(interceptor){
			chain.unshift(interceptor.resolve,interceptor.reject)
		})
		
		http.interceptors.response.forEach(function(interceptor){
			chain.push(interceptor.resolve,interceptor.reject)
		})
		
		let promise=Promise.resolve(config);		
		while(chain.length){
			promise=promise.then(chain.shift(),chain.shift())
		}
		promise.then(data=>{console.log(data)})
		return promise
	}

	
	post(url, data = {}){
		return this.get(url,data,"POST")
	}
}

export default Request
