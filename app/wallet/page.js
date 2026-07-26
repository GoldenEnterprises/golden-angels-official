'use client';
import { useState, useRef, useEffect } from 'react';
import { AuthProvider, useAuth } from '../../components/AuthProvider';
import LoggedInLayout from '../../components/LoggedInLayout';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, DollarSign, CreditCard, Send, Download, Plus, BarChart3, PieChart, Clock, ChevronRight } from 'lucide-react';

const holdings = [
  { name: 'NeuroFlow AI', ticker: 'NFAI', shares: 200, avgCost: 35.00, currentPrice: 42.50, logo: 'N', color: '#7B68EE' },
  { name: 'BioNova Labs', ticker: 'BNOV', shares: 50, avgCost: 120.00, currentPrice: 156.80, logo: 'B', color: '#FF6B6B' },
  { name: 'Aether Space', ticker: 'AETH', shares: 25, avgCost: 200.00, currentPrice: 234.50, logo: 'A', color: '#DDA0DD' },
  { name: 'Solaris Grid', ticker: 'SOLG', shares: 500, avgCost: 22.00, currentPrice: 28.90, logo: 'S', color: '#4ECDC4' },
  { name: 'MediChain', ticker: 'MDCH', shares: 100, avgCost: 58.00, currentPrice: 67.40, logo: 'M', color: '#74B9FF' },
];

const transactions = [
  { id: 1, type: 'buy', name: 'NeuroFlow AI', shares: 50, price: 41.20, total: 2060, time: '2 hours ago' },
  { id: 2, type: 'sell', name: 'GreenHarvest', shares: 100, price: 9.10, total: 910, time: '1 day ago' },
  { id: 3, type: 'deposit', amount: 10000, time: '3 days ago' },
  { id: 4, type: 'buy', name: 'Aether Space', shares: 10, price: 228.00, total: 2280, time: '1 week ago' },
  { id: 5, type: 'dividend', name: 'BioNova Labs', amount: 125, time: '2 weeks ago' },
];

const chartData = [100, 102, 105, 103, 108, 110, 115, 112, 118, 120, 125, 122, 127]; // Sample portfolio data

function PortfolioChart({ data, height = 200 }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.clientWidth);
    }
    const handleResize = () => {
      if (containerRef.current) setWidth(containerRef.current.clientWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.clearRect(0, 0, width, height);

    const min = Math.min(...data) * 0.95;
    const max = Math.max(...data) * 1.05;
    const range = max - min;
    const stepX = width / (data.length - 1);

    // Draw grid lines
    ctx.strokeStyle = '#ffffff10';
    ctx.lineWidth = 1;
    for(let i=0; i<4; i++) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Line
    ctx.beginPath();
    ctx.strokeStyle = 'var(--gold)'; // Gold line for portfolio
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    data.forEach((val, i) => {
      const x = i * stepX;
      const y = height - ((val - min) / range) * height;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        // Curve to make it wavy
        const prevX = (i - 1) * stepX;
        const prevY = height - ((data[i - 1] - min) / range) * height;
        const cpX = (prevX + x) / 2;
        ctx.bezierCurveTo(cpX, prevY, cpX, y, x, y);
      }
    });
    ctx.stroke();

    // Fill area under curve
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(212, 175, 55, 0.3)'); // Gold with opacity
    gradient.addColorStop(1, 'rgba(212, 175, 55, 0.0)');
    
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

  }, [data, width, height]);

  return (
    <div ref={containerRef} className="w-full relative">
      <canvas ref={canvasRef} className="block w-full" />
    </div>
  );
}

