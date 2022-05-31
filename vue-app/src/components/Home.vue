<template>
    <div>
      子应用的内容
    </div>
</template>
<script>
  import {onMounted} from 'vue';
  // 模块联邦
  import {HeaderComponent, utils} from 'rootApp/commonExport'

  export default {
    name: 'Home',
    components: {
      /*HeaderComponent: window.__POWERED_BY_QIANKUN__ ? window.commonComponents.HeaderComponent : '',
      FooterComponent: window.__POWERED_BY_QIANKUN__ ? window.commonComponents.FooterComponent : ''*/
      HeaderComponent
    },
    setup() {
      onMounted(() => {
        utils.commonFn();
        console.log('mounted!')
      })
    }
  }
</script>