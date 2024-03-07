import type { InjectionKey, MaybeRef } from 'vue'
import type { AccordionInjection } from '../components/accordion'
import type { ButtonGroupInjection } from '../components/button/ButtonGroup.vue'
import type { FormInjection } from '../components/form/Form.vue'
import type { NotificationInjection } from '../components/notifications/Notifications.vue'
import type { TabGroupInjection } from '../components/tab/TabGroup.vue'
import type { UIOptions } from '../create'
import type { FormGroupInjection } from '../formGroup'
import type { IconInjection } from '../icon/Icon.vue'
import type { UITheme } from '../theme'

export const injectOptionsKey = Symbol() as InjectionKey<UIOptions>
export const injectThemeKey = Symbol() as InjectionKey<MaybeRef<UITheme>>
export const injectTabGroupKey = Symbol() as InjectionKey<TabGroupInjection>
export const injectFormKey = Symbol() as InjectionKey<FormInjection>
export const injectFormGroupKey = Symbol() as InjectionKey<FormGroupInjection>
export const injectIconsKey = Symbol() as InjectionKey<IconInjection>
export const injectButtonGroupKey = Symbol() as InjectionKey<ButtonGroupInjection>
export const injectNotificationKey = Symbol() as InjectionKey<NotificationInjection>
export const injectAccordionKey = Symbol() as InjectionKey<AccordionInjection>
