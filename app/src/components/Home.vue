<template>
  <div class="app-content">
    <header-component />
    <section class="main-content">
      <Nav />
      <div class="content-box">
        <router-view />
        <div id="child-app"></div>
      </div>
    </section>
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from "../common/header.vue";
import FooterComponent from "../common/footer.vue";
import Nav from "../common/nav.vue";

export default {
  name: "Home",
  components: {
    HeaderComponent,
    FooterComponent,
    Nav,
  },
  setup() {
  },
};
</script>