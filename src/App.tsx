import { useState } from "react";
import { Sidebar } from "./components/sidebar";
import { ProgressBar } from "./components/progress-bar";
import { HeroHeader } from "./components/hero-header";
import { TrophyGrid } from "./components/trophy-grid";
import { Trophy } from "./components/trophy-card";
import { ViewModeSwitcher, ViewMode } from "./components/view-mode-switcher";
import { CombinedChecklist } from "./components/combined-checklist";
import { MissionsOnlyView } from "./components/missions-only-view";
import { missions as initialMissions, Mission } from "./data/missions";
import { Menu, X } from "lucide-react";

// Mock trophy data for GTA San Andreas
const mockTrophies: Trophy[] = [
  {
    id: "1",
    name: "Grove Street Legend",
    description: "Complete the Grove Street Families storyline and reclaim the hood",
    rarity: "gold",
    earned: true,
  },
  {
    id: "2",
    name: "Welcome to San Andreas",
    description: "Complete the first mission and arrive in Los Santos",
    rarity: "bronze",
    earned: true,
  },
  {
    id: "3",
    name: "Respect Earned",
    description: "Reach maximum respect level in all territories",
    rarity: "silver",
    earned: true,
  },
  {
    id: "4",
    name: "Master Pilot",
    description: "Complete all flight school challenges with gold medals",
    rarity: "gold",
    earned: false,
  },
  {
    id: "5",
    name: "Street Racer",
    description: "Win all street races across San Andreas",
    rarity: "silver",
    earned: true,
  },
  {
    id: "6",
    name: "Tag Master",
    description: "Spray all 100 graffiti tags in Los Santos",
    rarity: "bronze",
    earned: false,
  },
  {
    id: "7",
    name: "Photo Finish",
    description: "Complete all photo opportunities across the state",
    rarity: "bronze",
    earned: true,
  },
  {
    id: "8",
    name: "Oyster Collector",
    description: "Collect all 50 oysters from underwater locations",
    rarity: "bronze",
    earned: false,
  },
  {
    id: "9",
    name: "Horseshoe Hunter",
    description: "Find all 50 horseshoes in Las Venturas",
    rarity: "bronze",
    earned: true,
  },
  {
    id: "10",
    name: "Stunt King",
    description: "Complete all unique jumps and insane stunts",
    rarity: "silver",
    earned: false,
  },
  {
    id: "11",
    name: "Weapon Expert",
    description: "Achieve Hitman rank with all weapon types",
    rarity: "gold",
    earned: false,
  },
  {
    id: "12",
    name: "Export King",
    description: "Export all vehicles from the Import/Export docks",
    rarity: "silver",
    earned: true,
  },
  {
    id: "13",
    name: "Vigilante Hero",
    description: "Complete level 12 of the Vigilante mission",
    rarity: "bronze",
    earned: false,
  },
  {
    id: "14",
    name: "Paramedic Pro",
    description: "Complete level 12 of the Paramedic mission",
    rarity: "bronze",
    earned: true,
  },
  {
    id: "15",
    name: "Firefighter Champion",
    description: "Complete level 12 of the Firefighter mission",
    rarity: "bronze",
    earned: false,
  },
  {
    id: "16",
    name: "Taxi Driver",
    description: "Complete 50 fares in the Taxi missions",
    rarity: "bronze",
    earned: true,
  },
  {
    id: "17",
    name: "Courier Expert",
    description: "Complete all BMX, bike, and vehicle courier missions",
    rarity: "silver",
    earned: false,
  },
  {
    id: "18",
    name: "Gang Territory Control",
    description: "Take over all gang territories in Los Santos",
    rarity: "gold",
    earned: true,
  },
  {
    id: "19",
    name: "Gym Rat",
    description: "Maximize all body stats at all gyms",
    rarity: "bronze",
    earned: true,
  },
  {
    id: "20",
    name: "Property Mogul",
    description: "Purchase all available properties across San Andreas",
    rarity: "silver",
    earned: false,
  },
  {
    id: "21",
    name: "High Roller",
    description: "Win $1,000,000 at casinos in Las Venturas",
    rarity: "silver",
    earned: false,
  },
  {
    id: "22",
    name: "Lowrider Legend",
    description: "Win all lowrider challenges",
    rarity: "bronze",
    earned: true,
  },
  {
    id: "23",
    name: "King of San Andreas",
    description: "Achieve 100% game completion",
    rarity: "platinum",
    earned: false,
  },
];

export default function App() {
  const [currentGame, setCurrentGame] = useState("gta-sa");
  const [trophies, setTrophies] = useState(mockTrophies);
  const [missions, setMissions] = useState(initialMissions);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("combined");

  const handleToggleTrophy = (id: string) => {
    setTrophies(prev =>
      prev.map(trophy =>
        trophy.id === id ? { ...trophy, earned: !trophy.earned } : trophy
      )
    );
  };

  const handleToggleMission = (id: string) => {
    setMissions(prev =>
      prev.map(mission =>
        mission.id === id ? { ...mission, completed: !mission.completed } : mission
      )
    );
  };

  const earnedCount = trophies.filter(t => t.earned).length;
  const totalCount = trophies.length;
  const completedMissions = missions.filter(m => m.completed).length;
  const totalMissions = missions.length;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-black/90 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-900/30 transition-all"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Desktop always visible, Mobile toggle */}
      <div
        className={`fixed inset-0 z-40 lg:relative lg:block ${
          isSidebarOpen ? "block" : "hidden lg:block"
        }`}
      >
        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="absolute inset-0 bg-black/80 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <Sidebar currentGame={currentGame} onGameSelect={setCurrentGame} />
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        <ProgressBar
          earned={earnedCount}
          total={totalCount}
          gameName="GTA San Andreas"
          viewMode={viewMode}
          missionProgress={{ completed: completedMissions, total: totalMissions }}
        />

        <div className="pt-20">
          <HeroHeader
            gameName="Grand Theft Auto: San Andreas"
            coverImage="https://images.unsplash.com/photo-1567027757540-7b572280fa22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyJTIwbmVvbnxlbnwxfHx8fDE3NjQ3ODg4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            releaseYear="2004"
            rating={5}
          />

          <div className="py-8">
            <ViewModeSwitcher
              currentMode={viewMode}
              onModeChange={setViewMode}
              missionCount={{ completed: completedMissions, total: totalMissions }}
              trophyCount={{ earned: earnedCount, total: totalCount }}
            />

            {viewMode === "combined" && (
              <CombinedChecklist
                missions={missions}
                trophies={trophies}
                onToggleMission={handleToggleMission}
                onToggleTrophy={handleToggleTrophy}
              />
            )}

            {viewMode === "missions" && (
              <MissionsOnlyView
                missions={missions}
                onToggleMission={handleToggleMission}
              />
            )}

            {viewMode === "trophies" && (
              <TrophyGrid trophies={trophies} onToggleTrophy={handleToggleTrophy} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
