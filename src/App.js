import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {nanoid} from "nanoid";
import React, {useState, useEffect} from "react";
import AddStudent from "./Components/AddStudent";
import _ from "lodash";
import Student from "./Components/Student";
import "./Components/Student.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


function App() 
{
  const [allStudents, setAllStudents] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [gradYear, setGradYear] = useState("");

  useEffect(() =>
  {
    saveStudents(students);
  }, []);

  const saveStudents = (students) =>
  {
    setAllStudents(students);
    setSearchResults(students);
  }  

  const addStudent = (newStudent) =>
  {
    const updatedStudents = [...allStudents, newStudent];
    saveStudents(updatedStudents);
  }

  const removeStudent = (studentToDelete) =>
  {
    const updatedStudentsArray = allStudents.filter(
      (student) => student.id != studentToDelete.id
    );
    saveStudents(updatedStudentsArray);
  }

  const updateStudent = (updatedStudent) =>
  {
    //console.table(updatedStudent);
    const updatedStudentsArray = allStudents.map(student => student.id === updatedStudent.id ? {...student, ...updatedStudent } : student);
    saveStudents(updatedStudentsArray);
  }
  
  const searchStudents = () =>
  {
    let keywordsArray = [];

    if (keywords)
    {
      keywordsArray = keywords.toLowerCase().split(" ");
    }

    if(gradYear)
    {
      keywordsArray.push(gradYear.toString());
    }

    if (keywordsArray.length > 0)
    {
      const searchResults = allStudents.filter( student =>
        {
          for (const word of keywordsArray)
          {
            if(student.firstName.toLowerCase().includes(word) ||
               student.lastName.toLowerCase().includes(word)  ||
               student.gradYear === parseInt(word))
              {
                return true;
              }
          }
            return false;
        });

        setSearchResults(searchResults);
    }
    else
    {
      setSearchResults(allStudents);
    }
      
  }
  
  const students = 
  [
    {
      id:nanoid(),
    "firstName": "Lazarus",
    "lastName": "Draxford",
    "email": "ldraxford0@freewebs.com",
    image: "images/student1.jpg",
    gradYear: 2020
  }, 
    {
      id:nanoid(),
    "firstName": "Evie",
    "lastName": "Shattock",
    "email": "eshattock1@yahoo.co.jp",
    image: "images/student2.jpg",
    gradYear: 2020
  }, 
    {
      id:nanoid(),
    "firstName": "Luisa",
    "lastName": "Hedditeh",
    "email": "lhedditeh2@pagesperso-orange.fr",
    image: "images/student3.jpg",
    gradYear: 2021
  }, 
    {
      id:nanoid(),
    "firstName": "Joleen",
    "lastName": "Harg",
    "email": "jharg3@ftc.gov",
    image: "images/student4.jpg",
    gradYear: 2021
  }, 
    {
      id:nanoid(),
    "firstName": "Johny",
    "lastName": "Lohoar",
    "email": "jlohoar4@guardian.co.uk",
    image: "images/student5.jpg",
    gradYear: 2022
  }, 
    {
      id:nanoid(),
    "firstName": "Nevile",
    "lastName": "Callender",
    "email": "ncallender5@youku.com",
    image: "images/student6.jpg",
    gradYear: 2022
  }, 
    {
      id:nanoid(),
    "firstName": "Noell",
    "lastName": "Jacomb",
    "email": "njacomb6@uiuc.edu",
    image: "images/student7.jpg",
    gradYear: 2023
  }, 
    {
      id:nanoid(),
    "firstName": "Tremaine",
    "lastName": "Folomin",
    "email": "tfolomin7@macromedia.com",
    image: "images/student8.jpg",
    gradYear: 2023
  }, 
    {
      id:nanoid(),
    "firstName": "Gabie",
    "lastName": "Fenemore",
    "email": "gfenemore8@moonfruit.com",
    image: "images/student9.jpg",
    gradYear: 2024
  }, 
    {
      id:nanoid(),
    "firstName": "Wadsworth",
    "lastName": "Snook",
    "email": "wsnook9@shareasale.com",
    image: "images/student10.jpg",
    gradYear: 2024
  }
];

return (
  <div className="container">
    <div className="row" id="allStudents">
      <h3>Current Students</h3>
      {searchResults &&
        searchResults.map((student) => (
          <div className="col-md-2" key={student.id}>
            <Student
              student={student}
              removeStudent={removeStudent}
              updateStudent={updateStudent}
            />
          </div>
        ))}
    </div>
    <AddStudent addStudent={addStudent} />
    <div className="row mt-4" id="searchStudents">
      <h3 id="searchStudentHeader">Search for Student</h3>
      <div className="col-md-4">
        <label htmlFor="txtKeywords">
          Search by first name or last name
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="John Doe"
          onChange={(evt) => setKeywords(evt.currentTarget.value)}
          value={keywords}
        />
      </div>

      <div className="col-md-4">
        <select
          value={gradYear}
          onChange={(evt) => setGradYear(evt.currentTarget.value)}
          className="form-select"
        >
          <option value="">Select Year</option>
          {_(allStudents)
            .map((student) => student.gradYear)
            .sort()
            .uniq()
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))
            .value()}
        </select>
      </div>

      <div className="col-md-4">
        <button
          type="button"
          className="btn btn-primary"
          onClick={searchStudents}
        >
          Search Students{" "}
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  </div>
);
}

export default App;