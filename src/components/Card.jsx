import "../styles/card.css";

function Card({ animals, list, handleClick }) {
  return (
    <>
      {animals.map((animal) => {
        return (
          <div className="card" id={animal} key={animal} onClick={handleClick}>
            <div className="imageContainer">
              <img className="image" src={list[animal].url} alt="card" />
            </div>
            <div className="name">{animal}</div>
          </div>
        );
      })}
    </>
  );
}

export { Card };
