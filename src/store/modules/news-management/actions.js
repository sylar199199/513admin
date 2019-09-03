import * as types from '@store/modules/news-management/mutation-types'
import { $message } from '@/element'
import qs from 'qs'

export default {
  //获取全部新闻
  async getNewsList({ commit }, terms = {}) {
    const res = await this.$ajax.getList(this.$apis.getNewsList, {
      category: '0',
      status: '0',
      ...terms,
    })
    if (res.ok) {
      commit({
        type: types.SET_NEWS_LIST,
        newsList: res.data,
      })
    }
  },
  // 添加新闻
  async addNews({ commit }, params) {
    const res = await this.$ajax.post(this.$apis.addNews, {
      category: params.category,
      content: params.content,
      pictureImage: params.pictureImage,
      title: params.title,
    })
    return res
  },
  // 修改新闻状态
  async updateNewstatus({ dispatch }, data) {
    const res = await this.$ajax.post(this.$apis.updateNewstatus, {
      sign: data.sign,
      status: data.status,
    })
    if (res.ok) {
      dispatch('getNewsList')
      $message.success('状态修改成功')
      window.location.reload()
    }
  },
  // 删除新闻
  async deleteNews({}, sign) {
    const res = await this.$ajax.post(this.$apis.deleteNew, {
      sign,
    })
    return res
  },
  async getNewsDetail({ commit }, sign) {
    const res = await this.$ajax.post(this.$apis.getByNewsId, { sign })
    if (res.ok) {
      commit({
        type: types.SET_NEWS_DETAILS,
        newsDetails: res.data[0],
      })
    }
    return res.data[0]
  },
  //更新新闻
  async updateNews({}, params) {
    const res = await this.$ajax.post(this.$apis.updateNews, params)
    return res
  },
}
