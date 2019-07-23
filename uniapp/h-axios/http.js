class InterceptorManager{
	constructor() {
	   this.handlers=[];
		 this.name="hansu"
	}
	use(resolve,reject){
		this.handlers.push({resolve,reject})
	}
	forEach(fn){
	  this.handlers.forEach((elem)=>{
			fn(elem)
		})
	}
}

class Http{
	
constructor() {
	  this.config={};
    this.interceptors={
			request:new InterceptorManager(),
			response:new InterceptorManager(),
		}
}

initConfig(config){
	  Object.assign(this.config,config)
}
	
}

export default new Http()