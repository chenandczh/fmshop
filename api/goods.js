import request from '../utils/request.js'

export function products() {
  return request({
    url: '/api/fmshop/products',
    method: 'get',
  })
}

export function details(arr) {
  return request({
    url: '/api/fmshop/details',
    method: 'post',
	data: {
	      arr
	    }
  })
}