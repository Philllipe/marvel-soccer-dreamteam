import axios from "axios";
import md5 from "crypto-js/md5";

const PUBLIC_KEY = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
const TIMESTAMP = new Date().getTime().toString();

const preHash = TIMESTAMP + PRIVATE_KEY + PUBLIC_KEY;
const HASH = md5(preHash).toString();

export const getCharacters = async (name) => {
  const params = {
    ts: TIMESTAMP,
    apikey: PUBLIC_KEY,
    hash: HASH,
    limit: 10,
  };

  if (name) {
    params.nameStartsWith = name;
  }

  const response = await axios.get(
    "https://gateway.marvel.com/v1/public/characters",
    {
      params,
    }
  );

  return response.data.data.results;
};
