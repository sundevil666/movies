<template>
  <div class="mb-3 movie-item">
    <div class="movie-item-poster-wrap" :style="posterBg">
      <div class="movie-info-wrap d-flex flex-column justify-content-between p-2 h-100">
        <div class="movie-item-info text-white">
          <h3 class="fs-3">{{ movie.Title }}</h3>
          <div class="movie-year fs-6">{{ movie.Year }}</div>
        </div>
        <div class="movie-item-controls row no-getters">
          <div class="col">
            <BButton size="md" block variant="outline-light" @click="emitInfoEvent">Info</BButton>
          </div>
          <div class="col">
            <BButton size="md" block variant="outline-light" @click="emitRemoveItem">Remove</BButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieItem',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    posterBg() {
      return {
        "background-image": `url(${this.movie.Poster})`
      }
    }
  },
  methods: {
    emitRemoveItem() {
      this.$emit('removeItem', { id: this.movie.imdbID, title: this.movie.Title})
    },
    emitInfoEvent() {
      this.$emit('showModal', this.movie.imdbID)
    },
  }
}
</script>

<style scoped>
  .movie-item {
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    transition: all .2s ease-in;
    height: 300px;
  }
  .movie-item:hover {
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.7);
    transform: scale(1.02);
  }
  .movie-item-poster-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: -1;
  }
  .movie-info-wrap {
    opacity: 0;
    transition: all .5s ease;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .movie-info-wrap:hover {
    opacity: 1;
  }
</style>
