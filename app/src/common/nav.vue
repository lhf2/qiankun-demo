<template>
  <div class="app-nav">
    <div>
      <router-link to="/app">主应用</router-link>
    </div>
    <div>
      <router-link to="/vue/">vue子应用</router-link>
    </div>
    <div>
      <router-link to="/react/">react子应用</router-link>
    </div>
  </div>
</template>

<script>
import { start } from "qiankun";
import { onMounted } from "vue";

export default {
  setup() {
    onMounted(() => {
      if (!window.qiankunStarted) {
        window.qiankunStarted = true;
        start({
          sandbox: { strictStyleIsolation: true }
        });
      }
    });
  },
};
</script>
