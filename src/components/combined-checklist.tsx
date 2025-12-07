import { TrophyCard, Trophy } from "./trophy-card";
import { MissionCard } from "./mission-card";
import { Mission } from "../data/missions";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface CombinedChecklistProps {
  missions: Mission[];
  trophies: Trophy[];
  onToggleMission: (id: string) => void;
  onToggleTrophy: (id: string) => void;
}

interface StorylineGroup {
  name: string;
  missions: Mission[];
  relatedTrophies: Trophy[];
  order: number;
}

const storylineOrder: Record<string, number> = {
  "Introduction": 1,
  "Sweet": 2,
  "Ryder": 3,
  "Big Smoke": 4,
  "OG Loc": 5,
  "Cesar": 6,
  "The Truth": 7,
  "Catalina": 8,
  "Street Races": 9,
  "San Fierro Intro": 10,
  "Garage": 11,
  "Woozie": 12,
  "Toreno": 13,
  "Flight School": 14,
  "Heist": 15,
  "Side Mission": 16,
  "Mansion": 17,
  "Final Missions": 18,
};

export function CombinedChecklist({
  missions,
  trophies,
  onToggleMission,
  onToggleTrophy,
}: CombinedChecklistProps) {
  const [collapsedStorylines, setCollapsedStorylines] = useState<Set<string>>(new Set());

  // Group missions by storyline and attach related trophies
  const storylineGroups: StorylineGroup[] = [];
  const processedStorylines = new Set<string>();

  missions.forEach((mission) => {
    if (!processedStorylines.has(mission.storyline)) {
      processedStorylines.add(mission.storyline);
      
      const storylineMissions = missions.filter(m => m.storyline === mission.storyline);
      const relatedTrophies = trophies.filter(t => 
        storylineMissions.some(m => m.relatedTrophyId === t.id)
      );
      
      storylineGroups.push({
        name: mission.storyline,
        missions: storylineMissions,
        relatedTrophies,
        order: storylineOrder[mission.storyline] || 99,
      });
    }
  });

  // Add standalone trophies (not related to any mission)
  const standaloneTrophies = trophies.filter(t => 
    !missions.some(m => m.relatedTrophyId === t.id)
  );
  
  if (standaloneTrophies.length > 0) {
    storylineGroups.push({
      name: "Additional Trophies",
      missions: [],
      relatedTrophies: standaloneTrophies,
      order: 100,
    });
  }

  storylineGroups.sort((a, b) => a.order - b.order);

  const toggleStoryline = (storylineName: string) => {
    setCollapsedStorylines(prev => {
      const newSet = new Set(prev);
      if (newSet.has(storylineName)) {
        newSet.delete(storylineName);
      } else {
        newSet.add(storylineName);
      }
      return newSet;
    });
  };

  return (
    <div className="px-4 md:px-8 pb-8 space-y-6">
      {storylineGroups.map((group) => {
        const isCollapsed = collapsedStorylines.has(group.name);
        const completedMissions = group.missions.filter(m => m.completed).length;
        const earnedTrophies = group.relatedTrophies.filter(t => t.earned).length;
        const totalItems = group.missions.length + group.relatedTrophies.length;
        const completedItems = completedMissions + earnedTrophies;
        const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
        
        return (
          <div key={group.name} className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
            <button
              onClick={() => toggleStoryline(group.name)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-left">
                  <h3 className="text-white text-xl mb-1">{group.name}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    {group.missions.length > 0 && (
                      <span className="text-gray-400">
                        {completedMissions}/{group.missions.length} missions
                      </span>
                    )}
                    {group.relatedTrophies.length > 0 && (
                      <span className="text-gray-400">
                        {earnedTrophies}/{group.relatedTrophies.length} trophies
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right mr-4">
                  <div className="text-purple-300 mb-1">{completionPercentage}%</div>
                  <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                      style={{ width: `${completionPercentage}%` }}
                    />
                  </div>
                </div>
                {isCollapsed ? (
                  <ChevronDown size={24} className="text-gray-400" />
                ) : (
                  <ChevronUp size={24} className="text-gray-400" />
                )}
              </div>
            </button>
            
            {!isCollapsed && (
              <div className="p-6 pt-2 border-t border-gray-800">
                {/* Missions */}
                {group.missions.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-3">Missions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      {group.missions.map((mission) => (
                        <MissionCard
                          key={mission.id}
                          mission={mission}
                          onToggle={onToggleMission}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Related Trophies */}
                {group.relatedTrophies.length > 0 && (
                  <div>
                    <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-3">
                      {group.missions.length > 0 ? "Related Trophies" : "Trophies"}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      {group.relatedTrophies.map((trophy) => (
                        <TrophyCard
                          key={trophy.id}
                          trophy={trophy}
                          onToggle={onToggleTrophy}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
