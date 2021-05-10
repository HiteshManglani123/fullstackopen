import './App.css';
import axios from 'axios'

// const promise = axios.get("http://localhost:3001/notes")

// promise.then(response => {
//   const notes = response.data
//   console.log(notes);
// })

axios
.get("http://localhost:3001/notes")
.then(response => {
  const notes = response.data
  console.log(notes)
})


function App() {
  return (
   <div>
     Hello
   </div>
  );
}

export default App;
