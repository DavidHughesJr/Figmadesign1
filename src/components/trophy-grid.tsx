import { TrophyCard, Trophy } from "./trophy-card";
import { Filter } from "lucide-react";
import { useState } from "react";

interface TrophyGridProps {
  trophies: Trophy[];
  onToggleTrophy: (id: string) => void;
}

export function TrophyGrid({ trophies, onToggleTrophy }: TrophyGridProps) {
  const [filter, setFilter] = useState<"all" | "earned" | "unearned">("all");
  
  const filteredTrophies = trophies.filter(trophy => {
    if (filter === "earned") return trophy.earned;
    if (filter === "unearned") return !trophy.earned;
    return true;
  });
  
  const rarityCount = {
    bronze: trophies.filter(t => t.rarity === "bronze").length,
    silver: trophies.filter(t => t.rarity === "silver").length,
    gold: trophies.filter(t => t.rarity === "gold").length,
    platinum: trophies.filter(t => t.rarity === "platinum").length,
  };
  
  return (
    <div className="px-4 md:px-8 pb-8">
      {/* Filter and stats bar */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Filter size={20} className="text-purple-400" />
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filter === "all"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              All ({trophies.length})
            </button>
            <button
              onClick={() => setFilter("earned")}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filter === "earned"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Earned ({trophies.filter(t => t.earned).length})
            </button>
            <button
              onClick={() => setFilter("unearned")}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filter === "unearned"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Locked ({trophies.filter(t => !t.earned).length})
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-gray-400">{rarityCount.bronze}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gray-400" />
              <span className="text-gray-400">{rarityCount.silver}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-gray-400">{rarityCount.gold}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
              <span className="text-gray-400">{rarityCount.platinum}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trophy grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTrophies.map((trophy) => (
          <TrophyCard
            key={trophy.id}
            trophy={trophy}
            onToggle={onToggleTrophy}
          />
        ))}
      </div>
      
      {filteredTrophies.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No trophies found in this category</p>
        </div>
      )}
    </div>
  );
}