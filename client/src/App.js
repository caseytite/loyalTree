import React, {useState,useEffect} from 'react'
import axios from 'axios'
import './App.css';

function App() {
  const [students,setStudents] = useState([])

  useEffect(() => {
    
     axios.get('/users')
      .then(res => {
        console.log('data is here');
        setStudents(res.data.data)
      })
    
  },[])

  // useEffect(() => {
    
  //    axios.get('/users')
  //     .then(res => {
  //       console.log('data is here');
  //       console.log(res.data);
  //     })
    
  // },[])

   
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
