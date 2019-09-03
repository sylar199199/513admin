class CookieUtils {
  defaultTimeOut = 2000
  getCookieVal = offset => {
    var endstr = document.cookie.indexOf(';', offset)
    if (endstr == -1) endstr = document.cookie.length
    return unescape(document.cookie.substring(offset, endstr))
  }

  getCookie = name => {
    var arg = name + '='
    var alen = arg.length
    var clen = document.cookie.length
    var i = 0
    while (i < clen) {
      var j = i + alen
      if (document.cookie.substring(i, j) == arg) return this.getCookieVal(j)
      i = document.cookie.indexOf(' ', i) + 1
      if (i == 0) break
    }
    return null
  }
  /**
   * 添加cookie
   * name:cookie name
   * value:cookie value
   * @memberof CookieUtil
   */
  setCookie = (name, value, timeOut = 0) => {
    var exp = new Date()
    exp.setTime(
      exp.getTime() + 60 * 1000 * (timeOut ? timeOut : this.defaultTimeOut),
    )
    document.cookie =
      name + '=' + escape(value) + ';expires=' + exp.toGMTString()
  }
}
export default new CookieUtils()
