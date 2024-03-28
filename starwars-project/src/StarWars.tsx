import React, { useState, useEffect } from "react";
import { Character } from "./Character";

export const StarWars: React.FC = () => {
  const api_base: string = "https://swapi.dev/api";
  const api_endpoint: string = "/people/";

  const [input, setInput] = useState<number>();

  const [character, setCharacter] = useState<Character>();

  const [loading, setLoading] = useState<boolean>(false);

  const [totalCount, setTotalCount] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api_base + api_endpoint);
        const data = await response.json();
        setTotalCount(data.count);
        console.log(data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getCharacter = async () => {
    setLoading(true);
    const response = await fetch(api_base + api_endpoint + input);
    const parsedData = await response.json();
    setCharacter(parsedData);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  };

  useEffect(() => {
    console.log(character);
  }, [character]);

  const handleClick = async () => {
    await getCharacter();
  };

  return (
    <div className="main-container">
      <h1>Star Wars character</h1>
      {loading && (
        <img
          className="loading-picture"
          src="https://i.pinimg.com/originals/96/ea/bc/96eabc812b02070e025cb41776b91803.gif"
        />
      )}
      {loading == false && <div className="character-details" style={{height: character ? "200px":"0px"}}>
        {
          character &&
          Object.entries(character)
            .slice(0, 8) // Slice the array to include only the first 8 entries
            .map(([key, value]) => (
              <div key={key} className="character-key">
                <span>{key}: </span>
                {Array.isArray(value) ? (
                  <ul>
                    {value.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="character-value">{value}</span>
                )}
              </div>
            ))}
      </div>}
      <input
        placeholder="Enter number"
        type="number"
        value={input}
        onChange={(e) => setInput(Number(e.currentTarget.value))}
      />
      {/* the api has too long delay and some numbers are missing... 
        17 is absent, but 83 is present, and total count is shown as 82 */}
      {totalCount && <div className="total-characters">there are {totalCount} characters</div>}

      <button onClick={handleClick}>Use Force!</button>
    </div>
  );
};
