import React, {useState,useEffect} from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [students,setStudents] = useState([])

  useEffect(() => {
    
     axios.get('/test')
      .then(res => {
        console.log('data is here');
        setStudents(res.data.test)
      })
    
  },[])

   
  console.log(students);

  const test = students.map(student => {
    return (
      
    <div>
      <div key={student.first_name}> {student.first_name}</div>
    </div>
      
    )
  })
 

  return (
    <div className="App">
      <h1>Test</h1>
      {test}
    </div>
  );
}

export default App;
