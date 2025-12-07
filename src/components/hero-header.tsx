import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star } from "lucide-react";

interface HeroHeaderProps {
  gameName: string;
  coverImage: string;
  releaseYear: string;
  rating: number;
}

export function HeroHeader({ gameName, coverImage, releaseYear, rating }: HeroHeaderProps) {
  return (
    <div className="relative h-80 md:h-96 overflow-hidden">
      {/* Blurred background image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={coverImage}
          alt={gameName}
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 backdrop-blur-2xl bg-black/60" />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex items-end px-4 md:px-8 pb-8">
        <div className="flex flex-col md:flex-row items-end gap-6 w-full">
          {/* Game cover art */}
          <div className="relative group max-md:hidden">
            <div className="w-48 h-64 rounded-lg overflow-hidden shadow-2xl border-2 border-purple-500/30 group-hover:border-purple-400/60 transition-all">
              <ImageWithFallback
                src={coverImage}
                alt={gameName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
          </div>
          
          {/* Game info */}
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-purple-600/40 border border-purple-500/50 rounded-full text-purple-200 text-xs backdrop-blur-sm">
                PlayStation Collection
              </span>
              <span className="px-3 py-1 bg-blue-600/40 border border-blue-500/50 rounded-full text-blue-200 text-xs backdrop-blur-sm">
                {releaseYear}
              </span>
            </div>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl mb-3 tracking-tight">
              {gameName}
            </h2>
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < rating ? "fill-purple-400 text-purple-400" : "text-gray-600"}
                />
              ))}
              <span className="ml-2 text-gray-300 text-sm">{rating}.0</span>
            </div>
            <p className="text-gray-300 max-w-2xl leading-relaxed">
              Track your journey through the streets and complete every challenge. 
              Earn bronze, silver, gold, and platinum trophies as you master the game.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}