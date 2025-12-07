import { CheckSquare, Square, MapPin } from "lucide-react";
import { Mission } from "../data/missions";

interface MissionCardProps {
  mission: Mission;
  onToggle: (id: string) => void;
}

const storylineColors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  "Introduction": { bg: "from-green-900/40 to-emerald-900/40", border: "border-green-700/40", text: "text-green-300", icon: "text-green-400" },
  "Sweet": { bg: "from-green-800/40 to-lime-900/40", border: "border-green-600/40", text: "text-green-300", icon: "text-green-400" },
  "Ryder": { bg: "from-orange-900/40 to-red-900/40", border: "border-orange-700/40", text: "text-orange-300", icon: "text-orange-400" },
  "Big Smoke": { bg: "from-gray-800/40 to-gray-700/40", border: "border-gray-600/40", text: "text-gray-300", icon: "text-gray-400" },
  "OG Loc": { bg: "from-purple-900/40 to-fuchsia-900/40", border: "border-purple-700/40", text: "text-purple-300", icon: "text-purple-400" },
  "Cesar": { bg: "from-blue-900/40 to-cyan-900/40", border: "border-blue-700/40", text: "text-blue-300", icon: "text-blue-400" },
  "The Truth": { bg: "from-yellow-900/40 to-amber-900/40", border: "border-yellow-700/40", text: "text-yellow-300", icon: "text-yellow-400" },
  "Catalina": { bg: "from-pink-900/40 to-rose-900/40", border: "border-pink-700/40", text: "text-pink-300", icon: "text-pink-400" },
  "Street Races": { bg: "from-red-900/40 to-orange-800/40", border: "border-red-700/40", text: "text-red-300", icon: "text-red-400" },
  "San Fierro Intro": { bg: "from-cyan-900/40 to-teal-900/40", border: "border-cyan-700/40", text: "text-cyan-300", icon: "text-cyan-400" },
  "Garage": { bg: "from-indigo-900/40 to-blue-900/40", border: "border-indigo-700/40", text: "text-indigo-300", icon: "text-indigo-400" },
  "Woozie": { bg: "from-emerald-900/40 to-green-900/40", border: "border-emerald-700/40", text: "text-emerald-300", icon: "text-emerald-400" },
  "Toreno": { bg: "from-slate-800/40 to-zinc-800/40", border: "border-slate-600/40", text: "text-slate-300", icon: "text-slate-400" },
  "Flight School": { bg: "from-sky-900/40 to-blue-800/40", border: "border-sky-700/40", text: "text-sky-300", icon: "text-sky-400" },
  "Heist": { bg: "from-violet-900/40 to-purple-800/40", border: "border-violet-700/40", text: "text-violet-300", icon: "text-violet-400" },
  "Side Mission": { bg: "from-amber-900/40 to-yellow-800/40", border: "border-amber-700/40", text: "text-amber-300", icon: "text-amber-400" },
  "Mansion": { bg: "from-rose-900/40 to-pink-800/40", border: "border-rose-700/40", text: "text-rose-300", icon: "text-rose-400" },
  "Final Missions": { bg: "from-red-900/40 to-orange-900/40", border: "border-red-700/40", text: "text-red-300", icon: "text-red-400" },
};

export function MissionCard({ mission, onToggle }: MissionCardProps) {
  const colors = storylineColors[mission.storyline] || storylineColors["Sweet"];
  
  return (
    <div
      className={`relative group bg-gradient-to-br ${colors.bg} backdrop-blur-sm rounded-lg border ${colors.border} hover:border-opacity-60 transition-all duration-300 ${
        mission.completed ? "shadow-lg opacity-100" : "opacity-70 hover:opacity-100"
      }`}
    >
      {mission.completed && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
      
      <div className="relative p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={14} className={colors.icon} />
              <span className={`text-xs uppercase tracking-wider ${colors.text}`}>
                {mission.storyline}
              </span>
            </div>
            <h3 className={`${mission.completed ? "text-white" : "text-gray-300"}`}>
              {mission.name}
            </h3>
          </div>
          <button
            onClick={() => onToggle(mission.id)}
            className="transition-transform hover:scale-110 active:scale-95 ml-3"
            aria-label={mission.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {mission.completed ? (
              <CheckSquare size={24} className={`${colors.icon} drop-shadow-lg`} />
            ) : (
              <Square size={24} className="text-gray-600 hover:text-gray-400 transition-colors" />
            )}
          </button>
        </div>
        
        <p className="text-gray-400 text-sm leading-relaxed">
          {mission.description}
        </p>
        
        {mission.completed && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <span className="text-xs text-green-300 bg-green-900/40 px-2 py-1 rounded-full border border-green-500/30">
              Completed ✓
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
