<script lang="ts">
const tableProps = {
    handleRowClick: {
    type: Function as PropType<(row: HTMLElement) => void>,
    default: () => {},
  },
  headers: {
    type: Array as PropType<TableHeader[]>,
    default: () => [],
  },
  items: {
    type: Array,
    default: () => [],
  },
  sort: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  loading: Boolean,
  loadingSkeleton: Boolean,
  loadingLines: {
    type: [Number, String],
    default: 3,
  },
  error: Boolean,
  dense: Boolean,
  fixed: Boolean,
  striped: Boolean,
  pointer: Boolean,
  scrollable: {
    type: Boolean,
    default: true,
  },
  stickyHeader: {
    type: Boolean,
    default: true,
  },
  expandable: Boolean,
}

export type TableHeader = {
  sortable?: boolean;
  sort?: string[];
  align?: TableHeaderAlign;
  value?: string;
  text?: string;
  width?: string | number;
  truncate?: boolean;
  skeletonShape?: SkeletonShape;
}

export type TableProps = ExtractPublicPropTypes<typeof tableProps>

type InternalClasses = 'wrapper' | 'table' | 'loadingWrapper'
export interface TableTheme extends ThemeComponent<TableProps, InternalClasses> {}

export default { name: 'XTable' }
</script>

<script setup lang="ts" generic="T">
import { ref, watch, type ExtractPublicPropTypes, type PropType } from 'vue'
import { useTheme, type ThemeComponent } from '../composables/useTheme'

import XIcon from '../icon/Icon.vue'
import Modal from '../modal/Modal.vue'
import type { SkeletonShape } from '../skeleton/Skeleton.vue'
import XSkeleton from '../skeleton/Skeleton.vue'
import XSpinner from '../spinner/Spinner.vue'
import XTableBody from './TableBody'
import XTableCell from './TableCell.vue'
import XTableHead from './TableHead.vue'
import XTableHeader, { type TableHeaderAlign, type TableHeaderSort } from './TableHeader.vue'
import XTableRow from './TableRow.vue'

import { chevronDownIcon } from '../common/icons'

const props = defineProps({
  ...tableProps,
  items: {
    type: Array as PropType<T[]>,
    default: () => [],
  },
})

type internalT = T & {
  __expanded?: boolean;
}

function clone<T>(source: T[]): T[] {
  try {
    return JSON.parse(JSON.stringify(source))
  } catch (e) {
    return []
  }
}

const internalItems = ref<internalT[]>([])
const tableItems = ref<T[]>(props.items)

watch(() => props.items, (newValue) => {
  if (props.expandable) internalItems.value = clone(newValue as any)
}, { immediate: true })

const emit = defineEmits(['update:sort', 'click-row'])

function getSort(headerValue: string | undefined, sort: string[]): TableHeaderSort {
  if (!headerValue) return undefined

  for (let i = 0; i < sort.length; i++) {
    const { 0: value, 1: order } = sort[i].split(',')

    if (headerValue === value) {
      if (parseInt(order) > 0) return 1
      else return -1
    }
  }

  return undefined
}

function sortHeader(header: TableHeader) {
  // update sort array
  const sort = props.sort.slice(0)
  let exists = false

  for (let i = 0; i < sort.length; i++) {
    const { 0: value, 1: order } = sort[i].split(',')

    if (value === header.value) {
      exists = true

      if (order === '-1') {
        // update position to 1
        sort.splice(i, 1, `${header.value},1`)
        break
      } else if (order === '1') {
        // delete position
        sort.splice(i, 1)
        break
      }
    }
  }

  if (!exists) sort.push(`${header.value},-1`)

  emit('update:sort', sort)
}

function getValue(item: any, path: string | string[] | undefined) {
  if (!path) return ''
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g)
  const result = pathArray?.reduce((prevObj: any, key: string) => prevObj && prevObj[key], item)

  return result ?? ''
}

const { styles, classes, className } = useTheme('Table', {}, props)



const handleCreate= () => {

}

</script>

<template>

    <slot name="title"></slot>
    <slot name="actions">
      
      <x-button
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-3 border border-gray-400 rounded shadow my-3"
      size="sm"
      ghost
      @click="handleCreate()">Create Product</x-button>
     
    </slot>
<div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
      

    <table
      :style="styles"
      :class="classes.table"
      class="min-w-full text-left text-sm font-light text-surface dark:text-white"
    >
      <x-table-head class="border-b border-neutral-200 font-medium dark:border-white/10"> 
        <x-table-header v-if="expandable" width="48" class="!p-0" :sticky-header="stickyHeader"/>
        <x-table-header
          v-for="(header, index) in headers"
          :key="index"
          :sticky-header="stickyHeader"
          :text-align="header.align"
          :sort="getSort(header.value, sort)"
          :sortable="header.sortable"
          :width="header.width"
          scope="col" class="px-6 py-4"
          @click="header.sortable ? sortHeader(header) : null"
        >
          <slot :name="`header-${header.value}`" :header="header">
            {{ header.text }}
          </slot>
        </x-table-header>
      </x-table-head>
      <x-table-body>
        <template v-if="loading">
          <x-table-row
            v-for="(item, index) in Number(loadingLines)"
            :key="index"
            :striped="striped"
           class="border-b border-neutral-200 dark:border-white/10">
            <x-table-cell
              v-for="(header, index2) in headers"
              :key="index2"
              :text-align="header.align"
              :width="header.width"
              :dense="dense"
              :fixed="fixed"
            >
              <slot :name="`loading-${header.value}`" :item="item">
                <x-skeleton
                  class="max-w-[60%]"
                  :shape="header.skeletonShape || 'line'"
                  :class="{
                    'mx-auto': header.align === 'center',
                    'ml-auto': header.align === 'right',
                  }"
                />
              </slot>
            </x-table-cell>
          </x-table-row>
        </template>
        <template v-else-if="error">
          <tr>
            <td :colspan="headers.length">
              <slot name="error"></slot>
            </td>
          </tr>
        </template>
        <template v-else-if="!items || items.length === 0">
          <tr>
            <td :colspan="headers.length">
              <slot name="empty"></slot>
            </td>
          </tr>
        </template>
        <template v-for="(item, index) in items" v-else :key="index">
          <x-table-row
            :pointer="pointer"
            :striped="striped"
            class="hover:bg-white"
            >
          
          <x-table-cell v-if="expandable" width="48" class="!p-1">
            <slot name="row-actions" :item="item"></slot>
            <button type="button" class="p-4" @click="internalItems[index].__expanded = !internalItems[index].__expanded">
                <x-icon
                  :icon="chevronDownIcon"
                  :size="dense ? 'xs' : 'md'"
                  class="transition-transform whitespace-nowrap px-6 py-4 font-medium"
                  :class="{
                    'rotate-180': internalItems[index]?.__expanded,
                  }"
                />
              </button>
            </x-table-cell>
            <x-table-cell
              v-for="(header, index2) in headers"
              :key="index2"
              :text-align="header.align"
              :truncate="header.truncate"
              :width="header.width"
              :dense="dense"
                  class="transition-transform whitespace-nowrap px-6 py-4"
              :fixed="fixed"
            >
              <slot :name="`item-${header.value}`" :item="item">
                {{ getValue(item, header.value) }}
              </slot>
            </x-table-cell>
          </x-table-row>
               
        </template>
      </x-table-body>
      <div
        v-if="loading"
        :class="classes.loadingWrapper"
      >
        <x-spinner size="lg"/>
      </div>
    </table>

      </div>
    </div>
  </div>
</div>

</template>
