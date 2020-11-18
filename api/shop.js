import request from '../utils/request.js'

export function products() {
  return request({
    url: '/api/fmshop/products',
    method: 'get',
  })
}