$(function () {
  let layer = layui.layer
  let form = layui.form

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
      if (value === $('[name=old_pwd]').val()) {
        return '新旧密码不能相同！'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=new_pwd]').val()) {
        return '两次密码不能一致！  '
      }
    }
  })

  // 监听表单的提交事件
  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method:'PATCH',
      url:'/my/updatepwd',
      // data:$(this).serialize()
      contentType: 'application/json',
      data:JSON.stringify(form.val('pwdForm')),
      success(res){
        if(res.code !== 0) return layer.msg('更新密码失败！')
        layer.msg('更新密码成功！')
        // 清空表单 
        // $('#btnReset').click() 调用type="reset"按钮
        $('.layui-form')[0].reset()
      }
    })
  })
})