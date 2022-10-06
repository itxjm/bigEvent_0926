// 每次发起真正的请求之后 都会经过的地方
$.ajaxPrefilter(function (config) {
  // const format2Json = (source) => {
  //   let target = {}
  //   source.split('&').forEach((el) => {
  //     let kv = el.split('=')
  //     target[kv[0]] = decodeURIComponent(kv[1])
  //   })
  //   return JSON.stringify(target)
  // }
  // 统一设置基准地址
  config.url = 'http://big-event-vue-api-t.itheima.net' + config.url
  // 统一设置请求头content-Type值
  config.contentType = 'application/json;charset=utf-8'
  // 统一设置请求的参数
  // config.data = config.data && format2Json(config.data)
  // 统一设置请求头
  // 请求路径中有/my这样字符串的需要添加
  // indexOf startWith endSwith includes
  if(config.url.includes('/my')){
  config.headers ={
    Authorization: localStorage.getItem('token') || ''
  } 
}

// 统一加错误回调 或complete回调
config.error = function (err){
  if(
    err.responseJSON?.code === 1 && err.responseJSON?.message === '身份认证失败！'
  ){
    // 进此处 请求有误
    localStorage.clear()
    location.href = '/login.html'
  }
}
})