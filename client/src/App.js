import React, {useState} from 'react'
import './App.css';
import Scanner from './components/Scanner';

function App() {
  const [students,setStudents] = useState([])

  // useEffect(() => {

  //    axios.get('/users')
  //     .then(res => {
  //       console.log('data is here');
  //       setStudents(res.data.data)
  //     })


  // },[])

  const test = students.map(student => {
    return (
    <div key={student.id}>
      <div> {student.first_name}</div>
    </div>
    )
  })

  return (
    <div className="App">
      <h1>Test</h1>
      {test}
      <Scanner />
    </div>
  );
}

export default App;
