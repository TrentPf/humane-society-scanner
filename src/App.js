import './App.css';
import { useState } from 'react';
import Home from './components/Home';
import PetList from './components/PetList';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading = true;

    try {
      const response = await fetch('https://kwsphumane.ca/found-pets', {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error! status: ${response.status}');
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result); //Fix this later so that data is objects of the form { imageLink: ..., id: ... } 
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(data);

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
