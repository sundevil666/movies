<template>
  <BContainer>
    <h3 class="mb-5 fs-1 text-white">{{ listTitle }}</h3>
    <BRow>
      <template v-if="isExist">
        <BCol cols="3" v-for="(movie, key) in list" :key="key">
          <MovieItem
            :movie="movie"
            @mouseover.native="onMouseOver(movie.Poster)"
            @removeItem="onRemoveItem"
            @showModal="onShowModal"
          />
        </BCol>
      </template>
      <div v-else>Empty list</div>
    </BRow>
    <BModal id="movie-info" size="xl" hide-header hide-footer>
      <ModalInfoContent :movie="selectedMovie" @closeModal="onCloseModal" />
    </BModal>
  </BContainer>
</template>

<script>
import MovieItem from '@/components/MovieItem';
import { mapGetters, mapActions } from 'vuex';
import ModalInfoContent from '@/components/ModalInfoContent';

export default {
  name: 'MoviesList',
  components: {
    MovieItem,
    ModalInfoContent,
  },
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedMovieId: null,
    }
  },
  computed: {
    ...mapGetters('movies', ['isSearch']),
    isExist() {
      return Boolean(Object.keys(this.list).length);
    },
    listTitle() {
      return this.isSearch ? 'Search result' : 'IMDB TOP 250'
    },
    selectedMovie() {
      return this.selectedMovieId ? this.list[this.selectedMovieId] : null
    }
  },
  methods: {
    ...mapActions('movies', ['removeMovies']),
    ...mapActions(['showNotify']),
    onMouseOver(poster) {
      this.$emit('changePoster', poster)
    },
    async onRemoveItem ({  id, title }) {
      const isConfirmed = await this.$bvModal.msgBoxConfirm(`Are you sure delete ${title}`)
      if(isConfirmed) {
        this.removeMovies(id);
        this.showNotify({
          msg: 'Movie deleted successful',
          variant: 'success',
          title: 'Success'
        })
      }
    },
    onShowModal(id) {
      this.selectedMovieId = id
      this.$bvModal.show('movie-info')
    },
    onCloseModal() {
      this.selectedMovieId = null
      this.$bvModal.hide('movie-info')
    },
  }
}
</script>

<style scoped>

</style>
