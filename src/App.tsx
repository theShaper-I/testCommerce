import React, {useContext, useState} from 'react';
import { Product } from "./components/Product";
import { useProducts } from "./hooks/products";
import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";
import { Modal } from "./components/Modal";
import { CreateProduct } from "./components/CreateProduct";
import {IProduct} from "./models";
import {ModalContext} from "./context/ModalContext";

function App() {
  const { error, loading, products, addProduct } = useProducts()
  const { modal, open, close } = useContext(ModalContext);

  const createHandler = (product: IProduct) => {
    close()
    addProduct(product)
  }

  return (
    <div className={'container mx-auto max-w-2xl pt-5'}>
      { error && <ErrorMessage error={error} />}
      { loading && <Loader />}
      { products.map((product) => <Product product={product} key={product.id} />) }

      {modal && <Modal onClose={close} title={'New Product'}>
        <CreateProduct onCreate={createHandler}/>
      </Modal>}

      <button onClick={open} className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2'>+</button>
    </div>
  );
}

export default App;
