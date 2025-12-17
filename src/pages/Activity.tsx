import { useState } from "react";
import Layout from "@/components/Layout";
import { ChevronDown } from "lucide-react";

const activityTypes = [
  { label: "Listed Item", checked: false },
  { label: "Joined Raffle", checked: false },
  { label: "Item Winner", checked: false },
];

const mockActivity = [
  { action: "JOIN", icon: "◆", item: { id: "843095", name: "manayev (manayev)", type: "JOIN" }, user: "0x1E51 ... 93CB", tickets: 2, time: "4 hrs ago", avatar: "🔵" },
  { action: "JOIN", icon: "◆", item: { id: "843095", name: "manayev (manayev)", type: "JOIN" }, user: "0x1E51 ... 93CB", tickets: 4, time: "4 hrs ago", avatar: "🔵" },
  { action: "JOIN", icon: "◆", item: { id: "843095", name: "manayev (manayev)", type: "JOIN" }, user: "0xF635 ... 7A7a", tickets: 7, time: "5 hrs ago", avatar: "🔵" },
  { action: "JOIN", icon: "◆", item: { id: "4904750", name: "shinzwrld999 (shinzwrld999)", type: "JOIN" }, user: "0x0Fe7 ... d6dD", tickets: 1, time: "6 hrs ago", avatar: "🟣" },
  { action: "JOIN", icon: "◆", item: { id: "525", name: "Zora (ZORA)", type: "JOIN" }, user: "0x7553 ... 83eA", tickets: 2, time: "6 hrs ago", avatar: "⚪" },
  { action: "JOIN", icon: "◆", item: { id: "843095", name: "manayev (manayev)", type: "JOIN" }, user: "0x1E51 ... 93CB", tickets: 1, time: "7 hrs ago", avatar: "🔵" },
  { action: "JOIN", icon: "◆", item: { id: "843095", name: "manayev (manayev)", type: "JOIN" }, user: "0x67Ab ... f72d", tickets: 2, time: "7 hrs ago", avatar: "🔵" },
  { action: "WINNER", icon: "♥", item: { id: "33.1", name: "Virtual Protocol (VIRTUAL)", type: "WINNER" }, user: "0xAF58 ... 98E7", tickets: 1, time: "7 hrs ago", avatar: "🟢" },
  { action: "JOIN", icon: "◆", item: { id: "8043581", name: "gainchainn (gainchainn)", type: "JOIN" }, user: "0x35c6 ... c656", tickets: 1, time: "8 hrs ago", avatar: "🟠" },
  { action: "JOIN", icon: "◆", item: { id: "843095", name: "manayev (manayev)", type: "JOIN" }, user: "0x1E51 ... 93CB", tickets: 1, time: "9 hrs ago", avatar: "🔵" },
  { action: "JOIN", icon: "◆", item: { id: "843095", name: "manayev (manayev)", type: "JOIN" }, user: "0x1E51 ... 93CB", tickets: 3, time: "9 hrs ago", avatar: "🔵" },
];

const Activity = () => {
  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0 space-y-6 hidden lg:block">
            <div className="card-surface p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Activity Type</h3>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                {activityTypes.map((type) => (
                  <label key={type.label} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-4 h-4 rounded border border-muted-foreground" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground">
                      {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-xl font-mono tracking-wider mb-6">PLATFORM ACTIVITY</h1>
            
            <div className="card-surface overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
                <div className="col-span-1">Action</div>
                <div className="col-span-4">Item</div>
                <div className="col-span-3">User</div>
                <div className="col-span-2 text-right">Ticket Qty</div>
                <div className="col-span-2 text-right">Time</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-border">
                {mockActivity.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-secondary/50 transition-colors">
                    <div className="col-span-1 flex items-center gap-2">
                      <span className={item.action === "WINNER" ? "text-red-500" : "text-primary"}>
                        {item.icon}
                      </span>
                      <span className={`font-mono text-sm ${item.action === "WINNER" ? "text-red-500" : ""}`}>
                        {item.action}
                      </span>
                    </div>
                    <div className="col-span-4 flex items-center gap-2">
                      <span className="text-xl">{item.avatar}</span>
                      <div>
                        <span className="font-mono text-sm text-primary">{item.item.id}</span>
                        <span className="text-sm ml-2">{item.item.name}</span>
                        <p className="text-xs text-muted-foreground">{item.item.type}</p>
                      </div>
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-background">R</div>
                      <span className="font-mono text-sm">{item.user}</span>
                    </div>
                    <div className="col-span-2 text-right font-mono text-primary">
                      🎫 {item.tickets} Ticket{item.tickets > 1 ? 's' : ''}
                    </div>
                    <div className="col-span-2 text-right text-muted-foreground text-sm">
                      {item.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Activity;
