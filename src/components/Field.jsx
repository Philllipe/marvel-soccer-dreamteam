import React, { useState } from "react";
import CharacterCard from "./CharacterCard";
import { TwitterShareButton, TwitterIcon } from "react-share";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

const Field = () => {
  const soccerField = "/images/field.jpg";
  const [characters, setCharacters] = useState([
    { id: 1, position: "Goalkeeper" },
    { id: 2, position: "Defender" },
    { id: 3, position: "Midfielder" },
    { id: 4, position: "Striker" },
  ]);

  const addCharacter = (position) => {
    if (characters.length < 5) {
      // Get the highest id and add 1 to it
      const newId = Math.max(...characters.map((c) => c.id)) + 1;
      // Add the new character to the list
      setCharacters([...characters, { id: newId, position }]);
    }
  };

  const removeCharacter = (id) => {
    // Remove the character from the list
    setCharacters(characters.filter((c) => c.id !== id));
  };

  const screenshot = () => {
    const field = document.getElementById("field");
    const twitterButton = document.querySelector(".twitter-button");

    // remove twitter logo
    twitterButton.style.display = "none";

    domtoimage.toBlob(field).then((blob) => {
      saveAs(blob, "marvel-dream-team.png");

      // show twitter button after screenshot
      twitterButton.style.display = "block";
    });
  };

  return (
    <div id="field" className="relative flex justify-center">
      <div className="absolute p-2">
        <TwitterShareButton
          className="twitter-button"
          url=" "
          title={
            "Check out my marvel soccer dream team!\n\n*attach image saved*"
          }
        >
          <TwitterIcon round={true} size={32} onClick={screenshot} />
        </TwitterShareButton>
      </div>
      <img src={soccerField} className="max-h-screen" alt="Soccer Field" />
      {["Goalkeeper", "Defender", "Midfielder", "Striker"].map(
        (position, index) => (
          <div
            className="absolute flex space-x-28"
            // Spacing based on the position/index
            style={{ bottom: `${5 + index * 20}%` }}
          >
            {characters
              // Filters the characters based on the position
              .filter((c) => c.position === position)
              .map((character) => (
                <CharacterCard
                  key={character.id}
                  position={character.position}
                  onAdd={() => addCharacter(character.position)}
                  isAdded={character.id > 4}
                  onRemove={() => removeCharacter(character.id)}
                  canAdd={characters.length < 5}
                />
              ))}
          </div>
        )
      )}
    </div>
  );
};

export default Field;
