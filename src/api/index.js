import request from '@/base/service.js'

export function getTable02(data) {
  return request({
    url: '/api/Chart/GetT01',
    method: 'get',
    params: { date: data },
  })
}

// 抽真空
export function getTable03(data) {
  return request({
    url: '/api/Chart/GetT02',
    method: 'get',
    params: { date: data },
  })
}

export function getTable09(data) {
  return request({
    url: '/api/Chart/GetT09',
    method: 'get',
    params: { date: data },
  })
}

// 卤检
export function getTable05(data) {
  return request({
    url: '/api/Chart/GetT04',
    method: 'get',
    params: { date: data },
  })
}

// 冷媒
export function getTable04(data) {
  return request({
    url: '/api/Chart/GetT03',
    method: 'get',
    params: { date: data },
  })
}

// 在线履历
export function getTable08(data) {
  return request({
    url: '/api/Chart/GetChartPanel1',
    method: 'get',
    params: { date: data },
  })
}

// 安全性能
export function getTable06(data) {
  return request({
    url: '/api/Chart/GetT05',
    method: 'get',
    params: { date: data },
  })
}

// 二用质量
export function getTable01(data) {
  return request({
    url: '/api/Chart/GetChartPanel3',
    method: 'get',
    params: { date: data },
  })
}

// 生产信息质量
export function getTable07(data) {
  return request({
    url: '/api/Chart/GetChartPanel2',
    method: 'get',
    params: { date: data },
  })
}