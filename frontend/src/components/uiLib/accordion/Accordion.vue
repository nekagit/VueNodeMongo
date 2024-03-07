<script lang="ts">
const accordionProps = {
  tag: {
    type: String,
    default: 'div',
  },
  disabled: Boolean,
  expanded: Boolean,
  showIcon: {
    type: Boolean,
    default: true,
  },
  icon: String,
  iconAlign: String as PropType<AccordionItemAlign>,
}

export type AccordionProps = ExtractPublicPropTypes<typeof accordionProps>

export type AccordionInjection = AccordionProps & {
  isInsideAccordion: boolean;
}

type InternalClasses = 'wrapper'
export interface AccordionTheme extends ThemeComponent<AccordionProps, InternalClasses> {}

export default {
  name: 'XAccordion',
  validators: {},
}
</script>

<script setup lang="ts">
import { provide, type ExtractPublicPropTypes, type PropType } from 'vue'
import { injectAccordionKey } from '../composables/keys'
import { useTheme, type ThemeComponent } from '../composables/useTheme'
import type { AccordionItemAlign } from './AccordionItem.vue'

const props = defineProps(accordionProps)

provide(injectAccordionKey, { ...props, isInsideAccordion: true })

const { styles, classes, className } = useTheme('Accordion', {}, props)
</script>

<template>
  <div
    :style="styles"
    :class="[
      className,
      classes.wrapper,
    ]"
  >
    <slot></slot>
  </div>
</template>
../ui/src/composables/useTheme../ui/src/composables/keys