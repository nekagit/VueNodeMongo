<script setup lang="ts">
import Table from '@/components/uiLib/table/Table.vue';
import { useAppStateStore } from '@/stores/appState';

import { type TableHeader } from '@/components/uiLib/table/Table.vue';
import type { IProduct } from '@/interfaces/atoms/IProduct';
import { computed, ref } from 'vue';


const headers: TableHeader[] = [
  { text: '#', value: 'id', sortable: true, align: 'center' },
  { text: 'Name', value: 'name' },
  { text: 'UnitPrice', value: 'unitPrice' },
]
const { createProduct, getAll, items } = useAppStateStore()
const responseItems = ref<IProduct[]>(items)
async function fetchData() {
  responseItems.value = await getAll()
}

fetchData()    
console.log(items)
const sort = ref([])

const itemsSorted = computed<IProduct[]>(() => {
  const ite = responseItems.value.slice(0)

  return ite.sort((a: any, b: any) => {
    for (const s of sort.value) {
      const [key, asc] = (s as string).split(',')

      if (a[key] > b[key]) return asc === '-1' ? -1 : 1
      if (a[key] < b[key]) return asc === '-1' ? 1 : -1
    }

    return 0
  })
})

</script>
<template>
  <section class="grid gap-4 p-4 text-black w-full h-screen">
   <div class="overflow-x-auto">
      <div class="w-full h-screen card bg-blue-200 border border-blue-400 p-4">
        <h3>ProductManagement</h3>
        <button @click="">fetchAll</button>
         <Table
        v-model:sort="sort"
        expandable
        :headers="headers"
        :items="itemsSorted"
        class="my-5"
      >
      <template  #expanded-row="{ item }">
        <div class="mx-5">
          {{ item }}
        </div>
        </template>
        <template  #item-unitPrice="{ item }">
          <div class="mx-5">
          {{ item.unitPrice }}
        </div>
        </template>
      </Table>
        <!-- <div class="overflow-x-auto">
        <div class="grid gap-4 p-4 w-full h-full">
          <div class="card bg-blue-200 border border-blue-400 p-4">
              <table class="min-w-full bg-white shadow-md rounded-xl" aria-describedby="table-description">
                 <caption id="table-description">ProductTable</caption>
  
               <thead>
                <tr class="bg-blue-gray-100 text-gray-700">
                  <th class="py-3 px-4 text-left">Stock Name</th>
                  <th class="py-3 px-4 text-left">Price</th>
                  <th class="py-3 px-4 text-left">Quantity</th>
                  <th class="py-3 px-4 text-left">Total</th>
                  <th class="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody class="text-blue-gray-900">
                <tr class="border-b border-blue-gray-200">
                  <td class="py-3 px-4">Company A</td>
                  <td class="py-3 px-4">$50.25</td>
                  <td class="py-3 px-4">100</td>
                  <td class="py-3 px-4">$5025.00</td>
                  <td class="py-3 px-4">
                    <a href="#" class="font-medium text-blue-600 hover:text-blue-800">Edit</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> 
      </div>-->
      </div>
    </div>
    <!-- <div class="card bg-green-200 border border-green-400 p-4">
      <h3>CustomerManagement</h3>
      <div class="grid gap-4 p-4 w-full h-full">
     <div class="overflow-x-auto">
        <div class="grid gap-4 p-4 w-full h-full">
          <div class="card bg-green-200 border border-green-400 p-4">
              <table class="min-w-full bg-white shadow-md rounded-xl" aria-describedby="table-description">
                 <caption id="table-description">ProductTable</caption>
  
               <thead>
                <tr class="bg-blue-gray-100 text-gray-700">
                  <th class="py-3 px-4 text-left">Stock Name</th>
                  <th class="py-3 px-4 text-left">Price</th>
                  <th class="py-3 px-4 text-left">Quantity</th>
                  <th class="py-3 px-4 text-left">Total</th>
                  <th class="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody class="text-blue-gray-900">
                <tr class="border-b border-blue-gray-200">
                  <td class="py-3 px-4">Company A</td>
                  <td class="py-3 px-4">$50.25</td>
                  <td class="py-3 px-4">100</td>
                  <td class="py-3 px-4">$5025.00</td>
                  <td class="py-3 px-4">
                    <a href="#" class="font-medium text-blue-600 hover:text-blue-800">Edit</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
    <div class="card bg-yellow-200 border border-yellow-400 p-4">
      <h3>InvoiceManagement</h3>
      <div class="grid gap-4 p-4 w-full h-full">
        <div class="overflow-x-auto">
        <div class="grid gap-4 p-4 w-full h-full">
          <div class="card bg-yellow-200 border border-yellow-400 p-4">
              <table class="min-w-full bg-white shadow-md rounded-xl" aria-describedby="table-description">
                 <caption id="table-description">ProductTable</caption>
  
               <thead>
                <tr class="bg-blue-gray-100 text-gray-700">
                  <th class="py-3 px-4 text-left">Stock Name</th>
                  <th class="py-3 px-4 text-left">Price</th>
                  <th class="py-3 px-4 text-left">Quantity</th>
                  <th class="py-3 px-4 text-left">Total</th>
                  <th class="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody class="text-blue-gray-900">
                <tr class="border-b border-blue-gray-200">
                  <td class="py-3 px-4">Company A</td>
                  <td class="py-3 px-4">$50.25</td>
                  <td class="py-3 px-4">100</td>
                  <td class="py-3 px-4">$5025.00</td>
                  <td class="py-3 px-4">
                    <a href="#" class="font-medium text-blue-600 hover:text-blue-800">Edit</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div></div>
    <div class="card bg-red-200 border border-red-400 p-4">
      <h3>Settings</h3>
      <div class="grid grid-cols-2 gap-4 p-4 w-full h-full">
      </div></div> -->
  </section>
</template>

<style scoped>
.card {
  /* Optional: You can add additional styling for the cards here */
}
</style>
