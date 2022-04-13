<template>
  <div class="d-flex justify-content-center fixed-top py-3 bg-white">
    <BPagination
      v-model="currentPageModel"
      :per-page="perPage"
      :total-rows="total"
    />
  </div>
</template>

<script>
export default {
  name: "MoviesPagination",
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    currentPageModel: {
      get() {
        return this.currentPage
      },
      set(val) {
        this.$emit("pageChanged", val)
      }
    }
  }
}
</script>

<style scoped>

</style>
