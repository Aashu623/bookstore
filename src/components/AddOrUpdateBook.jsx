"use client";

import * as Label from "@radix-ui/react-label";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, Spinner } from "@radix-ui/themes";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddOrUpdateBook({
  isUpdate = false,
  initialData = {},
}) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    category: initialData.category || "",
    language: initialData.language || "",
    author: initialData.author || "",
    description: initialData.description || "",
    price: initialData.price || "",
    stock: initialData.stock || "",
    image: initialData.image || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isUpdate ? `/api/books/${initialData._id}` : "/api/books";
      const response = await fetch(url, {
        method: isUpdate ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success(
          `${isUpdate ? "Book updated" : "Book added"} successfully!`
        );
        if (!isUpdate) {
          setFormData({
            title: "",
            category: "",
            language: "",
            author: "",
            description: "",
            price: "",
            stock: "",
            image: "",
          });
        }
      } else {
        toast.error(`Failed to ${isUpdate ? "update" : "add"} book.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="soft" color="yellow">
          {isUpdate ? "Edit" : "Add Book"}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0" />
        <Dialog.Content className="bg-white rounded-lg shadow-lg p-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-screen max-h-screen overflow-auto">
          <Dialog.Title className="text-2xl font-bold mb-4 text-orange-600">
            {isUpdate ? "Update Book" : "Add a New Book"}
          </Dialog.Title>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-4"
          >
            {[
              { label: "Title", name: "title", type: "text", required: true },
              {
                label: "Category",
                name: "category",
                type: "select",
                options: ["Novel", "MPPSC", "SSC", "UGCNET", "Stationary", "Other"],
                required: true,
              },
              {
                label: "Language",
                name: "language",
                type: "select",
                options: ["English", "Hindi"],
                required: true,
              },
              { label: "Author", name: "author", type: "text", required: true },
              { label: "Price", name: "price", type: "number", required: true },
              { label: "Stock", name: "stock", type: "number", required: true },
            ].map((field) => (
              <div key={field.name}>
                <Label.Root className="block text-gray-700 font-medium">
                  {field.label}
                </Label.Root>
                {field.type === "select" ? (
                  <select
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
                  >
                    <option value="" disabled>
                      Select {field.label.toLowerCase()}
                    </option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    required={field.required}
                    className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
                  />
                )}
              </div>
            ))}
            <div className="md:col-span-2">
              <Label.Root className="block text-gray-700 font-medium">
                Image URL
              </Label.Root>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Enter image URL"
                className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
              />
            </div>
            <div className="md:col-span-2">
              <Label.Root className="block text-gray-700 font-medium">
                Description
              </Label.Root>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter book description"
                className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
              ></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end gap-4">
              <Button
                type="submit"
                color="orange"
                variant="soft"
                disabled={loading}
              >
                {loading ? <Spinner /> : isUpdate ? "Update Book" : "Add Book"}
              </Button>
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
