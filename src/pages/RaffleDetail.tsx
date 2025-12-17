import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, ArrowRight, Share2, Eye, Heart, Minus, Plus } from "lucide-react";

// Mock raffle data
const mockRaffle = {
  id: "1",
  title: "10000 jesse (jesse)",
  priceChange: "-$94.05",
  owner: "0xe6a7 ... 6e2E",
  image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=600&h=600&fit=crop",
  currentPrice: "$0.0094",
  priceChange24h: "+0.42%",
  volume24h: "$551.7400 K",
  saleEnds: new Date(2025, 11, 26),
  ticketsSold: 62,
  totalTickets: 100,
  fundingCurrent: 62,
  fundingTotal: 100,
  assetValue: "$100",
  itemPrice: "1.0000 USDC",
  userTickets: 0,
  views: 52,
  likes: 1,
  details: {
    itemName: "Unknown",
    symbol: "Unknown",
    decimals: 0,
    standard: "ERC20",
    contractAddress: "Unknown",
    network: "Base",
  },
  activity: [
    { user: "0xF635 ... 7A7a", tickets: 10, time: "14 hrs ago" },
    { user: "0x6659 ... EA04", tickets: 5, time: "3 days ago" },
    { user: "0x8Da4 ... 2946", tickets: 1, time: "3 days ago" },
    { user: "0xDFe5 ... C729", tickets: 1, time: "4 days ago" },
    { user: "0xAF58 ... 98E7", tickets: 20, time: "4 days ago" },
    { user: "0x673B ... 8B99", tickets: 10, time: "5 days ago" },
    { user: "0xF635 ... 7A7a", tickets: 15, time: "5 days ago" },
  ],
  leaderboard: [
    { rank: 1, user: "0xF635 ... 7A7a", tickets: 25 },
    { rank: 2, user: "0xAF58 ... 98E7", tickets: 20 },
    { rank: 3, user: "0x673B ... 8B99", tickets: 10 },
    { rank: 4, user: "0x6659 ... EA04", tickets: 5 },
    { rank: 5, user: "0x8Da4 ... 2946", tickets: 1 },
    { rank: 6, user: "0xDFe5 ... C729", tickets: 1 },
  ],
};

const RaffleDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"overview" | "activity" | "leaderboard">("overview");
  const [ticketAmount, setTicketAmount] = useState(1);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = mockRaffle.saleEnds.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => String(num).padStart(2, "0");
  const progress = (mockRaffle.ticketsSold / mockRaffle.totalTickets) * 100;
  const totalPrice = (ticketAmount * 1).toFixed(2);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "activity", label: "Activity" },
    { id: "leaderboard", label: "Leaderboard" },
  ];

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Explore
          </Link>
          <span className="text-muted-foreground">/</span>
          <span>{mockRaffle.title}</span>
          <div className="flex items-center gap-2 ml-4">
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors text-primary">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Image */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-card border border-border">
              <img
                src={mockRaffle.image}
                alt={mockRaffle.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-6">
            {/* Title & Actions */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  {mockRaffle.title}
                  <span className="text-muted-foreground font-normal text-lg">({mockRaffle.priceChange})</span>
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-background">R</div>
                  <span className="text-muted-foreground font-mono text-sm">{mockRaffle.owner}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">{mockRaffle.views}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{mockRaffle.likes}</span>
                </div>
              </div>
            </div>

            {/* Price Stats */}
            <div className="card-surface p-4 space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Current Price</p>
                  <p className="font-mono font-medium">{mockRaffle.currentPrice}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">1D Changes (%)</p>
                  <p className="font-mono font-medium text-green-500">{mockRaffle.priceChange24h}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Volume 1D</p>
                  <p className="font-mono font-medium">{mockRaffle.volume24h}</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                <span>Price data provided by</span>
                <span className="flex items-center gap-1 text-foreground">
                  <span className="w-4 h-4 rounded-full bg-green-500" />
                  coingecko
                </span>
              </div>
            </div>

            {/* Sale Countdown */}
            <div className="card-surface p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">⏰ Sale Ends</span>
                  <span>{mockRaffle.saleEnds.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</span>
                </div>
                <span className="font-mono text-primary">
                  {formatTime(timeLeft.days)}D : {formatTime(timeLeft.hours)}H : {formatTime(timeLeft.minutes)}M : {formatTime(timeLeft.seconds)}S
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-orange-400 progress-glow transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ticket Sold / Total</span>
                  <span className="font-mono">
                    <span className="text-primary">🎫 {mockRaffle.ticketsSold}</span>/{mockRaffle.totalTickets} ({Math.round(progress)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Funding / Total</span>
                  <span className="font-mono">
                    <span className="text-primary">⊛ {mockRaffle.fundingCurrent.toFixed(2)}</span>/{mockRaffle.fundingTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Asset Value */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-muted-foreground text-sm">Asset Value</p>
                <p className="font-mono text-xl font-bold">{mockRaffle.assetValue}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm flex items-center gap-1">
                  <span className="text-primary">🎫</span> Item Price
                </p>
                <p className="font-mono text-xl font-bold">{mockRaffle.itemPrice}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Your Ticket</p>
                <p className="font-mono text-xl font-bold flex items-center gap-1">
                  <span className="text-primary">🎫</span> {mockRaffle.userTickets}
                </p>
              </div>
            </div>

            {/* Buy Section */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Buy Amount</p>
              <div className="flex gap-3">
                <div className="flex-1 flex items-center gap-3 p-3 bg-secondary rounded-lg border border-border">
                  <span className="text-xl">🎫</span>
                  <span className="font-mono text-lg">{ticketAmount}</span>
                  <span className="text-muted-foreground">TICKET</span>
                  <div className="ml-auto flex items-center gap-2">
                    <button
                      onClick={() => setTicketAmount(Math.max(1, ticketAmount - 1))}
                      className="w-8 h-8 bg-primary rounded flex items-center justify-center hover:brightness-110 transition-all"
                    >
                      <Minus className="w-4 h-4 text-background" />
                    </button>
                    <button
                      onClick={() => setTicketAmount(ticketAmount + 1)}
                      className="w-8 h-8 bg-primary rounded flex items-center justify-center hover:brightness-110 transition-all"
                    >
                      <Plus className="w-4 h-4 text-background" />
                    </button>
                  </div>
                </div>
                <button className="px-6 py-3 btn-orange rounded-lg flex items-center gap-2">
                  <span>BUY NOW</span>
                  <span className="font-mono">{totalPrice}</span>
                  <span className="w-5 h-5 rounded-full bg-foreground/20 flex items-center justify-center">
                    <span className="text-[10px] font-bold">$</span>
                  </span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
              <div className="flex gap-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-3 text-sm font-medium transition-colors relative ${
                      activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <h3 className="font-medium">Details</h3>
                  <div className="space-y-3">
                    {Object.entries(mockRaffle.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className={`font-mono ${key === 'contractAddress' ? 'text-primary' : ''}`}>
                          {value} {key === 'contractAddress' && '↗'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "activity" && (
                <div className="space-y-2">
                  <div className="grid grid-cols-3 text-xs text-muted-foreground uppercase tracking-wider pb-2">
                    <span>User</span>
                    <span className="text-right">Ticket Qty</span>
                    <span className="text-right">Time</span>
                  </div>
                  {mockRaffle.activity.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-3 text-sm py-2 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-background">R</div>
                        <span className="font-mono">{item.user}</span>
                      </div>
                      <span className="text-right font-mono text-primary">🎫 {item.tickets} Ticket{item.tickets > 1 ? 's' : ''}</span>
                      <span className="text-right text-muted-foreground">{item.time}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "leaderboard" && (
                <div className="space-y-2">
                  <div className="grid grid-cols-3 text-xs text-muted-foreground uppercase tracking-wider pb-2">
                    <span>Rank</span>
                    <span>User</span>
                    <span className="text-right">Ticket Qty</span>
                  </div>
                  {mockRaffle.leaderboard.map((item) => (
                    <div key={item.rank} className="grid grid-cols-3 text-sm py-2 border-t border-border">
                      <span className="font-mono">#{item.rank}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-background">R</div>
                        <span className="font-mono">{item.user}</span>
                      </div>
                      <span className="text-right font-mono text-primary">🎫 {item.tickets} Ticket{item.tickets > 1 ? 's' : ''}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RaffleDetail;
