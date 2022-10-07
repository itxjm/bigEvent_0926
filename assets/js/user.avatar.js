$(function () {
  const layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  let $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 上传文件的按钮
  $('#btnChoose').on('click', function () {
    // 打开文件选择框
    file.click()
  })
  $('#file').on('change', function (e) {
    console.log(e)
    const fileList = e.target.files
    if (fileList.length === 0) return layer.msg('请选择图片')
    // 2. 将文件，转化为路径
    const blobUrl = URL.createObjectURL(fileList[0])
    // console.log(blobUrl) //blob:http://127.0.0.1:5500/6afc1524-91b8-4180-be4b-d7a4c03f1ca5
    
    // 3. 重新初始化裁剪区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', blobUrl) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
  $('#btnConfirm').on('click', function () {
    let dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')
    $.ajax({
      method: 'PATCH',
      url: '/my/update/avatar',
      // contentType: 'application/json',
      data: JSON.stringify({
        avatar: dataURL
      }),
      success(res) {
        if (res.code !== 0) return layer.msg('更新头像失败！')
        layer.msg('更新头像成功！')
        window.parent.getUserInfo()
      }
    })
  })
})