<template>
  <div>
    <div class="d-flex justify-content-between">
      <h6>Movies view</h6>
      <BIconX @click="closeModal" style="cursor: pointer" />
    </div>
    <div>
      <BRow>
        <BCol sm="4">
          <img :src="movie.Poster" :alt="movie.Title" class="w-100">
        </BCol>
        <BCol sm="8">
          <h3>{{ movie.Title }}</h3>
          <BFormRating
            v-model="movie.imdbRating"
            readonly
            show-value
            precision="1"
            stars="10"
            show-value-max
            no-border
          />
          <p>{{ movie.Plot }}</p>
          <div class="my-3 d-flex gap-2 flex-wrap">
            <BBadge variant="success" class="bg-info">{{ movie.Year }}</BBadge>
            <BBadge variant="success" class="bg-info">{{ movie.Runtime }}</BBadge>
            <BBadge variant="success" class="bg-info">{{ movie.Genre }}</BBadge>
            <BBadge variant="success" class="bg-info">{{ movie.Language }}</BBadge>
          </div>
          <table class="table small">
            <tbody>
              <tr>
                <th>Production</th>
                <td>{{ movie.Production}}</td>
              </tr>
              <tr>
                <th>Country</th>
                <td>{{ movie.Country}}</td>
              </tr>
              <tr>
                <th>Director</th>
                <td>{{ movie.Director}}</td>
              </tr>
              <tr>
                <th>Writer</th>
                <td>{{ movie.Writer}}</td>
              </tr>
              <tr>
                <th>Actors</th>
                <td>{{ movie.Actors}}</td>
              </tr>
              <tr>
                <th>Awards</th>
                <td>{{ movie.Awards}}</td>
              </tr>
            </tbody>
          </table>
        </BCol>
      </BRow>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalInfoContent',
  props: {
    movie: {
      type: Object,
      required: true,
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped>

</style>
