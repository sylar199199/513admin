// 手机号
export const checkPhone = (rule, value, callback) => {
  const reg = /^[1][3456789]\d{9}$/
  if (reg.test(value)) {
    callback()
  } else {
    return callback(new Error('请输入正确的手机号'))
  }
}
// email
export const checkEmail = (rule, value, callback) => {
  const reg = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/
  if (reg.test(value)) {
    callback()
  } else {
    return callback(new Error('请输入正确邮箱'))
  }
}

// 学生 教师 姓名
export const checkName = (rule, value, callback) => {
  const reg = /^.{0,50}$/
  if (reg.test(value)) {
    callback()
  } else {
    return callback(new Error('角色名称不能超过50位'))
  }
}

// 学生 教师 工号
export const checkUserNumber = (rule, value, callback) => {
  const reg = /^.{0,50}$/
  if (reg.test(value)) {
    callback()
  } else {
    return callback(new Error('不能输入超过50位字符'))
  }
}

//密码

export const checkPassword = (rule, value, callback) => {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
  if (reg.test(value)) {
    callback
  } else {
    return callback(new Error('密码最短为6位且必须包含字母加数字'))
  }
}
//描述

export const checkDescribe = (rule, value, callback) => {
  const reg = /^.{0,200}$/
  if (reg.test(value)) {
    callback
  } else {
    return callback(new Error('描述最多不要超过200位'))
  }
}

//企业名称

export const checkCompanyName = (rule, value, callback) => {
  const reg = /^[\u4e00-\u9fa5]{2,30}$/
  if (reg.test(value)) {
    callback()
  } else {
    return callback(new Error('请输入2-30位中文名称'))
  }
}

//标题

export const checkTitle = (rule, value, callback) => {
  const reg = /^.{0,50}$/
  if (reg.test(value)) {
    callback
  } else {
    return callback(new Error('标题最多不要超过50位'))
  }
}
