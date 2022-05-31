<template>
    <router-view/>
</template>
<script>

</script>
<style>
    body{
      width: 100%;
      height: 100vh;
      margin: 0;
    }
    #root-app, .app-content{
      width: 100%;
      height: 100%;
    }
    .app-header, .app-footer{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 24px;
        background: #424242;
        color: #fff;
    }
    .app-content{
      display: flex;
      flex-direction: column;
    }
    .main-content{
      flex: 1;
      display: flex;
    }
    .app-nav{
      width: 100px;
      height: 100%;
      background: #6f6f6f;
      text-align: center;
    }
    .app-nav div{
      margin-top: 20px;
    }
    .main-content .content-box{
      flex:1
    }
</style>