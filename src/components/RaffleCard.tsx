import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface RaffleCardProps {
  id: string;
  image: string;
  title: string;
  endTime: Date;
  ticketsSold: number;
  totalTickets: number;
  ticketPrice: number;
}

const RaffleCard = ({ id, image, title, endTime, ticketsSold, totalTickets, ticketPrice }: RaffleCardProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime.getTime() - new Date().getTime();
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
  }, [endTime]);

  const formatTime = (num: number) => String(num).padStart(2, "0");
  const progress = (ticketsSold / totalTickets) * 100;

  return (
    <Link to={`/raffle/${id}`} className="group block">
      <div className="card-surface overflow-hidden transition-all duration-300 hover:border-primary/50 hover:glow-orange-sm">
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Progress bar overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-orange-400 progress-glow transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        
        {/* Countdown */}
        <div className="p-3 text-center">
          <span className="font-mono text-primary text-sm tracking-wider">
            {formatTime(timeLeft.days)}D : {formatTime(timeLeft.hours)}H : {formatTime(timeLeft.minutes)}M : {formatTime(timeLeft.seconds)}S
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RaffleCard;
