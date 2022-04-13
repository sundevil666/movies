<template>
  <div v-if="isShowLoader" class="position-fixed loader-wrap d-flex justify-content-center align-items-center">
    <b-spinner type="grow" variant="light" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Loader',
  computed: {
    ...mapGetters(['isShowLoader'])
  }
}
</script>

<style scoped>
.loader-wrap {
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
