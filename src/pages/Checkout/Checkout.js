import React, { useEffect, useState } from 'react';

import styles from './Checkout.module.css';
import { LoadingIcon } from '../../Icons';
import { getProducts } from '../../dataService';
import { Fragment } from 'react/cjs/react.production.min';

// You are provided with an incomplete <Checkout /> component.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.

// Demo video - You can view how the completed functionality should look at: https://drive.google.com/file/d/1o2Rz5HBOPOEp9DlvE9FWnLJoW9KUp5-C/view?usp=sharing

// Once the <Checkout /> component is mounted, load the products using the getProducts function.
// Once all the data is successfully loaded, hide the loading icon.
// Render each product object as a <Product/> component, passing in the necessary props.
// Implement the following functionality:
//  - The add and remove buttons should adjust the ordered quantity of each product
//  - The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
//  - The total shown for each product should be calculated based on the ordered quantity and the price
//  - The total in the order summary should be calculated
//  - For orders over $1000, apply a 10% discount to the order. Display the discount text only if a discount has been applied.
//  - The total should reflect any discount that has been applied
//  - All dollar amounts should be displayed to 2 decimal places


export const Checkout  = () => {

  const [isloading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [overAllTotal, setOverAllTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts();
      setLoading(false);
      const orderProducts = products.map(product => ({ ...product, orderedQuantity: 0, total: 0 }));
      setProducts(orderProducts);
    }
    fetchData();
  },[]);

  const addProduct = (id) => {
    const upd = products.map(product => {
      if (product.id === id) {
        const ordCount = product.orderedQuantity + 1;
        const total = product.total + product.price;
        const oAT = overAllTotal + product.price;
        updateDiscount(oAT);
        return { ...product, availableCount: product.availableCount - 1, orderedQuantity: ordCount, total: Number(total.toFixed(2)) };
      }
      return product
    });
    setProducts(upd);
  }

  const removeProduct = (id) => {
    const upd = products.map(product => {
      if (product.id === id) {
        const ordCount = product.orderedQuantity - 1;
        const total = product.total - product.price;
        const oAT = overAllTotal - product.price;
        updateDiscount(oAT);
        return { ...product, availableCount: product.availableCount + 1, orderedQuantity: ordCount, total: Number(total.toFixed(2)) };
      }
      return product
    });
    setProducts(upd);
  }

  const updateDiscount = (total) => {
    if (total > 1000) {
      const discountLocal = Number(((total * 10) / 100).toFixed(2));
      setDiscount(discountLocal);
    } else if (total < 1000) {
      setDiscount(0);
    }
    setOverAllTotal(Number(total.toFixed(2)));
  }

  return (
    <div>
      <header className={styles.header}>
        <h1>Electro World</h1>
      </header>
      <main>
        {isloading ? <LoadingIcon /> :
          <Fragment>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Available</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  //  Products should be rendered here 
                  products.length > 0 ? products.map((product) =>
                    < Product {...product} key={product.id} addProduct={addProduct} removeProduct={removeProduct}></Product>
                  )
                    : null
                }
              </tbody>
            </table>
            <h2>Order summary</h2>
            {discount > 0 ? <p>Discount: $ {discount} </p> : null}
            <p>Total: ${overAllTotal}</p>
            {discount > 0 ? <p>Total After Discount: $ {Number((overAllTotal - discount).toFixed(2))}</p> : null}
          </Fragment>}
      </main>
    </div >
  );
};

const Product = ({ id, name, availableCount, price, orderedQuantity, total, addProduct, removeProduct }) => {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{availableCount}</td>
      <td>${price}</td>
      <td>{orderedQuantity}</td>
      <td>${total}</td>
      <td>
        <button disabled={availableCount === 0} onClick={_event => addProduct(id)} className={styles.actionButton}>+</button>
        <button disabled={orderedQuantity === 0} onClick={_event => removeProduct(id)} className={styles.actionButton}>-</button>
      </td>
    </tr>
  );
}