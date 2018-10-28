import React from 'react'
import {productSagaTrigger, moduleName as productModule} from '../store/ducks/product'
import {connect} from 'react-redux'

class Shop extends React.Component {
  componentDidMount() {
    if (!this.props.products.length) {
      this.props.productSagaTrigger('all')
    }
  }
  render() {
    const {products, productSagaTrigger} = this.props
    return (
      <div>
        <ul>
          {products.map(p => <li>{p.name}</li>)}
        </ul>
        <input
          onKeyDown={e => e.keyCode === 13 ? productSagaTrigger('add', { name: e.target.value }) : null}
        />
      </div>
    )
  }
}

export default connect(state => ({
  products: state[productModule].products
}), {productSagaTrigger})(Shop)
