import { Trophy, Award, Star, Crown, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";

export interface Trophy {
  id: string;
  name: string;
  description: string;
  rarity: "bronze" | "silver" | "gold" | "platinum";
  earned: boolean;
}

interface TrophyCardProps {
  trophy: Trophy;
  onToggle: (id: string) => void;
}

const rarityConfig = {
  bronze: {
    icon: Trophy,
    gradient: "from-orange-900/40 to-amber-900/40",
    border: "border-orange-700/40",
    iconColor: "text-orange-400",
    glow: "shadow-orange-500/20",
    hoverBorder: "hover:border-orange-500/60",
  },
  silver: {
    icon: Award,
    gradient: "from-gray-700/40 to-gray-600/40",
    border: "border-gray-500/40",
    iconColor: "text-gray-300",
    glow: "shadow-gray-400/20",
    hoverBorder: "hover:border-gray-400/60",
  },
  gold: {
    icon: Star,
    gradient: "from-yellow-700/40 to-yellow-600/40",
    border: "border-yellow-600/40",
    iconColor: "text-yellow-400",
    glow: "shadow-yellow-500/20",
    hoverBorder: "hover:border-yellow-500/60",
  },
  platinum: {
    icon: Crown,
    gradient: "from-cyan-700/40 to-blue-600/40",
    border: "border-cyan-500/40",
    iconColor: "text-cyan-300",
    glow: "shadow-cyan-500/20",
    hoverBorder: "hover:border-cyan-400/60",
  },
};

export function TrophyCard({ trophy, onToggle }: TrophyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const config = rarityConfig[trophy.rarity];
  const TrophyIcon = config.icon;
  
  return (
    <div
      className={`relative group bg-gradient-to-br ${config.gradient} backdrop-blur-sm rounded-lg border ${config.border} ${config.hoverBorder} transition-all duration-300 overflow-hidden ${
        trophy.earned ? `${config.glow} shadow-lg` : "opacity-70 hover:opacity-100"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Shine effect on earned trophies */}
      {trophy.earned && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-black/40 border ${config.border}`}>
            <TrophyIcon size={28} className={config.iconColor} />
          </div>
          <button
            onClick={() => onToggle(trophy.id)}
            className="transition-transform hover:scale-110 active:scale-95"
            aria-label={trophy.earned ? "Mark as not earned" : "Mark as earned"}
          >
            {trophy.earned ? (
              <CheckCircle2
                size={28}
                className={`${config.iconColor} drop-shadow-lg`}
              />
            ) : (
              <Circle
                size={28}
                className="text-gray-600 hover:text-gray-400 transition-colors"
              />
            )}
          </button>
        </div>
        
        <div className="space-y-2">
          <h3 className={`text-white transition-all ${trophy.earned ? "text-white" : "text-gray-300"}`}>
            {trophy.name}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {trophy.description}
          </p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className={`text-xs uppercase tracking-wider ${config.iconColor}`}>
            {trophy.rarity}
          </span>
          {trophy.earned && (
            <span className="text-xs text-purple-300 bg-purple-900/40 px-2 py-1 rounded-full border border-purple-500/30">
              Earned ✓
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
