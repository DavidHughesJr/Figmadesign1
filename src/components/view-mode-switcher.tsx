import { Trophy, Map, LayoutGrid } from "lucide-react";

export type ViewMode = "combined" | "trophies" | "missions";

interface ViewModeSwitcherProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  missionCount: { completed: number; total: number };
  trophyCount: { earned: number; total: number };
}

export function ViewModeSwitcher({ 
  currentMode, 
  onModeChange,
  missionCount,
  trophyCount 
}: ViewModeSwitcherProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => onModeChange("combined")}
          className={`group flex items-center gap-3 px-6 py-4 rounded-xl transition-all ${
            currentMode === "combined"
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl shadow-purple-500/40 scale-105"
              : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
          }`}
        >
          <LayoutGrid size={22} className={currentMode === "combined" ? "text-white" : "text-purple-400"} />
          <div className="text-left">
            <div className={currentMode === "combined" ? "" : "text-gray-400"}>
              100% Completion
            </div>
            <div className="text-xs opacity-80">
              {missionCount.completed + trophyCount.earned} / {missionCount.total + trophyCount.total} Total
            </div>
          </div>
        </button>
        
        <button
          onClick={() => onModeChange("missions")}
          className={`group flex items-center gap-3 px-6 py-4 rounded-xl transition-all ${
            currentMode === "missions"
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl shadow-green-500/40 scale-105"
              : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
          }`}
        >
          <Map size={22} className={currentMode === "missions" ? "text-white" : "text-green-400"} />
          <div className="text-left">
            <div className={currentMode === "missions" ? "" : "text-gray-400"}>
              Missions Only
            </div>
            <div className="text-xs opacity-80">
              {missionCount.completed} / {missionCount.total} Completed
            </div>
          </div>
        </button>
        
        <button
          onClick={() => onModeChange("trophies")}
          className={`group flex items-center gap-3 px-6 py-4 rounded-xl transition-all ${
            currentMode === "trophies"
              ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-2xl shadow-yellow-500/40 scale-105"
              : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700"
          }`}
        >
          <Trophy size={22} className={currentMode === "trophies" ? "text-white" : "text-yellow-400"} />
          <div className="text-left">
            <div className={currentMode === "trophies" ? "" : "text-gray-400"}>
              Trophies Only
            </div>
            <div className="text-xs opacity-80">
              {trophyCount.earned} / {trophyCount.total} Earned
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
