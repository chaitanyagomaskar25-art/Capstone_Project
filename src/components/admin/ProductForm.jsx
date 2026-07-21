import React, { useEffect, useState } from "react";

const ProductForm = ({ initialData, onSubmit, buttonText }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        price: initialData.price,
        category: initialData.category,
        image: initialData.image,
        description: initialData.description,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
  e.preventDefault();

  if (
    !formData.title.trim() ||
    !formData.price ||
    !formData.category.trim() ||
    !formData.image.trim() ||
    !formData.description.trim()
  ) {
    alert("Please fill all fields.");
    return;
  }

  onSubmit(formData);
};
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Product Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <br />
      <br />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <br />
      <br />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />

      <br />
      <br />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
        required
      />

      <br />
      <br />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <br />
      <br />

      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default ProductForm;
