import { useState } from 'react';
import { Plus, Tag, Trash2, Loader2 } from 'lucide-react';

export default function Coupons() {
  const [coupons, setCoupons] = useState([
    { _id: '1', code: 'WELCOME20', discount: 20, expiryDate: '2024-12-31', active: true },
    { _id: '2', code: 'LUXURY10', discount: 10, expiryDate: '2024-11-30', active: true },
    { _id: '3', code: 'SUMMER25', discount: 25, expiryDate: '2024-10-15', active: false },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', expiryDate: '' });

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setCoupons([...coupons, { ...newCoupon, _id: Date.now().toString(), active: true }]);
      setNewCoupon({ code: '', discount: '', expiryDate: '' });
      setShowModal(false);
      setLoading(false);
    }, 1000);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this coupon?')) {
      setCoupons(coupons.filter(c => c._id !== id));
    }
  };

  const toggleActive = (id) => {
    setCoupons(coupons.map(c => c._id === id ? { ...c, active: !c.active } : c));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-aurum-text">Coupons</h1>
          <p className="text-aurum-textMuted mt-1">Manage discount coupons</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-aurum-gold text-aurum-dark font-medium rounded-lg hover:bg-aurum-goldLight"
        >
          <Plus size={20} />
          Add Coupon
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div key={coupon._id} className={`bg-aurum-surface border rounded-xl p-6 ${coupon.active ? 'border-aurum-gold/30' : 'border-aurum-border opacity-60'}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-aurum-gold/20 flex items-center justify-center">
                  <Tag className="w-5 h-5 text-aurum-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-aurum-text">{coupon.code}</h3>
                  <p className="text-2xl font-bold text-aurum-gold">{coupon.discount}% OFF</p>
                </div>
              </div>
              <button onClick={() => handleDelete(coupon._id)} className="p-2 text-aurum-textMuted hover:text-red-400">
                <Trash2 size={18} />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-aurum-border flex items-center justify-between">
              <div>
                <p className="text-xs text-aurum-textMuted">Expires</p>
                <p className="text-sm text-aurum-text">{new Date(coupon.expiryDate).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => toggleActive(coupon._id)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${coupon.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}
              >
                {coupon.active ? 'Active' : 'Inactive'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-aurum-surface border border-aurum-border rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-aurum-text mb-4">Create Coupon</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm text-aurum-textMuted mb-2">Coupon Code</label>
                <input
                  type="text"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-3 bg-aurum-surfaceLight border border-aurum-border rounded-lg text-aurum-text"
                  placeholder="SUMMER20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-aurum-textMuted mb-2">Discount (%)</label>
                <input
                  type="number"
                  value={newCoupon.discount}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                  className="w-full px-4 py-3 bg-aurum-surfaceLight border border-aurum-border rounded-lg text-aurum-text"
                  placeholder="20"
                  min="1"
                  max="100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-aurum-textMuted mb-2">Expiry Date</label>
                <input
                  type="date"
                  value={newCoupon.expiryDate}
                  onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                  className="w-full px-4 py-3 bg-aurum-surfaceLight border border-aurum-border rounded-lg text-aurum-text"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 text-aurum-textMuted hover:text-aurum-text"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-aurum-gold text-aurum-dark font-medium rounded-lg hover:bg-aurum-goldLight disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

