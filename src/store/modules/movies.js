import IDs from '@/store/mock/imdb_top250';
import axios from '@/plugins/axios';
import mutations from '@/store/mutations';

function serializeResponse(movies) {
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  }, {});
}

const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE, TOGGLE_SEARCH } = mutations;
const moviesStore = {
  namespaced: true,
  state: {
    top250Ids: IDs,
    moviesPerPages: 12,
    currentPage: 1,
    movies: {},
    isSearch: false,
  },
  getters: {
    slicedIds: ( { top250Ids }) => (from, to) => top250Ids.slice(from, to),
    currentPage: ({ currentPage }) => currentPage,
    moviesPerPages: ({ moviesPerPages }) => moviesPerPages,
    moviesList: ({ movies }) => movies,
    isSearch: ({ isSearch }) => isSearch,
    moviesLength: ({ top250Ids }) => Object.keys(top250Ids).length,
  },
  mutations: {
    [ MOVIES ](state, value) {
      state.movies = value;
    },
    [ CURRENT_PAGE ](state, value) {
      state.currentPage = value;
    },
    [ REMOVE_MOVIE ](state, index) {
      state.top250Ids.splice(index, 1)
    },
    [ TOGGLE_SEARCH ](state, bool) {
      state.isSearch = bool
    }
  },
  actions: {
    async fetchMovies({ getters, commit, dispatch }) {
      try {
        dispatch('toggleLoader', true, { root: true });
        const { currentPage, moviesPerPages, slicedIds } = getters;
        const from = currentPage * moviesPerPages - moviesPerPages;
        const to = currentPage * moviesPerPages;
        const moviesToFetch = slicedIds(from, to);
        const requests = moviesToFetch.map(id => axios.get(`/?i=${id}`));
        const response = await Promise.all(requests);
        const movies = serializeResponse(response);
        commit(MOVIES, movies);
      }
      catch (err) {
        console.log(err);
      }
      finally {
        dispatch('toggleLoader', false, { root: true })
      }
    },
    changeCurrentPage({ commit, dispatch }, page) {
      commit(CURRENT_PAGE, page)
      dispatch('fetchMovies')
    },
    removeMovies({ commit, dispatch, state }, id) {
      const index = state.top250Ids.findIndex(item => item === id)
      if(index !== -1) {
        commit(REMOVE_MOVIE, index)
        dispatch('fetchMovies')
      }
    },
    async searchMovies({ commit, dispatch }, query){
      try {
        dispatch('toggleLoader', true, { root: true });
        const response = await axios.get(`/?s=${query}`)
        if(response.Error) {
          throw Error(response.Error)
        }
        const movies = serializeResponse(response.Search);
        commit(MOVIES, movies)
      }
      catch (err) {
        console.log(err.message);
        dispatch('showNotify', {
          msg: err.message,
          title: 'Error',
          variant: 'danger'
        }, { root: true })
      }
      finally {
        dispatch('toggleLoader', false, { root: true })
      }
    },
    toggleSearchState({ commit }, bool) {
      commit(TOGGLE_SEARCH, bool)
    }
  },
}

export default moviesStore;
