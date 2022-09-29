$(function () {
  $('#goReg').on('click', function () {
    $('.login-wrap').hide()
    $('.reg-wrap').show()
  })
  $('#goLogin').on('click', function () {
    $('.reg-wrap').hide()
    $('.login-wrap').show()
  })

  let form = layui.form
  let layer = layui.layer
  form.verify({
    // 添加自定义规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      if ($('#password').val() !== value) {
        return '两次密码输入不一致，请重新输入！'
      }
    }
  })

  // http://big-event-vue-api-t.itheima.net
  // 将key=value形式的数据 转成json格式的字符串
  const format2Json = (source) => {
    let target = {}
    source.split('&').forEach((el) => {
      let kv = el.split('=')
      target[kv[0]] = kv[1]
    })
    return JSON.stringify(target)
  }

  $('#formReg').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: 'http://big-event-vue-api-t.itheima.net/api/reg',
      contentType: 'application/json',
      // data:JSON.stringify({
      //   username:$('#formReg [name=username]').val(),
      //   password:$('#formReg [name=password]').val(),
      //   repassword:$('#formReg [name=repassword]').val()
      // })
      data: format2Json($(this).serialize()),
      success(res) {
        if (res.code !== 0) return layer.msg(res.message)
        layer.msg('注册成功')
        // 模拟人的点击操作
        $('#goLogin').click()
      }
    })
  })
})