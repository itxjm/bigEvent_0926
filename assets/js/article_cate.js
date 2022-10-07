$(function () {
  const layer = layui.layer
  const form = layui.form

  loadCateList()
  function loadCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/cate/list',
      success(res) {
        if (res.code !== 0) return layer.msg('获取分类失败！')
        let htmlStr = template('tpl-cate', res)
        $('tbody').empty().append(htmlStr)
      }
    })
  }

  let index = null
  $('#btnAddCate').on('click', function () {
    index = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#addDialog').html()
    })
  })


  let isEdit = false //用来记录当前是什么状态
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()

    if (isEdit) {
      $.ajax({
        method: 'PUT',
        url: '/my/cate/info',
        data: $(this).serialize(),
        success(res) {
          if (res.code !== 0) return layer.msg('修改分类失败')
          layer.msg('修改分类成功')
          loadCateList()
        }
      })
    } else {
      $.ajax({
        method: 'POST',
        url: '/my/cate/add',
        data: $(this).serialize(),
        // data:form.val('addFormFilter'),
        success(res) {
          if (res.code !== 0) return layer.msg('添加分类失败')
          layer.msg('添加分类成功')
          loadCateList()
        }
      })
    }
    isEdit = false
    layer.close(index)

  })

  $('tbody').on('click', '.btnEdit', function () {
    // 用户点击修改按钮的时候 吧状态设置为true
    isEdit = true
    // console.log('修改了',$(this).attr('data-id'))  
    index = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#editDialog').html()
    })

    const id = $(this).attr('data-id')
    $.ajax({
      method: 'GET',
      url: `/my/cate/info?id=${id}`,
      success(res) {
        if (res.code !== 0) return layer.msg('获取分类失败')
        form.val('addFormFilter', res.data)
      }
    })
  })


  // 删除
  $('tbody').on('click', '.btnDelete', function () {
    let result = confirm('确定删除？')
    let id = $(this).attr('data-id')
    if (result) {
      $.ajax({
        method: 'DELETE',
        url: `/my/cate/del?id=${id}`,
        success(res) {
          if (res.code !== 0) return layer.msg('删除失败')
          layer.msg('删除成功')
          loadCateList()
        }
      })
    }
  })
})