import { Gamepad2, Trophy } from "lucide-react";

interface Game {
  id: string;
  name: string;
  trophyCount: number;
  earnedCount: number;
}

const games: Game[] = [
  { id: "gta-sa", name: "GTA San Andreas", trophyCount: 45, earnedCount: 23 },
  { id: "gta-vc", name: "GTA Vice City", trophyCount: 38, earnedCount: 12 },
  { id: "gta-3", name: "GTA 3", trophyCount: 32, earnedCount: 8 },
];

export function Sidebar({ currentGame, onGameSelect }: { currentGame: string; onGameSelect: (gameId: string) => void }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-black/90 border-r border-purple-900/30 backdrop-blur-lg z-30 flex flex-col max-lg:w-80">
      <div className="p-6 border-b border-purple-900/30">
        <div className="flex items-center gap-3">
          <Trophy className="text-purple-400" size={28} />
          <div>
            <h1 className="text-white">Trophy Hunter</h1>
            <p className="text-xs text-purple-300">Track your achievements</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => onGameSelect(game.id)}
              className={`w-full text-left p-4 rounded-lg transition-all ${
                currentGame === game.id
                  ? "bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/50 shadow-lg shadow-purple-500/20"
                  : "bg-gray-900/50 border border-gray-800 hover:border-purple-500/30 hover:bg-gray-800/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Gamepad2 size={18} className={currentGame === game.id ? "text-purple-400" : "text-gray-400"} />
                <span className={currentGame === game.id ? "text-white" : "text-gray-300"}>{game.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">{game.earnedCount}/{game.trophyCount} trophies</span>
                <span className={`${currentGame === game.id ? "text-purple-400" : "text-gray-500"}`}>
                  {Math.round((game.earnedCount / game.trophyCount) * 100)}%
                </span>
              </div>
              <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    currentGame === game.id ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-gray-700"
                  }`}
                  style={{ width: `${(game.earnedCount / game.trophyCount) * 100}%` }}
                />
              </div>
            </button>
          ))}
        </div>
      </nav>
      
      <div className="p-4 border-t border-purple-900/30">
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-3 border border-purple-500/20">
          <div className="text-xs text-gray-400 mb-1">Total Progress</div>
          <div className="text-white">63 / 115 Trophies</div>
        </div>
      </div>
    </aside>
  );
}