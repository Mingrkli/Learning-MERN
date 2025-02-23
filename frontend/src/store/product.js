import { create } from "zustand";

// With zustand, we can create a global state where we can put it any components if this app.jsx.
// Also makes it so that it only updates components that uses it so it saves time :D

export const useProductStore = create((set) => ({
    // The following 2 lines are basically the state and setState
    products: [],
    // Sets the products state with this setProducts
    // Instead of a local state, this is now a global state :D
    setProducts: (products) => set({ products }),
    // Creates a product
    createProduct: async (newProduct) => {
        // If the newProduct don't have a name, image, or price
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields." };
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json(); // Extracts the data
        // Sets the state of the products keeping whats already there and added the new data
        // we use data.data since in the backend controller we are returning by data: newProduct
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
    },
    // Here is get products
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        // sets the products to the data.data
        set({ products: data.data });
    },
    // Delete product by id
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // update the ui without needing to refresh the page
        set((state) => ({
            // product._id not pid since we are deleting that product
            products: state.products.filter((product) => product._id !== pid),
        }));
        return { success: true, message: data.message };
    },
    // Updated product by id
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // update the ui without needing to refresh the page
        set((state) => ({
            products: state.products.map((product) =>
                // product._id === pid since we are updated that product
                product._id === pid ? data.data : product
            ),
        }));

        return { success: true, message: data.message };
    },
}));
