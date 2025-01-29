import React, { useRef, useState } from "react";
import { MdAdd } from "react-icons/md";

const NewProduct = ({ addProduct }) => {
  const dialog = useRef(); // ใช้ useRef ควบคุม dialog
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  const openDialog = () => dialog.current.showModal();
  const closeDialog = () => dialog.current.close();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // เพิ่มสินค้าใหม่
    addProduct({
      ...product,
      price: parseFloat(product.price),
      quantity: parseInt(product.quantity, 10),
    });

    setProduct({ name: "", description: "", price: "", quantity: "" }); // เคลียร์ฟอร์ม
    closeDialog(); // ปิด dialog
  };

  return (
    <>
      {/* ปุ่มเปิด dialog */}
      <button
        onClick={openDialog}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Add New Product
      </button>

      {/* Dialog */}
      <dialog
        ref={dialog}
        className="rounded-md w-[480px]"
        onClick={(e) => e.target === e.currentTarget && closeDialog()}
      >
        <form className="p-6" onSubmit={handleSubmit}>
          <h3 className="font-semibold text-xl mb-4">Add New Product</h3>

          <div className="mb-4">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="w-full p-2 border rounded mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label>Product Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Product Description"
              className="w-full p-2 border rounded mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label>Product Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Product Price"
              className="w-full p-2 border rounded mt-2"
              required
            />
          </div>

          <div className="mb-4">
            <label>Product Quantity</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="w-full p-2 border rounded mt-2"
              required
            />
          </div>

          <div className="mt-6 text-right space-x-2">
            <button
              type="button"
              onClick={closeDialog}
              className="rounded border border-gray-200 px-3 py-2 hover:bg-gray-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="rounded bg-teal-500 px-3 py-2 text-white hover:bg-teal-600"
            >
              Add Product
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default NewProduct;
