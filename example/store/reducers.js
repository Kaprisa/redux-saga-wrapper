import productsReducer, {moduleName as productsModule} from './ducks/product'

export default {
  [productsModule]: productsReducer,
}
