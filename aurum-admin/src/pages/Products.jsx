import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { publicProductAPI, productAPI } from '../services/adminApi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [seeding, setSeeding] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Use public API to fetch products (no auth required)
      const response = await publicProductAPI.getAll();
      console.log('Products response:', response);
      
      // Handle the API response format: { success, count, data: [...] }
      let productsArray = [];
      
      if (response) {
        // Check if response has data property with products array
        if (Array.isArray(response)) {
          // Direct array response
          productsArray = response;
        } else if (response.data && Array.isArray(response.data)) {
          // response.data is the products array
          productsArray = response.data;
        } else if (response.products && Array.isArray(response.products)) {
          // Alternative format with 'products' key
          productsArray = response.products;
        }
      }
      
      setProducts(productsArray);
      console.log('Products loaded:', productsArray.length);
    } catch (err) {
      console.error('Error fetching products:', err);
      
      // Show sample products when API is not available
      const sampleProducts = [
        {
          _id: '1',
          name: 'Noir Absolu',
          brand: 'AURUM',
          price: 285,
          originalPrice: 340,
          category: 'luxury',
          fragranceType: 'oriental',
          size: '100ml',
          countInStock: 50,
          image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
          isBestSeller: true,
        },
        {
          _id: '2',
          name: 'Or Blanc',
          brand: 'AURUM',
          price: 220,
          category: 'women',
          fragranceType: 'floral',
          size: '75ml',
          countInStock: 75,
          image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800',
          isBestSeller: true,
        },
        {
          _id: '3',
          name: 'Aqua Regale',
          brand: 'AURUM',
          price: 175,
          category: 'women',
          fragranceType: 'fresh',
          size: '100ml',
          countInStock: 60,
          image: 'https://images.unsplash.com/photo-1523293188086-b431e93f9afb?w=800',
        },
        {
          _id: '4',
          name: 'Obsidian',
          brand: 'AURUM',
          price: 260,
          category: 'men',
          fragranceType: 'woody',
          size: '100ml',
          countInStock: 45,
          image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800',
          isBestSeller: true,
        },
        {
          _id: '5',
          name: 'Lumière Éternelle',
          brand: 'AURUM',
          price: 195,
          category: 'luxury',
          fragranceType: 'floral',
          size: '50ml',
          countInStock: 40,
          image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800',
          isNewArrival: true,
        },
        {
          _id: '6',
          name: 'Ambre Mystique',
          brand: 'AURUM',
          price: 310,
          category: 'luxury',
          fragranceType: 'oriental',
          size: '100ml',
          countInStock: 30,
          image: 'https://images.unsplash.com/photo-1608041690656-3e9b5b3a6c2c?w=800',
          isNewArrival: true,
        },
        {
          _id: '7',
          name: 'Rosé Imperial',
          brand: 'AURUM',
          price: 240,
          category: 'women',
          fragranceType: 'floral',
          size: '75ml',
          countInStock: 55,
          image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800',
          isNewArrival: true,
        },
        {
          _id: '8',
          name: 'Oud Sauvage',
          brand: 'AURUM',
          price: 350,
          category: 'men',
          fragranceType: 'woody',
          size: '100ml',
          countInStock: 35,
          image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800',
          isBestSeller: true,
        },
      ];
      
      setProducts(sampleProducts);
      setError('Showing sample products (backend not connected)');
    } finally {
      setLoading(false);
    }
  };

  const handleSeedProducts = async () => {
    if (!window.confirm('This will add 8 sample products to your database. Continue?')) {
      return;
    }

    setSeeding(true);
    
    const productsToSeed = [
      {
        name: 'Noir Absolu',
        brand: 'AURUM',
        price: 285,
        originalPrice: 340,
        category: 'luxury',
        fragranceType: 'oriental',
        size: '100ml',
        description: 'A deep, mysterious fragrance with notes of amber, vanilla, and precious woods.',
        rating: 4.9,
        reviews: 312,
        isBestSeller: true,
        countInStock: 50,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
      },
      {
        name: 'Or Blanc',
        brand: 'AURUM',
        price: 220,
        category: 'women',
        fragranceType: 'floral',
        size: '75ml',
        description: 'An elegant floral fragrance featuring jasmine, rose, and lily of the valley.',
        rating: 4.8,
        reviews: 204,
        isBestSeller: true,
        countInStock: 75,
        image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800',
      },
      {
        name: 'Aqua Regale',
        brand: 'AURUM',
        price: 175,
        category: 'women',
        fragranceType: 'fresh',
        size: '100ml',
        description: 'A refreshing aquatic scent with sea notes, citrus, and soft musk.',
        rating: 4.7,
        reviews: 189,
        countInStock: 60,
        image: 'https://images.unsplash.com/photo-1523293188086-b431e93f9afb?w=800',
      },
      {
        name: 'Obsidian',
        brand: 'AURUM',
        price: 260,
        category: 'men',
        fragranceType: 'woody',
        size: '100ml',
        description: 'A powerful woody fragrance with sandalwood, cedar, and patchouli.',
        rating: 4.9,
        reviews: 267,
        isBestSeller: true,
        countInStock: 45,
        image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800',
      },
      {
        name: 'Lumière Éternelle',
        brand: 'AURUM',
        price: 195,
        category: 'luxury',
        fragranceType: 'floral',
        size: '50ml',
        description: 'A luminous floral fragrance with tuberose, ylang-ylang, and warm amber.',
        rating: 4.8,
        reviews: 156,
        isNewArrival: true,
        countInStock: 40,
        image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800',
      },
      {
        name: 'Ambre Mystique',
        brand: 'AURUM',
        price: 310,
        category: 'luxury',
        fragranceType: 'oriental',
        size: '100ml',
        description: 'An opulent oriental fragrance with rare amber, frankincense, and myrrh.',
        rating: 5.0,
        reviews: 98,
        isNewArrival: true,
        countInStock: 30,
        image: 'https://images.unsplash.com/photo-1608041690656-3e9b5b3a6c2c?w=800',
      },
      {
        name: 'Rosé Imperial',
        brand: 'AURUM',
        price: 240,
        category: 'women',
        fragranceType: 'floral',
        size: '75ml',
        description: 'A luxurious rose fragrance with Turkish rose, peony, and soft cashmere.',
        rating: 4.7,
        reviews: 143,
        isNewArrival: true,
        countInStock: 55,
        image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800',
      },
      {
        name: 'Oud Sauvage',
        brand: 'AURUM',
        price: 350,
        category: 'men',
        fragranceType: 'woody',
        size: '100ml',
        description: 'An intense oud fragrance with agarwood, leather, and spice.',
        rating: 4.9,
        reviews: 211,
        isBestSeller: true,
        countInStock: 35,
        image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800',
      },
    ];

    try {
      let addedCount = 0;
      for (const productData of productsToSeed) {
        try {
          await productAPI.create(productData);
          addedCount++;
        } catch (prodErr) {
          console.error('Error adding product:', productData.name, prodErr);
        }
      }
      
      if (addedCount === 0) {
        alert('No products were added. You may need to be logged in as admin.');
      } else {
        alert(`Successfully added ${addedCount} products!`);
      }
      fetchProducts(); // Refresh the list
    } catch (err) {
      console.error('Error seeding products:', err);
      alert('Failed to seed products. Please make sure you are logged in as admin.');
    } finally {
      setSeeding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setDeleteLoading(id);
      await productAPI.delete(id);
      setProducts(products.filter((p) => p._id !== id));
      alert('Product deleted successfully!');
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product. You may need to be logged in as admin.');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-64">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <span className="ml-4 text-yellow-500">Loading products...</span>
    </div>
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-yellow-500">Products</h1>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-yellow-500">Products</h1>
        <div className="flex gap-2">
          {products.length === 0 && (
            <button
              onClick={handleSeedProducts}
              disabled={seeding}
              className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium disabled:opacity-50"
            >
              {seeding ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Seeding...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Seed 8 Products
                </>
              )}
            </button>
          )}
          <Link
            to="/admin/products/add"
            className="bg-yellow-600 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Product
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
          {error}
          <button 
            onClick={fetchProducts}
            className="ml-4 text-red-300 underline hover:text-red-100"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="bg-black border border-yellow-600 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-yellow-600/30">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-black divide-y divide-yellow-600/30">
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                    No products found. Add your first product!
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={product.image || 'https://via.placeholder.com/50'}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded border border-yellow-600/30"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/50';
                        }}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-yellow-500">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">{product.brand}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-yellow-500">
                        ${product.price?.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          (product.countInStock || 0) > 0
                            ? 'bg-green-900/50 text-green-400 border border-green-600'
                            : 'bg-red-900/50 text-red-400 border border-red-600'
                        }`}
                      >
                        {(product.countInStock || 0) > 0 ? `${product.countInStock || 0} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/admin/products/edit/${product._id}`}
                          className="text-yellow-500 hover:text-yellow-400 flex items-center gap-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          disabled={deleteLoading === product._id}
                          className="text-red-500 hover:text-red-400 flex items-center gap-1 disabled:opacity-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {deleteLoading === product._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;

