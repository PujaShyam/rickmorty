// src/components/CharacterGrid.tsx
import React from 'react';
import { Character } from '../types';

interface CharacterGridProps {
  characters: Character[];
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ characters }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {characters.map((character) => (
      <div
        key={character.id}
        className="bg-white rounded shadow-md p-4 flex flex-col items-center"
      >
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="mt-2 text-lg font-semibold text-center">
          {character.name}
        </h3>
      </div>
    ))}
  </div>
);

export default CharacterGrid;
