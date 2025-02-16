import React, { useEffect, useState } from "react";
import NewProduct from "../Components/NewProduct";
import ProductItem from "../Components/ProductItem";
import { toast } from "react-toastify";
import { MdSearch } from "react-icons/md";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://6795f905bedc5d43a6c3e8d8.mockapi.io/products"
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        toast.error("Failed to fetch products!", { autoClose: 2000 });
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const response = await fetch(
        "https://6795f905bedc5d43a6c3e8d8.mockapi.io/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
      const newProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      toast.success("Product added successfully!", { autoClose: 2000 });
    } catch (error) {
      toast.error("Failed to add Product!", { autoClose: 2000 });
    }
  };

  const updateProduct = async (updateProduct, id) => {
    try {
      const { pro_id } = products[id];
      const response = await fetch(
        `https://6795f905bedc5d43a6c3e8d8.mockapi.io/products/${pro_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateProduct),
        }
      );
      const updated = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((p, i) => (i === id ? updated : p))
      );
      toast.info("Product updated successfully!", { autoClose: 2000 });
    } catch (error) {
      toast.error("Failed to updated Product!", { autoClose: 2000 });
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { pro_id } = products[id];
      await fetch(
        `https://mockapi.io/projects/6795f905bedc5d43a6c3e8d9${pro_id}`,
        {
          method: "DELETE",
        }
      );
      setProducts((prevProducts) =>
        prevProducts.filter((_, index) => index !== id)
      );
      toast.error("Product deleted successfully!", { autoClose: 2000 });
    } catch (error) {
      toast.error("Failed to delete product!", { autoClose: 2000 });
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        {/* ช่องค้นหา */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded"
        />
        {/* ปุ่มค้นหา */}
        <button className="bg-blue-500 text-white p-2 rounded flex items-center">
          <MdSearch className="mr-2" />
          Search
        </button>
      </div>

      <NewProduct addProduct={addProduct} />

      {filteredProducts.length > 0 ? (
        <table className="min-w-full mt-6 border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <ProductItem
                key={index}
                id={index}
                product={product}
                updateProduct={updateProduct}
                deleteProduct={deleteProduct}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-6 text-center text-gray-500">
          No products found matching your search.
        </p>
      )}
    </>
  );
};

export default ProductPage;
