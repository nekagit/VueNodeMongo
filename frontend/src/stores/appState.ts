import type { IProduct } from '@/interfaces/atoms/IProduct'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import http from '../http-common'
export interface ApiResponse {
  data: IProduct[]
}

export const useAppStateStore = defineStore('appState', {
  state: () => {
    const items = ref<IProduct[]>([])
    items.value.push({ id: 1, name: 'book', unitPrice: 1000 })
    items.value.push({ id: 2, name: 'book2', unitPrice: 2000 })
    items.value.push({ id: 3, name: 'book3', unitPrice: 3000 })
    return {
      items
    }
  },
  actions: {
    createProduct(newProduct: IProduct): IProduct {
      return this.createProduct(newProduct)
    },
    async getAll() {
      const response: ApiResponse = await http.get('/products')
      this.items = response.data
      console.log(this.items)
      return response.data
    },
    async get(id: string) {
      const response: ApiResponse = await http.get(`/products/${id}`)
      console.log(response)
      return response.data
    },
    async create(data: IProduct) {
      const response: ApiResponse = await http.post('/products', data)
      console.log(response)
      return response.data
    },
    async update(id: string, data: IProduct) {
      const response: ApiResponse = await http.put(`/products/${id}`, data)
      console.log(response)
      return response.data
    },
    async deleteIt(id: string) {
      const response: ApiResponse = await http.delete(`/products/${id}`)
      console.log(response)
    },
    async deleteAll() {
      const response: ApiResponse = await http.delete(`/products`)
      console.log(response)
    },
    async findByName(name: string) {
      const response: ApiResponse = await http.get(`/products?name=${name}`)
      console.log(response)
      return response.data
    }
  }
})
