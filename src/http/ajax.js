import Nprogress from '@plugins/nprogress'
import Service from '@/http/service'

/**
 *生成ajax
 *
 * @class Ajax
 */
export default class Ajax extends Service {
  constructor($axios, $configs) {
    super($axios, $configs)
  }

  response = async ({ method = 'get', url, params, data, isList, isBlob }) => {
    Nprogress.start()
    // 配置config
    const config = {
      method,
      url,
      params,
      data,
    }

    if (isBlob) config.responseType = 'blob'

    try {
      const res = await this.service(config)

      // TODO:处理blob以及list，后期可以全部移到ajax-utils中，并且处理request以及response数据，全部移到service中使用,ajax只用来定义 restful方法
      // 如果是获取blob（目前只有验证码校验获取）
      if (isBlob) {
        return {
          ok: true,
          data: res.data,
        }
      }
      if (isList) {
        const {
          hasNextPage,
          hasPreviousPage,
          pages,
          total,
          size,
          list,
          pageNum,
        } = res.data.data
        res.data = {
          ...res.data,
          data: {
            hasNextPage,
            hasPreviousPage,
            pages,
            total: +total,
            size,
            list,
            pageNum,
          },
        }
      }

      return await this.requestProcessing(res, 'serviceErrorCode')
    } catch (error) {
      return this.allResponseErrorProcessing(error)
    } finally {
      Nprogress.done()
    }
  }

  get = async (url, params = {}) => {
    return await this.response({ url, params })
  }

  getBlob = async (url, isBlob = true, params = {}) => {
    return await this.response({ url, params, isBlob })
  }

  getList = async (url, postData, isList = true) => {
    // 默认page与size
    const pageMeta = {
      size: 10,
      page: 1,
    }
    const data = {
      ...pageMeta,
      ...postData,
    }
    // 确保为int类型
    data.page = +data.page
    data.size = +data.size
    return await this.response({ method: 'post', url, data, isList })
  }

  post = async (url, data) => {
    return await this.response({ method: 'post', url, data })
  }
}
