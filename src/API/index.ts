import request from "@/server/http";


export default {
  getAPPList(params:any) { 
    return request({
      method: "post",
      url: "/qiankun/appList",
      data:params
    })
  },
  getLibList(params:any) { 
    return request({
      method: "post",
      url: "/qiankun/lib",
      data:params
    })
  }
}