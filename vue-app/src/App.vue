<template>
    <router-view/>
</template>
<script>
  export default {
    setup() {
      const testFn = () => {
        console.log('test')
      };
      return {
        testFn
      }
    }


  }
</script>
<style>
    body{
      margin: 0;
    }
</style>