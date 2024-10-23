// src/components/EpisodeList.tsx
import React from 'react';
import { Episode } from '../types';

interface EpisodeListProps {
  episodes: Episode[];
  selectedEpisode: number | null;
  onEpisodeSelect: (id: number, characterUrls: string[]) => void;
  onUnselect: () => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  selectedEpisode,
  onEpisodeSelect,
  onUnselect,
}) => (
  <div className="w-1/4 bg-gray-800 text-white p-4 overflow-y-auto">
    <h2 className="text-2xl font-bold mb-4">Episodes</h2>
    <ul className="space-y-2">
      {episodes.map((episode) => (
        <li
          key={episode.id}
          onClick={() =>
            selectedEpisode === episode.id
              ? onUnselect()
              : onEpisodeSelect(episode.id, episode.characters)
          }
          className={`p-2 rounded cursor-pointer ${
            selectedEpisode === episode.id ? 'bg-blue-500' : 'bg-gray-700'
          } hover:bg-blue-400`}
        >
          {episode.name} - {episode.episode}
        </li>
      ))}
    </ul>
  </div>
);

export default EpisodeList;
