import React, { useState, useEffect } from "react";
import { getCharacters } from "../api/api.js";
import Character from "./Character";

export default function CharacterList({
  onClose,
  onCharacterClick,
  selectedCharacter,
  handleRemove,
}) {
  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async (search = "") => {
    try {
      const data = await getCharacters(search);
      setCharacters(data);
    } catch (error) {
      setError("There was an error getting the characters...");
    }
  };

  const searchCharacter = () => {
    fetchCharacters(search);
  };

  // Input field for search
  const searchInput = (
    <input
      type="text"
      placeholder="Search characters..."
      className="w-full p-2 text-lg border rounded"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );

  const CharacterList = characters.map((character) => (
    <Character
      key={character.id}
      character={character}
      onCharacterClick={onCharacterClick}
      onClose={onClose}
    />
  ));

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-md p-4 bg-white rounded">
        <div className="flex pb-4">
          {searchInput}
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400"
            onClick={searchCharacter}
          >
            Search
          </button>
          {selectedCharacter && (
            <button
              className="px-4 py-2 ml-2 text-white bg-red-500 rounded hover:bg-red-400"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
                onClose();
              }}
            >
              Remove
            </button>
          )}
        </div>

        <div>
          {error && <div>{error}</div>}
          {/* rest of your component */}
        </div>

        <div className="space-y-4 overflow-auto max-h-96">{CharacterList}</div>
        <div className="absolute left-0 right-0 flex justify-center p-5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="px-4 py-2 text-white bg-red-700 rounded hover:bg-red-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
