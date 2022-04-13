<template>
  <header class="header pt-5">
    <BNavbar type="dark" class="navbar pt-5" variant="dark">
      <BContainer>
        <BNavbarBrand href="#">MovieDB</BNavbarBrand>
        <BFormInput class="mr-2 search-input" placeholder="Search" v-model="searchValue" debounce="300" />
      </BContainer>
    </BNavbar>
  </header>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      searchValue: '',
    }
  },
  watch: {
    searchValue: 'onSearchValueChanged',
  },
  methods: {
    ...mapActions('movies', ['searchMovies', 'fetchMovies', 'toggleSearchState']),
    onSearchValueChanged(val) {
      if(val) {
        this.searchMovies(val)
        this.toggleSearchState(true)
      } else {
        this.fetchMovies()
        this.toggleSearchState(false)
      }
    }
  }
}
</script>

<style scoped>

</style>
