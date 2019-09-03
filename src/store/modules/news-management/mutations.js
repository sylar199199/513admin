import * as types from '@store/modules/news-management/mutation-types'

export default {
  [types.SET_NEWS_LIST](state, { newsList }) {
    state.newsList = newsList
  },
  [types.SET_IMAGE_RELATE](state, { setimageUrl }) {
    state.newsDetails.pictureImage = setimageUrl
  },
  [types.SET_NEWS_DETAILS](state, { newsDetails }) {
    state.newsDetails = newsDetails
  },
}
