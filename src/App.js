import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card/Card';
import Form from './Form/Form';
import firebase from 'firebase'
import {storage} from './firebase'
import db from './firebase'

function App() {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)
  

  useEffect(() => {
    db.collection('users')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setCards(snapshot.docs.map((doc) => (
          {
            id: doc.id,
            data: doc.data()
          }
        )))
      })
      setLoading(true)
  },[])

  return (
    <div className="App">
      
      <Form />

      <div className="grid">
        {loading ? (cards.map((item) => (
          <Card {...item.data}/>
        ))) : (
          <>
            <h1 className="Loading">Loading....</h1>
          </>
        )}
      </div>

    </div>
  );
}

export default App;
