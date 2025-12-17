import { useState } from "react";
import Layout from "@/components/Layout";
import RaffleCard from "@/components/RaffleCard";
import { ChevronDown, Search } from "lucide-react";

// Mock data for raffles
const mockRaffles = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=400&fit=crop",
    title: "Crypto Punk #1234",
    endTime: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000),
    ticketsSold: 62,
    totalTickets: 100,
    ticketPrice: 1,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop",
    title: "Ethereum Diamond",
    endTime: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000 + 17 * 60 * 60 * 1000),
    ticketsSold: 45,
    totalTickets: 200,
    ticketPrice: 0.5,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&h=400&fit=crop",
    title: "ETH Logo Collection",
    endTime: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000),
    ticketsSold: 180,
    totalTickets: 500,
    ticketPrice: 0.2,
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    title: "Abstract NFT #567",
    endTime: new Date(Date.now() + 26 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000),
    ticketsSold: 30,
    totalTickets: 150,
    ticketPrice: 1.5,
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400&h=400&fit=crop",
    title: "Joker Art Piece",
    endTime: new Date(Date.now() + 27 * 24 * 60 * 60 * 1000 + 20 * 60 * 60 * 1000),
    ticketsSold: 89,
    totalTickets: 100,
    ticketPrice: 2,
  },
];

const sortOptions = [
  { label: "Trending", active: true },
  { label: "Recently Added", active: false },
  { label: "Ends Soon", active: false },
  { label: "Highest Item Value", active: false },
  { label: "Lowest Item Value", active: false },
  { label: "Highest Ticket Price", active: false },
  { label: "Lowest Ticket Price", active: false },
  { label: "Raffled", active: false },
];

const typeOptions = [
  { label: "NFTs", checked: false },
];

const Index = () => {
  const [selectedSort, setSelectedSort] = useState("Trending");

  return (
    <Layout showTicker>
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 space-y-6 hidden lg:block">
            {/* Sort */}
            <div className="card-surface p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Sort</h3>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <label key={option.label} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                      selectedSort === option.label ? "border-primary" : "border-muted-foreground"
                    }`}>
                      {selectedSort === option.label && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className={`text-sm transition-colors ${
                      selectedSort === option.label ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type */}
            <div className="card-surface p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Type</h3>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                {typeOptions.map((option) => (
                  <label key={option.label} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-4 h-4 rounded border border-muted-foreground" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Hero Banner */}
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-orange-900/30 via-orange-800/20 to-orange-900/30 border border-border">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200')] opacity-10 bg-cover bg-center" />
              <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <span className="text-background font-bold text-2xl">R</span>
                    </div>
                    <span className="text-4xl md:text-5xl font-bold tracking-tight">RAFLUX</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-medium text-muted-foreground mb-4">
                    Win NFTs & Tokens,<br />
                    Fair & Transparent
                  </h1>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-700/50 rounded-full">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                    <span className="text-sm">Fairness Powered by</span>
                    <span className="text-sm font-medium text-green-400">Chainlink VRF</span>
                  </div>
                </div>
                <div className="w-32 h-32 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary">R</span>
                </div>
              </div>
            </div>

            {/* Raffle Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {mockRaffles.map((raffle) => (
                <RaffleCard key={raffle.id} {...raffle} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
