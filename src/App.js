import './App.css';
import { useState } from 'react';
import PetList from './components/PetList';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://kwsphumane.ca/found-pets', {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.text();

      const responseContainer = document.createElement("div");
      responseContainer.innerHTML = result;
      
      let petNames = responseContainer.getElementsByClassName("list-animal-name");
      let imageSources = responseContainer.getElementsByClassName("list-animal-photo");

      let petNamesArray = [];
      let imageSourcesArray =[];

      for (let i = 0; i < petNames.length; i++) {
        petNamesArray.push(petNames.item(i).firstChild.innerHTML);
        imageSourcesArray.push(imageSources.item(i).getAttribute("src"));
      }

      console.log(petNamesArray);
      console.log(imageSourcesArray);

      

      

      console.log(`result is: ${result}`);

      setData(result); //Fix this later so that data is objects of the form { imageLink: ..., id: ... } 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }

  };

  

  return (
    <div>
      {error && <h2>{error}</h2>}
      <button onClick={handleClick}>Pull new lost pets</button>
      {loading && <h2>Loading...</h2>}
      {/*send in props with fetched data in the form listed on line 30*/}
    </div>
  );
};

export default App;
