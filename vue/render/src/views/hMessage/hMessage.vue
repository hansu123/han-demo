<template>
    <div class="message_wrap" v-if="showMessage">
    {{content}}
    </div>
</template>

<script>
    export default {
        data(){
            return {
                content:"",
                showMessage:false
            }
        },
        methods:{
            start({content,delay}){
                this.showMessage=true;
                this.content=content;
                setTimeout(()=>{
                    this.showMessage=false
                },delay)
            }
        }
    }
</script>

<style lang="scss" scoped>
.message_wrap{
    position:fixed;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    padding:10px 15px;
    border-radius:10px;
    background:rgba(65, 63, 63, 0.6);
    color:#fff;
    display:flex;
    justify-content: center;
    align-items:center;
}
</style>