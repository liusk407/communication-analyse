import axios from 'axios'


// 创建axios实例
const service = axios.create({

  timeout: 10000 // 请求超时时间
})



// //导入
// import {
//   getCookie
// } from '@/userinfo/cookies'
// //使用
// service.interceptors.request.use(
//   res => {
//       if (res) {
//           if (getCookie("token")) {
//               res.headers.Authorization = getCookie("token")
//           }
//           return res;
//       }
//   },
//   err => {
//       return Promise.reject(err);
//   }
// );




// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status
    if (code < 200 || code > 300) {
      
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
	 Notification.error({
        title: '接口请求失败',
        duration: 5000
      })
    return Promise.reject(error)
  }
)
export default service

