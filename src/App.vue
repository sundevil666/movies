<template>
  <div id="app">
    <Loader />
    <Notification />
    <PosterBg :poster="posterUrl" />
    <MoviesPagination
      :current-page="currentPage"
      :per-page="moviesPerPages"
      :total="moviesLength"
      @pageChanged="onPageChanged"
    />
    <Header />
    <MoviesList :list="moviesList" @changePoster="onChangePoster" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MoviesList from '@/components/MoviesList';
import PosterBg from '@/components/PosterBg';
import MoviesPagination from '@/components/MoviesPagination';
import Loader from '@/components/Loader';
import Header from '@/components/Header';
import Notification from '@/components/Notification';

export default {
  name: 'App',
  components: {
    MoviesList,
    PosterBg,
    MoviesPagination,
    Loader,
    Header,
    Notification
  },
  data() {
    return {
      posterUrl: '',
    }
  },
  created () {
    if(this.$route.query.page) {
      this.changeCurrentPage(Number(this.$route.query.page))
    }
  },
  computed: {
    ...mapGetters('movies', ['moviesList', 'currentPage', 'moviesPerPages', 'moviesLength'])
  },
  methods: {
    ...mapActions('movies', ['fetchMovies', 'changeCurrentPage']),
    onChangePoster(poster) {
      this.posterUrl = poster
    },
    onPageChanged(page) {
      this.$router.push({ query: { page }})
      this.changeCurrentPage(page)
    }
  },
};
</script>

<style>
</style>
