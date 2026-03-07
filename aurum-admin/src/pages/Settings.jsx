import { useState } from 'react';
import { Save, Loader2, Sparkles } from 'lucide-react';

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    storeName: 'AURUM Perfume',
    storeEmail: 'admin@aurum.com',
    storePhone: '+1 234 567 8900',
    storeAddress: '123 Luxury Lane, Beverly Hills, CA 90210',
    currency: 'USD',
    taxRate: '10',
    shippingCost: '15',
    freeShippingThreshold: '200',
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate save
    setTimeout(() => {
      setLoading(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-aurum-text">Settings</h1>
        <p className="text-aurum-textMuted mt-1">Manage your store settings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Store Information */}
        <div className="bg-aurum-surface border border-aurum-border rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-aurum-gold" />
            <h3 className="text-lg font-semibold text-aurum-text">Store Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-aurum-textMuted mb-2">Store Name</label>
              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-aurum-surfaceLight border border-aurum-border rounded-lg text-aurum-text"
              />
            </div>
            <div>
              <label className="block text-sm text-aurum-textMuted mb-2">Email</label>
              <input
                type="email"
                name="storeEmail"
                value={settings.storeEmail}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-aurum-surfaceLight border border-aurum-border rounded-lg text-aurum-text"
              />
            </div>
            <div>
              <label className="block text-sm text-aurum-textMuted mb-2">Phone</label>
              <input
                type="text"
                name="storePhone"
                value={settings.storePhone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-aurum-surfaceLight border border-aurum-border rounded-lg text-aurum-text"
              />
            </div>
            <div>
              <label className="block text-sm text-aurum-textMuted mb-2">Address</label>
              <input
                type="text"
                name="storeAddress"
                value={settings.storeAddress}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-aurum-surfaceLight border border-aurum-border rounded-lg text-aurum-text"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-aurum-surface border border-aurum-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-aurum-text mb-6">Payment Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-aurum-textMuted mb-2">Currency</label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-aurum-surfaceLight border border-aurum-border rounded-lg text-aurum-text"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-aurum-textMuted mb-2">Tax Rate (%)</label>
              <input
                type="number"
                name="taxRate"
                value={settings.taxRate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-aurum-surfaceLight border border-aurum-border rounded-lg text-aurum-text"
              />
            </div>
          </div>
        </div>

        {/* Shipping Settings */}
        <div className="bg-aurum-surface border border-aurum-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-aurum-text mb-6">Shipping Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-aurum-textMuted mb-2">Shipping Cost ($)</label>
              <input
                type="number"
                name="shippingCost"
                value={settings.shippingCost}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-aurum-surfaceLight border border-aurum-border rounded-lg text-aurum-text"
              />
            </div>
            <div>
              <label className="block text-sm text-aurum-textMuted mb-2">Free Shipping Threshold ($)</label>
              <input
                type="number"
                name="freeShippingThreshold"
                value={settings.freeShippingThreshold}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-aurum-surfaceLight border border-aurum-border rounded-lg text-aurum-text"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-aurum-gold text-aurum-dark font-medium rounded-lg hover:bg-aurum-goldLight transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

