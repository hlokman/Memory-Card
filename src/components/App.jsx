import { useState, useEffect } from "react";
import "../styles/App.css";
import error from "../assets/error.jpg";
import { Card } from "./Card";

let arrayCheck = []; //"under the hood": no need to display this logic on screen

function App() {
  // let arrayCheck = []; if we define the arrayCheck here, the variable is destroyed (like all local variables not controlled b React)
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [animals, setAnimals] = useState([
    "Cats",
    "Dogs",
    "Turtle",
    "Horse",
    "Dolphin",
    "Lion",
    "Bear",
    "Giraffe",
    "Penguin",
    "Monkey",
    "Elephant",
    "Panda",
  ]);

  const [list, setList] = useState({
    Cats: {
      name: "cat",
      url: "",
    },
    Dogs: {
      name: "Dog",
      url: "",
    },
    Turtle: {
      name: "Turtle",
      url: "",
    },
    Horse: {
      name: "Horse",
      url: "",
    },
    Dolphin: {
      name: "Dolphin",
      url: "",
    },
    Lion: {
      name: "Lion",
      url: "",
    },
    Bear: {
      name: "Bear",
      url: "",
    },
    Giraffe: {
      name: "Giraffe",
      url: "",
    },
    Penguin: {
      name: "Penguin",
      url: "",
    },
    Monkey: {
      name: "Monkey",
      url: "",
    },
    Elephant: {
      name: "Elephant",
      url: "",
    },
    Panda: {
      name: "Panda",
      url: "",
    },
  });

  function shuffle(array) {
    let j, x, i;
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }

    return array;
  }

  function checkScores(array, data) {
    if (array.includes(data)) {
      setScore(0);
      return (arrayCheck = []);
    } else {
      setScore(score + 1);
    }

    if (array.length < 12) {
      array.push(data);
    } else if (array.length == 12) {
      array.shift();
      array.push(data);
    }

    if (score >= bestScore) {
      setBestScore(bestScore + 1);
    }

    console.log(array);
  }

  const handleClick = (e) => {
    setAnimals((prevState) => shuffle([...prevState]));
    fetchAllAnimals(); // to (re)fetch images from API when click
    checkScores(arrayCheck, e.currentTarget.id);
  };

  const fetchAnimal = async (animal) => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=qrwtm0asJ8KH3GNaAfOj54FYDMCrKjnw&s=${animal}`
      );
      const json = await response.json();

      // Check if data needed are there before accessing them
      //if (response?.ok) {
      if (json && json.data && json.data.images && json.data.images.original) {
        setList((prevState) => ({
          ...prevState,
          [animal]: {
            ...prevState[animal],
            url: json.data.images.original.url,
          },
        }));
      } else {
        console.error(`Missing value for ${animal}`);
      }
      // }
    } catch (error) {
      console.error(`Error when fetching data for ${animal}`, error);
    }
  };

  const fetchAllAnimals = async () => {
    const fetchPromises = animals.map((animal) => fetchAnimal(animal));
    await Promise.all(fetchPromises);
  };

  useEffect(() => {
    fetchAllAnimals(); // especially for the 1st render
  }, []);

  /**/
  return (
    <>
      <header>
        <h1>Memory Card Game</h1>
        <div className="scoresBoard">
          <p className="score">Score: {score}</p>
          <p className="bestScore">Best Score: {bestScore} </p>
          <p>
            <i>
              Get points by clicking on an image but don't click on any more
              than once!
            </i>
          </p>
        </div>
      </header>

      <main>
        <section className="cards">
          <Card animals={animals} list={list} handleClick={handleClick} />
        </section>
      </main>
    </>
  );
}

export default App;
