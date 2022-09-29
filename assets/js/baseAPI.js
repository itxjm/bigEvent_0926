// 每次发起真正的请求之后 都会经过的地方
$.ajaxPrefilter(function (config) {
  // 统一设置基准地址
  config.url = 'http://big-event-vue-api-t.itheima.net' + config.url
  // 统一设置请求头content-Type值
  config.contentType = 'application/json'
})