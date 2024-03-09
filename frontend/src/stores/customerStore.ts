import type { ICustomer } from '@/interfaces/atoms/ICustomer'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import http from '../http-common'
export interface ApiResponse {
  data: ICustomer[]
}

export const useCustomerStore = defineStore('customers', {
  state: () => {
    const customers = ref<ICustomer[]>([])
    customers.value.push({id: 1, name: 'customer1' })
    customers.value.push({id: 2, name: 'customer2'})
    customers.value.push({id: 3, name: 'customer3'})
    return {
      customers
    }
  },
  actions: {
    createCustomer(newCustomer: ICustomer): ICustomer {
      return this.createCustomer(newCustomer)
    },
    async getAll() {
      const response: ApiResponse = await http.get('/customers')
      this.customers = response.data
      console.log(this.customers)
      return response.data
    },
    async get(id: string) {
      const response: ApiResponse = await http.get(`/customers/${id}`)
      console.log(response)
      return response.data
    },
    async create(data: ICustomer) {
      const response: ApiResponse = await http.post('/customers', data)
      console.log(response)
      return response.data
    },
    async update(id: string, data: ICustomer) {
      const response: ApiResponse = await http.put(`/customers/${id}`, data)
      console.log(response)
      return response.data
    },
    async deleteIt(id: string) {
      const response: ApiResponse = await http.delete(`/customers/${id}`)
      console.log(response)
    },
    async deleteAll() {
      const response: ApiResponse = await http.delete(`/customers`)
      console.log(response)
    },
    async findByName(name: string) {
      const response: ApiResponse = await http.get(`/customers?name=${name}`)
      console.log(response)
      return response.data
    }
  }
})
