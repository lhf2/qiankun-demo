<template>
  <div class="app-content">
    <header-component />
    <section class="main-content">
      <Nav />
      <div class="content-box">
        <router-view />
        <div id="vue-app"></div>
      </div>
    </section>
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from "../common/header.vue";
import FooterComponent from "../common/footer.vue";
import Nav from "../common/nav.vue";
// import { start } from "qiankun";
// import { onMounted } from "vue";

export default {
  name: "Home",
  components: {
    HeaderComponent,
    FooterComponent,
    Nav,
  },
  setup() {
    // onMounted(() => {
    //   console.log('1111111');
    //   if (!window.qiankunStarted) {
    //     window.qiankunStarted = true;
    //     start();
    //   }
    // });
  },
};
</script>