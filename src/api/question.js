import request from '@/utils/request'

export function getQuestionList(data) {
  return request({
    url: '/question/list',
    method: 'get',
    params: data
  })
}

// 添加填空题
export function addFill(data) {
  return request({
    url: '/fill/add',
    method: 'post',
    data
  })
}
// 删除填空题
export function delFill(data) {
  return request({
    url: `/fill/delete/${data}`,
    method: 'get',
  })
}

// 添加判断题
export function addJudge(data) {
  return request({
    url: '/judge/add',
    method: 'post',
    data
  })
}
// 删除判断题
export function delJudge(data) {
  return request({
    url: `/judge/delete/${data}`,
    method: 'get',
  })
}


// 添加单选题
export function addSingle(data) {
  return request({
    url: '/single/add',
    method: 'post',
    data
  })
}
// 删除单选题
export function delSingle(data) {
  return request({
    url: `/single/delete/${data}`,
    method: 'get',
  })
}

// 添加多选题
export function addMulti(data) {
  return request({
    url: '/multi/add',
    method: 'post',
    data
  })
}
// 删除多选题
export function delMulti(data) {
  return request({
    url: `/multi/delete/${data}`,
    method: 'get',
  })
}

export function exportQuestionList() {
  return request({
    url: '/question/exportExcel',
    method: 'post',
    responseType: 'blob'
  })
}

export function exportTemplate() {
  return request({
    url: '/question/template/download',
    method: 'post',
    responseType: 'blob'
  })
}

export function importQuestions(data) {
  return request({
    url: '/question/import',
    method: 'post',
    data: data,
    headers: {'Content-Type': 'multipart/form-data' }
  })
}
