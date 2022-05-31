<template>
  <div class="app-content 1">
    <header-component />
    <section class="main-content 2">
      <Nav />
      <div class="content-box 3">
        我是子应用的内容
        <router-view />
      </div>
    </section>
    <footer-component />
  </div>
</template>
<script>
// import { onMounted } from "vue";
// // 模块联邦
// import { HeaderComponent, utils } from "rootApp/commonExport";

// export default {
//   name: "Home",
//   components: {
//     /*HeaderComponent: window.__POWERED_BY_QIANKUN__ ? window.commonComponents.HeaderComponent : '',
//       FooterComponent: window.__POWERED_BY_QIANKUN__ ? window.commonComponents.FooterComponent : ''*/
//     HeaderComponent,
//   },
//   setup() {
//     onMounted(() => {
//       utils.commonFn();
//       console.log("mounted!");
//     });
//   },
// };

import isQiankun from "../main";
import { defineAsyncComponent } from "vue";
export default {
  name: "Home",
  components: {
    HeaderComponent: !isQiankun ? defineAsyncComponent(() =>
      import("../common/header.vue")
    ) : '',
    FooterComponent: !isQiankun ? defineAsyncComponent(() =>
      import("../common/footer.vue")
    ) : '',
    Nav: !isQiankun ? defineAsyncComponent(() =>
      import("../common/nav.vue")
    ) : ''
  },
  setup() {
    return {
      isQiankun,
    };
  },
};
</script>