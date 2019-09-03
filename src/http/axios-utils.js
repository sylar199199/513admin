import { $message } from '@/element'
import router from '@/router'
import cookieUtils from '@utils/cookie'

class AxiosUtils {
  constructor() {
    // http code
    this.httpErrorCode = {}
    // service code
    this.serviceErrorCode = new Map([
      [-1001, '登录异常，1秒后跳转至登录页面'],
      [-1002, '您已登录,无需重复登录!'],
      [-6, '您没有权限访问!'],
      [-1, '请求失败，请稍后重试'],
      [-2, '校验未通过'],
      [-3, '插入数据异常'],
      [-4, '请勿重复提交'],
      [-5, '验证码错误!'],
      [-7, '签名已经过期!'],
      [(-9999, '系统繁忙,请稍后重试!')],
    ])
    // 截流池
    this.throttleKeyArr = []
    // 设置接触初始限制
    this.throttleCountCeil = 3
  }
  // 节流处理
  throttle = params => {
    const throttleFound = this.throttleKeyArr.find(
      item => item.key === params.throttle,
    )
    // 不存在节流key
    if (!throttleFound) {
      this.throttleKeyArr.push({
        key: params.throttle,
        time: +new Date(),
        times: 0,
      })
    } else {
      const now_time = +new Date()
      const { time, times } = throttleFound
      if (times >= this.throttleCountCeil && now_time - time < 1000) {
        return Promise.reject({
          msg: '您的请求过于频繁，请稍后重试',
          type: 'throttle',
          data: null,
        })
      }
      // 更新节流数组匹配数据的时间
      throttleFound.time = now_time
      if (times < this.throttleCountCeil) throttleFound.times += 1
    }
    delete params.throttle
    return Promise.resolve({ ...params })
  }

  requestDataProcess = data => {
    if (Array.isArray(data)) return JSON.stringify(data)
    return data
    // const obj = { ...data }
    // Object.keys(data).map(key => {
    //   if (data[key] === '') delete obj[key]
    // })
    // return obj
  }

  // 网络错误
  netWorkError = error => {
    // 断网 或者 请求超时 状态
    if (!error.response) {
      let msg = ''
      const message = error.hasOwnProperty('message')
        ? error.message
        : error.msg
      if (message.includes('timeout')) {
        msg += '请求超时，请检查网络是否连接正常'
      } else {
        msg += '请求失败，请检查网络是否已连接'
      }
      return Promise.reject({
        msg,
        data: null,
      })
    }
    const responseCode = error.response.code
    //响应错误处理

    // TODO: 暂时先不处理其它的http错误 400等错误
    // ......
    // ......
    // ......
    return Promise.reject(error)
  }
  // 请求处理 后期可以考虑将这一些合并在第一层处理里面
  requestProcessing = async (res, type) => {
    const code = res.data.code
    if (code === -1001) {
      // 删除cookie
      cookieUtils.setCookie('isLogin', 0, -1)
    } else {
      // 更新cookie
      cookieUtils.setCookie('isLogin', 1, 30)
    }
    switch (code) {
      case 1:
        return Promise.resolve({
          ok: true,
          data: res.data.data,
        })
        break
      case -1001:
        // 判断是否处于登录页，登录页就不用跳转
        $message.error(this[type].get(code))
        if (process.env.VUE_APP_CURRENTMODE === 'production') {
          window.location.href = '/login'
        } else {
          if (router.currentRoute.name !== 'login') {
            setTimeout(() => {
              router.replace({
                path: '/login',
              })
              window.location.reload()
            }, 50)
          }
        }
        return Promise.reject(res.data)
        break
      case -1002:
        router.replace('/home')
      default:
        return Promise.reject(res.data)
        break
    }
  }
  // 所有的响应处理
  allResponseErrorProcessing = error => {
    const message =
      (this._isObject(error) && error.hasOwnProperty('msg') && error.msg) ||
      '请求失败，请稍后重试'
    $message.error(message)

    return {
      ok: false,
      data: error.data,
      message,
      code: error.code,
    }
  }

  /**
   * 判断是否是对象
   *
   * @param {*} obj 判断的对象
   * @returns
   */
  _isObject = obj => {
    return obj && typeof obj === 'object'
  }
}

export default AxiosUtils
