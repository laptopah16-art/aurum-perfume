import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productAPI } from '../services/adminApi';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    category: '',
    fragranceType: '',
    stock: '',
    image: '',
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setFetching(true);
      setError('');
      
      const response = await productAPI.getById(id);
      const product = response.data || response;
      
      setFormData({
        name: product.name || '',
        brand: product.brand || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        category: product.category || '',
        fragranceType: product.fragranceType || '',
        stock: product.stock?.toString() || '',
        image: product.image || '',
      });
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to fetch product details');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const productData = {
        name: formData.name,
        brand: formData.brand,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        fragranceType: formData.fragranceType,
        stock: parseInt(formData.stock),
        image: formData.image,
      };

      await productAPI.update(id, productData);
      alert('Product updated successfully!');
      navigate('/admin/products');
    } catch (err) {
      console.error('Error updating product:', err);
      setError(err.response?.data?.message || 'Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-8 w-8 text-yellow-500" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-yellow-500 text-xl">Loading product...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-yellow-500 mb-6">Edit Product</h1>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-black border border-yellow-600 rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 gap-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-900 border border-yellow-600/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-300 placeholder-gray-500"
              placeholder="Enter product name"
            />
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Brand *
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-900 border border-yellow-600/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-300 placeholder-gray-500"
              placeholder="Enter brand name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 bg-gray-900 border border-yellow-600/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-300 placeholder-gray-500"
              placeholder="Enter product description"
            />
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 bg-gray-900 border border-yellow-600/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-300 placeholder-gray-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 py-2 bg-gray-900 border border-yellow-600/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-300 placeholder-gray-500"
                placeholder="0"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-900 border border-yellow-600/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-300"
            >
              <option value="">Select category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="unisex">Unisex</option>
              <option value="luxury">Luxury</option>
              <option value="signature">Signature</option>
            </select>
          </div>

          {/* Fragrance Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Fragrance Type *
            </label>
            <select
              name="fragranceType"
              value={formData.fragranceType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-900 border border-yellow-600/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-300"
            >
              <option value="">Select fragrance type</option>
              <option value="Eau de Parfum">Eau de Parfum</option>
              <option value="Eau de Toilette">Eau de Toilette</option>
              <option value="Parfum">Parfum</option>
              <option value="Cologne">Cologne</option>
              <option value="Perfume">Perfume</option>
              <option value="Extrait de Parfum">Extrait de Parfum</option>
              <option value="oriental">Oriental</option>
              <option value="floral">Floral</option>
              <option value="fresh">Fresh</option>
              <option value="woody">Woody</option>
              <option value="citrus">Citrus</option>
              <option value="spicy">Spicy</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-900 border border-yellow-600/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-300 placeholder-gray-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-black px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                'Update Product'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-4 py-2 border border-yellow-600 text-yellow-500 rounded-md hover:bg-gray-900 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;

