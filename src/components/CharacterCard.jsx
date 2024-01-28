import React, { useState } from "react";
import CharacterList from "./CharacterList";

export default function CharacterCard({
  name,
  position,
  onAdd,
  isAdded,
  onRemove,
  canAdd,
}) {
  const [setCharacterList, setShowCharacterList] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleClick = () => {
    setShowCharacterList(true);
  };

  const handleRemove = () => {
    setSelectedCharacter(null);
  };

  return (
    <div>
      {selectedCharacter ? (
        <div className="flex flex-col items-center ">
          {/* Character Information */}
          <div className="overflow-hidden rounded-full size-[20vw] max-w-44 max-h-44 ">
            <div
              onClick={handleClick}
              className="transition-opacity cursor-pointer hover:opacity-75"
            >
              <img
                src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`}
                alt={selectedCharacter.name}
                className="object-cover size-full"
              />
            </div>
            {selectedCharacter && canAdd && position !== "Goalkeeper" && (
              <div
                onClick={isAdded ? onRemove : onAdd}
                className="absolute top-0 right-0 p-2 bg-black rounded-full opacity-50 cursor-pointer hover:opacity-90"
              >
                <span className="text-sm font-bold text-white">
                  {isAdded ? "x" : "+"}
                </span>
              </div>
            )}
          </div>
          <h3 className="font-bold text-center text-black lg:text-2xl md:text-sm ">
            {selectedCharacter.name}
          </h3>
          <p className="italic font-semibold text-center lg:text-lg sm:text-xs">
            {position}
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center " onClick={handleClick}>
          <div className="overflow-hidden rounded-full size-[20vw] max-w-44 max-h-44 ">
            <div className="flex items-center justify-center w-full h-full transition-opacity bg-black rounded-full cursor-pointer opacity-70 hover:opacity-75">
              <span className="text-white mb-7 text-9xl">+</span>
            </div>
            {isAdded && (
              <div
                onClick={onRemove}
                className="absolute top-0 right-0 p-2 bg-black rounded-full opacity-50 cursor-pointer hover:opacity-90"
              >
                <span className="text-sm font-bold text-white">{"x"}</span>
              </div>
            )}
          </div>
          <h3 className="text-2xl font-bold text-center text-black ">{name}</h3>
          <p className="text-lg italic font-semibold text-center">{position}</p>
        </div>
      )}
      {setCharacterList && (
        <CharacterList
          position={position}
          onClose={() => setShowCharacterList(false)}
          onCharacterClick={setSelectedCharacter}
          selectedCharacter={selectedCharacter}
          handleRemove={handleRemove}
        />
      )}
    </div>
  );
}