function PageContent() {
  const { user, loading } = useAuth();
  const [timeframe, setTimeframe] = useState('1M');

  if (loading || !user) return null;

  const totalValue = holdings.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0) + 12450; // add some cash balance
  const totalCost = holdings.reduce((sum, h) => sum + (h.shares * h.avgCost), 0) + 12450;
  const totalPL = totalValue - totalCost;
  const plPct = (totalPL / totalCost) * 100;

  return (
    <LoggedInLayout>
      <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gold/10 rounded-xl text-gold">
            <Wallet size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Your Portfolio</h1>
            <p className="text-gray-400">Track and manage your private equity assets</p>
          </div>
        </div>

        {/* Hero Balance Card */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-8 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
            <div>
              <p className="text-gray-400 font-medium mb-2">Total Portfolio Value</p>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-3">
                $127,450<span className="text-gray-500">.00</span>
              </h2>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 font-bold flex items-center gap-1">
                  <ArrowUpRight size={18} />
                  +$3,240.00
                </span>
                <span className="text-gray-400 font-medium">Past 24 hours</span>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6 md:mt-0 bg-dark-bg p-1.5 rounded-xl border border-dark-border">
              {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map(t => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    timeframe === t 
                      ? 'bg-gold text-dark-bg shadow-sm' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-dark-border/50">
            <PortfolioChart data={chartData} height={220} />
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-6 bg-gold/10 border border-gold/20 rounded-2xl hover:bg-gold/20 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-gold text-dark-bg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-gold/20">
              <Plus size={24} />
            </div>
            <span className="text-gold font-bold">Add Funds</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-6 bg-dark-card border border-dark-border rounded-2xl hover:border-gray-500 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-dark-bg border border-dark-border text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Send size={20} />
            </div>
            <span className="text-gray-300 font-medium">Transfer</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-6 bg-dark-card border border-dark-border rounded-2xl hover:border-gray-500 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-dark-bg border border-dark-border text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Download size={20} />
            </div>
            <span className="text-gray-300 font-medium">Withdraw</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-6 bg-dark-card border border-dark-border rounded-2xl hover:border-gray-500 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-dark-bg border border-dark-border text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <CreditCard size={20} />
            </div>
            <span className="text-gray-300 font-medium">Card</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Holdings List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 size={20} className="text-gold" />
                Your Assets
              </h3>
              <button className="text-gold text-sm font-medium hover:underline flex items-center">
                View All <ChevronRight size={16} />
              </button>
            </div>
            
            <div className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-dark-border text-sm font-medium text-gray-400 bg-dark-bg/50">
                <div className="col-span-5 md:col-span-4">Asset</div>
                <div className="col-span-3 text-right hidden md:block">Price</div>
                <div className="col-span-3 text-right">Holdings</div>
                <div className="col-span-4 md:col-span-2 text-right">Return</div>
              </div>
              
              <div className="divide-y divide-dark-border">
                {holdings.map((h, i) => {
                  const currentValue = h.shares * h.currentPrice;
                  const totalCost = h.shares * h.avgCost;
                  const pl = currentValue - totalCost;
                  const pct = (pl / totalCost) * 100;
                  const isPositive = pl >= 0;
                  
                  return (
                    <div key={i} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md shrink-0"
                          style={{ backgroundColor: h.color }}
                        >
                          {h.logo}
                        </div>
                        <div className="truncate">
                          <h4 className="font-bold text-white truncate">{h.name}</h4>
                          <span className="text-gray-400 text-xs">{h.ticker}</span>
                        </div>
                      </div>
                      
                      <div className="col-span-3 text-right hidden md:block">
                        <div className="text-white font-medium">${h.currentPrice.toFixed(2)}</div>
                        <div className="text-gray-500 text-xs">Avg: ${h.avgCost.toFixed(2)}</div>
                      </div>
                      
                      <div className="col-span-3 text-right">
                        <div className="text-white font-medium">${currentValue.toLocaleString()}</div>
                        <div className="text-gray-500 text-xs">{h.shares} shares</div>
                      </div>
                      
                      <div className="col-span-4 md:col-span-2 text-right">
                        <div className={`font-bold flex items-center justify-end gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                          {Math.abs(pct).toFixed(2)}%
                        </div>
                        <div className={`text-xs ${isPositive ? 'text-green-500/70' : 'text-red-500/70'}`}>
                          {isPositive ? '+' : '-'}${Math.abs(pl).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Cash Balance Row */}
                <div className="grid grid-cols-12 gap-4 p-4 items-center bg-dark-bg/30">
                  <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shrink-0">
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">US Dollar</h4>
                      <span className="text-gray-400 text-xs">Cash Balance</span>
                    </div>
                  </div>
                  <div className="col-span-3 text-right hidden md:block text-gray-500">-</div>
                  <div className="col-span-7 md:col-span-5 text-right">
                    <div className="text-white font-bold text-lg">$12,450.00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Allocation */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                <PieChart size={20} className="text-gold" />
                Allocation
              </h3>
              
              <div className="flex justify-center mb-6">
                {/* CSS Donut approximation */}
                <div className="w-40 h-40 rounded-full border-[16px] border-dark-bg relative overflow-hidden"
                     style={{
                       background: 'conic-gradient(#7B68EE 0% 30%, #4ECDC4 30% 55%, #DDA0DD 55% 75%, #FF6B6B 75% 90%, #74B9FF 90% 100%)'
                     }}>
                  <div className="absolute inset-0 m-auto w-24 h-24 bg-dark-card rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm font-medium">5 Sectors</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#7B68EE]"></div><span className="text-gray-300">AI & Data</span></div>
                  <span className="font-medium text-white">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#4ECDC4]"></div><span className="text-gray-300">Clean Energy</span></div>
                  <span className="font-medium text-white">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#DDA0DD]"></div><span className="text-gray-300">Space Tech</span></div>
                  <span className="font-medium text-white">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#FF6B6B]"></div><span className="text-gray-300">BioTech</span></div>
                  <span className="font-medium text-white">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#74B9FF]"></div><span className="text-gray-300">HealthTech</span></div>
                  <span className="font-medium text-white">10%</span>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
                <Clock size={20} className="text-gold" />
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                {transactions.map(tx => (
                  <div key={tx.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        tx.type === 'buy' ? 'bg-green-500/20 text-green-500' :
                        tx.type === 'sell' ? 'bg-red-500/20 text-red-500' :
                        'bg-gold/20 text-gold'
                      }`}>
                        {tx.type === 'buy' && <ArrowUpRight size={18} />}
                        {tx.type === 'sell' && <ArrowDownRight size={18} />}
                        {tx.type === 'deposit' && <Plus size={18} />}
                        {tx.type === 'dividend' && <DollarSign size={18} />}
                      </div>
                      <div>
                        <div className="font-medium text-gray-200 capitalize text-sm">
                          {tx.type} {tx.name && tx.name}
                        </div>
                        <div className="text-xs text-gray-500">{tx.time}</div>
                      </div>
                    </div>
                    
                    <div className="text-right text-sm">
                      <div className={`font-bold ${
                        tx.type === 'buy' || tx.type === 'withdraw' ? 'text-white' : 'text-green-500'
                      }`}>
                        {tx.type === 'buy' || tx.type === 'withdraw' ? '-' : '+'}${(tx.total || tx.amount).toLocaleString()}
                      </div>
                      {tx.shares && <div className="text-xs text-gray-500">{tx.shares} shrs</div>}
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 py-2 rounded-xl border border-dark-border text-gray-400 hover:text-white hover:border-gray-500 transition-colors text-sm font-medium">
                View All Activity
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </LoggedInLayout>
  );
}

export default function Page() {
  return (
    <AuthProvider>
      <PageContent />
    </AuthProvider>
  );
}
