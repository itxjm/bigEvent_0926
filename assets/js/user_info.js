$(function(){
  let layer = layui.layer
  let form = layui.form

  form.verify({
    nickname:function(value){
      if(value > 6) {
        return '昵称长度必须在1-6个字符之间！'
      }
    }
  })

  
  const initInfo = () => {
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success(res){
        if(res.code !== 0) return layer.msg('获取用户信息失败！')
        // console.log(res)
        // 1.给表单尽心回显数据
        // form.val('你要指定给哪个表单','你要指定的值')
        form.val('userForm',res.data)
      }
    })
  }
  initInfo()

  

  // 给重置按钮添加点击事件
  $('#btnReset').on('click',function(e){
    // 阻止默认重置行为
    e.preventDefault()
    // 重新刷新用户信息
    initInfo()
  })

  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    console.log(form.val('userForm'))
    
    $.ajax({
      method:'PUT',
      url:'/my/userinfo',
      data:form.val('userForm'),
      // data: JSON.stringify({
      //   id: $('#userForm [name=id]').val(),
      //   // nickname: $('#userForm [name=nickname]').val(),
      //   nickname: $('#nickname').val(),
      //   email: $('#email').val()
      // }),
      success(res){
        if(res.code !== 0) return layer.msg('更新用户信息失败！')
        window.parent.getUserInfo()
        layer.msg('更新用户信息成功！')
      }
    })
  })
})
