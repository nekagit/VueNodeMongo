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

const handleDelete = (id: number) => {
  console.log(id)
return
}

const showModal = ref(false)
const modalItem = ref()

const handleRowClick = (rowIndex: number) => {
    const clickedItem = tableItems.value[ rowIndex];
    modalItem.value = clickedItem;
  showModal.value = !showModal.value
}
</script>
<template>
  <section class="grid gap-4 p-4 text-black w-full h-screen">
   <div class="overflow-x-auto">
      <div class="w-full h-screen card bg-red-200 border border-red-400 p-4">
        <h1>ProductManagement</h1>
        <div v-if="showModal" style="width: 50%">
  <Modal v-model="showModal" backdrop>
    <template #header>
      <div class="grid grid-cols-2 my-3"> 
        <h1 class="font-medium">ID</h1> {{ modalItem.id }}
        <h1 class="font-medium">Name</h1> {{ modalItem.name }}
        <h1 class="font-medium">UnitPrice</h1> {{ modalItem.unitPrice }}
      </div>
    </template>
    
    <template #actions>
      <x-button
    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow my-3"
    size="sm"
    ghost
       @click="showModal = false">Exit</x-button>
    </template>
  </Modal>
</div>  
<div v-else>

         <Table
        v-model:sort="sort"
        expandable
        :headers="headers"
        :items="itemsSorted"
        class="my-5"
      >
      <template  #item-unitPrice="{ item }">
        <div class="mx-5">
          {{ item.unitPrice }}
        </div>
      </template>
      <template #row-actions="{item }">
        <x-button
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow z-10 cursor-pointer"
        size="sm"
         @click="handleDelete(item.id)"
        >Delete</x-button>
          <x-button
    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow my-3"
    size="sm"
    ghost
       @click="showModal = false">Edit</x-button>
  </template>
      </Table>
      </div>
</div>  
    </div>
    <!-- <div class="overflow-x-auto">
      <div class="w-full h-screen card bg-red-200 border border-red-400 p-4">
        <h1>CustomerManagement</h1>
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
      </div>
    </div>
      <div class="overflow-x-auto">
        <div class="w-full h-screen card bg-red-200 border border-red-400 p-4">
          <h1>CustomerInfo</h1>
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
        </div>
      </div>
        <div class="overflow-x-auto">
      <div class="w-full h-screen card bg-red-200 border border-red-400 p-4">
        <h1>Settings</h1>
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
      </div>
    </div> -->
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
