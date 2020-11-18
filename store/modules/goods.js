import {products,details} from '../../api/goods.js'

const goods = {
  namespaced: true,
  state: {
	  goodslist:[],
  },

  mutations: {
	  SET_LIST: (state, list) => {
	        state.goodslist = list;
	      },
  },

  actions: {
    // 获取商品列表
    list({commit}) 
	{
      return new Promise((resolve, reject) => {
        products()
          .then(response => {
            const data = response.data;

            if (data.length > 0) {
              commit('SET_LIST', data);
              resolve(data);
            } else {
			  commit('SET_LIST', []);
              resolve([]);
            }
          })
          .catch(error => {
            reject(error);
          })
      })
    },
	detail({commit},arr)
	{
		return new Promise((resolve, reject) => {
		  details(arr)
		    .then(response => {
		      const data = response.data;
		
		      if (data.length > 0) {
		        resolve(data);
		      } else {
		        resolve([]);
		      }
		    })
		    .catch(error => {
		      reject(error);
		    })
		})
	},
  }
}

export default goods
