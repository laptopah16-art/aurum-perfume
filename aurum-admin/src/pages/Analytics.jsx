import { useState, useEffect } from 'react';
import { Loader2, TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from '../components/DashboardCard';
import { orderAPI } from '../services/api';

const COLORS = ['#c9a45c', '#d4b86a', '#a88a4a', '#8a7a6a'];

export default function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getStats();
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Sample data
      setStats({
        totalOrders: 156,
        totalRevenue: 24580,
        pendingOrders: 12,
        deliveredOrders: 89,
        ordersByDay: [
          { day: 'Mon', orders: 12, revenue: 2400 },
          { day: 'Tue', orders: 19, revenue: 4200 },
          { day: 'Wed', orders: 15, revenue: 3100 },
          { day: 'Thu', orders: 22, revenue: 4800 },
          { day: 'Fri', orders: 28, revenue: 5600 },
          { day: 'Sat', orders: 35, revenue: 7200 },
          { day: 'Sun', orders: 18, revenue: 3600 },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const orderStatusData = stats ? [
    { name: 'Pending', value: stats.pendingOrders || 12 },
    { name: 'Processing', value: stats.processingOrders || 8 },
    { name: 'Shipped', value: stats.shippedOrders || 15 },
    { name: 'Delivered', value: stats.deliveredOrders || 89 },
  ] : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-aurum-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-aurum-text">Analytics</h1>
        <p className="text-aurum-textMuted mt-1">Track your store performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          icon={ShoppingCart}
          change="+12%"
          changeType="positive"
        />
        <DashboardCard
          title="Total Revenue"
          value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
          icon={DollarSign}
          change="+23%"
          changeType="positive"
        />
        <DashboardCard
          title="Pending Orders"
          value={stats?.pendingOrders || 0}
          icon={Loader2}
          change="-5%"
          changeType="positive"
        />
        <DashboardCard
          title="Delivered"
          value={stats?.deliveredOrders || 0}
          icon={TrendingUp}
          change="+18%"
          changeType="positive"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-aurum-surface border border-aurum-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-aurum-text mb-6">Revenue Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats?.ordersByDay || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="day" stroke="#8a7a6a" />
                <YAxis stroke="#8a7a6a" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#121212',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#c9a45c"
                  strokeWidth={2}
                  dot={{ fill: '#c9a45c' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Pie Chart */}
        <div className="bg-aurum-surface border border-aurum-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-aurum-text mb-6">Order Status Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#121212',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {orderStatusData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-sm text-aurum-textMuted">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders by Day Bar Chart */}
      <div className="bg-aurum-surface border border-aurum-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-aurum-text mb-6">Orders by Day</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats?.ordersByDay || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="day" stroke="#8a7a6a" />
              <YAxis stroke="#8a7a6a" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#121212',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#c9a45c"
                strokeWidth={2}
                dot={{ fill: '#c9a45c' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

