import { MissionCard } from "./mission-card";
import { Mission } from "../data/missions";
import { Filter } from "lucide-react";
import { useState } from "react";

interface MissionsOnlyViewProps {
  missions: Mission[];
  onToggleMission: (id: string) => void;
}

export function MissionsOnlyView({ missions, onToggleMission }: MissionsOnlyViewProps) {
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");
  const [selectedStoryline, setSelectedStoryline] = useState<string>("all");

  const filteredMissions = missions.filter((mission) => {
    const matchesFilter = 
      filter === "all" ||
      (filter === "completed" && mission.completed) ||
      (filter === "incomplete" && !mission.completed);
    
    const matchesStoryline = 
      selectedStoryline === "all" || mission.storyline === selectedStoryline;
    
    return matchesFilter && matchesStoryline;
  });

  const storylines = Array.from(new Set(missions.map(m => m.storyline)));
  const completedCount = missions.filter(m => m.completed).length;

  return (
    <div className="px-4 md:px-8 pb-8">
      {/* Filter bar */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Filter size={20} className="text-green-400" />
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filter === "all"
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              All ({missions.length})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filter === "completed"
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Completed ({completedCount})
            </button>
            <button
              onClick={() => setFilter("incomplete")}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                filter === "incomplete"
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Incomplete ({missions.length - completedCount})
            </button>
          </div>
        </div>

        {/* Storyline filter */}
        <select
          value={selectedStoryline}
          onChange={(e) => setSelectedStoryline(e.target.value)}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
        >
          <option value="all">All Storylines</option>
          {storylines.map((storyline) => (
            <option key={storyline} value={storyline}>
              {storyline}
            </option>
          ))}
        </select>
      </div>

      {/* Mission grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredMissions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            onToggle={onToggleMission}
          />
        ))}
      </div>

      {filteredMissions.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No missions found with current filters</p>
        </div>
      )}
    </div>
  );
}
