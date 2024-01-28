export default function Character({ character, onCharacterClick, onClose }) {
  return (
    <button
      key={character.id}
      className="flex items-center w-full p-4 space-x-4 bg-gray-200 rounded-lg shadow-md focus:outline-none hover:bg-gray-300"
      onClick={(e) => {
        e.stopPropagation();
        onCharacterClick(character);
        onClose();
      }}
    >
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="w-16 h-16 rounded-full"
      />
      <p className="text-lg font-semibold">{character.name}</p>
    </button>
  );
}
