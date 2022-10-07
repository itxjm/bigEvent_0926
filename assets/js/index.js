$(function(){
  let layer = layui.layer


  function getUserInfo(){
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      // headers:{
      //   Authorization:localStorage.getItem('token') || ''
      // },
      success(res){
        if(res.code !== 0) return layer.msg(res.message)
        // 按需渲染头像
        renderAvatar(res)
      }
     
    })
  }
  getUserInfo()

  const renderAvatar = (res) => {
    if(res.data.user_pic) {
      $('.text-avatar').hide()
      $('.user-box img').attr('src',res.data.user_pic).show()
    }else{
      $('.layui-nav-img').hide()
      // 显示文字头像 取username属性 的第一个字母
      const name = res.data.nickname || res.data.username
      // const char = res.data.username.charAt(0).toUpperCase()
      const char = name[0].toUpperCase()
      $('.text-avatar').css('display','flex').html(char).show()
    }
    $('.text').html(`欢迎&nbsp;&nbsp;${res.data.username}`)
  }

  // 退出页面
  $('#btnLogout').on('click',function(){
    layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
      //1.token需要移除
      localStorage.removeItem('token')
      // 2.页面需要跳转到登录页
      location.href = '/login.html'   
      layer.close(index)
    })
  })
})