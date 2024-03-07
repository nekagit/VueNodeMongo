<script lang="ts">
export default { name: 'XThemeProvider' }
</script>

<script setup lang="ts">
import { inject, provide, ref, unref, watchEffect, type PropType } from 'vue';
import { injectThemeStyles, type UITheme } from '../../theme';
import { injectThemeKey } from '../composables/keys';

const props = defineProps({
  theme: Object as PropType<UITheme>,
})

const initialTheme = inject(injectThemeKey, {})
const theme = ref<UITheme>(props.theme || unref(initialTheme) || {})

provide(injectThemeKey, theme)

watchEffect(() => {
  theme.value = props.theme || unref(initialTheme) || {}

  if (theme.value.styles) injectThemeStyles(theme.value.name || '', theme.value.styles)
})
</script>

<template>
  <slot></slot>
</template>
../ui/src/composables/keys../ui/src/theme