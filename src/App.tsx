import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EpisodeList from './components/EpisodeList';
import CharacterGrid from './components/CharacterGrid';
import { Character, Episode } from './types';

const App: React.FC = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const MAX_PAGES_VISIBLE = 4;  // Maximum number of pages to display at a time

  // Fetch characters by page
  const fetchCharacters = async (pageNumber: number) => {
    console.log(`Fetching characters for page: ${pageNumber}`); // Debug
    try {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${pageNumber}`
      );
      setCharacters(res.data.results);
      setTotalPages(res.data.info.pages);
      console.log(`Total pages: ${res.data.info.pages}`); // Debug
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  useEffect(() => {
    // Fetch episodes once on load
    axios
      .get('https://rickandmortyapi.com/api/episode')
      .then((res) => setEpisodes(res.data.results))
      .catch((err) => console.error('Error fetching episodes:', err));
    
    // Fetch initial characters
    fetchCharacters(page);
  }, [page]);

  const handleEpisodeSelect = (id: number, characterUrls: string[]) => {
    setSelectedEpisode(id);
    Promise.all(characterUrls.map((url) => axios.get(url)))
      .then((responses) => setCharacters(responses.map((res) => res.data)))
      .catch((err) => console.error('Error fetching episode characters:', err));
  };

  const handleUnselect = () => {
    setSelectedEpisode(null);
    setPage(1); // Reset to the first page
    fetchCharacters(1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const renderPageNumbers = () => {
    // Calculate the start and end of the visible page window
    const startPage = Math.max(1, page - Math.floor(MAX_PAGES_VISIBLE / 2));
    const endPage = Math.min(totalPages, startPage + MAX_PAGES_VISIBLE - 1);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`mx-1 px-3 py-1 rounded ${
            i === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex h-screen">
      {/* Left side: Episode List */}
      <EpisodeList
        episodes={episodes}
        selectedEpisode={selectedEpisode}
        onEpisodeSelect={handleEpisodeSelect}
        onUnselect={handleUnselect}
      />

      {/* Right side: Main content */}
      <div className="flex flex-col w-3/4 p-4 bg-gray-100">
        <CharacterGrid characters={characters} />

        {/* Conditionally render pagination */}
        {!selectedEpisode && (
          <div className="flex justify-center items-center mt-4 p-4 border-t border-gray-300 bg-white">
            {/* Previous Button */}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex mx-2">
              {renderPageNumbers()}
            </div>

            {/* Next Button */}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
