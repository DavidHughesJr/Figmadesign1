import { Trophy, Award, Star, Crown } from "lucide-react";

interface ProgressBarProps {
  earned: number;
  total: number;
  gameName: string;
  viewMode?: "combined" | "trophies" | "missions";
  missionProgress?: { completed: number; total: number };
}

export function ProgressBar({ earned, total, gameName, viewMode = "combined", missionProgress }: ProgressBarProps) {
  const percentage = Math.round((earned / total) * 100);
  
  const getProgressLabel = () => {
    if (viewMode === "trophies") {
      return `${earned} of ${total} trophies earned`;
    } else if (viewMode === "missions") {
      return `${missionProgress?.completed || 0} of ${missionProgress?.total || 0} missions completed`;
    } else {
      // Combined view
      const totalItems = total + (missionProgress?.total || 0);
      const completedItems = earned + (missionProgress?.completed || 0);
      return `${completedItems} of ${totalItems} items completed (${Math.round((completedItems / totalItems) * 100)}% to 100%)`;
    }
  };
  
  return (
    <div className="fixed top-0 left-0 lg:left-64 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-purple-900/30 shadow-2xl">
      <div className="px-4 md:px-8 py-4">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Trophy className="text-purple-400" size={20} />
              <span className="text-white">{gameName}</span>
            </div>
            <span className="text-gray-400 text-sm max-md:hidden">•</span>
            <span className="text-purple-300 text-sm max-md:w-full">{getProgressLabel()}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-full border border-purple-500/30">
              <Award className="text-purple-400" size={16} />
              <span className="text-purple-300 text-sm">{percentage}% Complete</span>
            </div>
            {percentage === 100 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-600/40 to-orange-600/40 rounded-full border border-yellow-500/50 animate-pulse">
                <Crown className="text-yellow-400" size={16} />
                <span className="text-yellow-300 text-sm">Platinum!</span>
              </div>
            )}
          </div>
        </div>
        <div className="relative h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 rounded-full transition-all duration-500 ease-out shadow-lg shadow-purple-500/50"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
          {/* Progress milestones */}
          <div className="absolute inset-0 flex justify-between px-1">
            {[25, 50, 75].map((milestone) => (
              <div
                key={milestone}
                className="w-px h-full bg-gray-700"
                style={{ marginLeft: `${milestone}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}