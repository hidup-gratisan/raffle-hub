import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronDown, Check, X } from "lucide-react";

interface CreateListingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateListingModal = ({ open, onOpenChange }: CreateListingModalProps) => {
  const [price, setPrice] = useState("100");
  const [ticketAmount, setTicketAmount] = useState("1,000");
  const [timeframe, setTimeframe] = useState("7 days");
  const [acknowledged, setAcknowledged] = useState(false);

  const itemPrice = parseFloat(price) || 0;
  const platformFee = itemPrice * 0.1;
  const youllReceive = itemPrice - platformFee;
  const pricePerTicket = ticketAmount ? (itemPrice / parseInt(ticketAmount.replace(/,/g, ""))).toFixed(4) : "0";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-lg p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-center font-mono tracking-wider">LIST YOUR ITEM</DialogTitle>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* NFT Preview */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center overflow-hidden">
              <span className="text-4xl">💎</span>
            </div>
            <div className="text-center">
              <p className="font-medium">vpass badge # 12888 #12892</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center">
                <span className="w-3 h-3 rounded-full bg-primary" />
                vpass NFT contract
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 p-3 bg-secondary rounded-lg text-center text-xs">
            <div>
              <p className="text-muted-foreground">Floor Price</p>
              <p className="font-mono font-medium">0.0002 ETH</p>
              <p className="text-muted-foreground">(-$0.5898)</p>
            </div>
            <div>
              <p className="text-muted-foreground">Volume</p>
              <p className="font-mono font-medium">0 ETH</p>
              <p className="text-muted-foreground">(-$0)</p>
            </div>
            <div>
              <p className="text-muted-foreground">Market Cap</p>
              <p className="font-mono font-medium text-primary">0</p>
            </div>
            <div>
              <p className="text-muted-foreground">Number of Owner</p>
              <p className="font-mono font-medium">38,002</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Collection data from</span>
            <span className="flex items-center gap-1 text-foreground">
              <span className="w-4 h-4 rounded-full bg-blue-500" />
              OpenSea
            </span>
          </div>

          {/* Price Input */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Price</label>
            <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg border border-border focus-within:border-primary">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-[10px] text-background font-bold">$</span>
                </div>
                <span className="text-sm font-medium">USDC</span>
              </div>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="flex-1 bg-transparent outline-none font-mono text-right"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Ticket Amount & Price per Ticket */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Ticket Amount</label>
              <button className="w-full flex items-center justify-between p-3 bg-secondary rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎫</span>
                  <span className="font-mono">{ticketAmount}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Price per Ticket (Minimum 0.1)</label>
              <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg border border-border">
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-[10px] text-background font-bold">$</span>
                  </div>
                  <span className="text-sm font-medium">USDC</span>
                </div>
                <span className="flex-1 font-mono text-right">{pricePerTicket}</span>
              </div>
            </div>
          </div>

          {/* Timeframe */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Timeframe</label>
            <button className="w-full flex items-center justify-between p-3 bg-secondary rounded-lg border border-border">
              <span className="font-mono">{timeframe}</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Acknowledgment */}
          <label className="flex items-start gap-3 cursor-pointer">
            <button
              onClick={() => setAcknowledged(!acknowledged)}
              className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                acknowledged ? "bg-primary border-primary" : "border-border"
              }`}
            >
              {acknowledged && <Check className="w-3 h-3 text-background" />}
            </button>
            <span className="text-xs text-muted-foreground leading-relaxed">
              I acknowledge that once my item is listed and all tickets are sold, ownership of the item will be transferred to the winner. I understand that I may only reclaim my item if the raffle does not reach full ticket sales.
            </span>
          </label>

          {/* Summary */}
          <div className="space-y-2 p-3 bg-secondary rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">You'll Receive</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Item Price</span>
              <span className="font-mono flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-[8px] text-background font-bold">$</span>
                </span>
                {itemPrice}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Platform fee (10%)</span>
              <span className="font-mono flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-[8px] text-background font-bold">$</span>
                </span>
                {platformFee}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onOpenChange(false)}
              className="py-3 rounded-lg btn-orange-outline font-mono tracking-wider"
            >
              CANCEL
            </button>
            <button
              disabled={!acknowledged}
              className="py-3 rounded-lg btn-orange font-mono tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              LIST ITEM
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateListingModal;
