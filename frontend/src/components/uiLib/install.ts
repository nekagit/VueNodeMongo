import create from './create'
import * as components from './exportIndex'

export default create({
  components: Object.keys(components).map(
    (key) => components[key as keyof object],
  ),
})
