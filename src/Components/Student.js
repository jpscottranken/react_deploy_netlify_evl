import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { faMagicWandSparkles } from "@fortawesome/free-solid-svg-icons";
import "./Student.css";

function Student(props) {
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gradYear, setGradYear] = useState("");

  useEffect(() => {
    setFirstName(props.student.firstName);
    setLastName(props.student.lastName);
    setEmail(props.student.email);
    setGradYear(props.student.gradYear);
  }, [props.student]);

  const saveStudent = () => {
    setEditMode(false);
    const updatedStudent = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      gradYear: gradYear,
      id: props.student.id,
      image: props.student.image,
    };
    props.updateStudent(updatedStudent);
  };

  return (
    <div className="card">
      <img
        src={props.student.image}
        alt="Happy Students"
        className="card-img-top mx-auto"
      />
      {!editMode && (
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-center">
            {props.student.firstName}
          </li>
          <li className="list-group-item text-center">
            {props.student.lastName}
          </li>
          <li className="list-group-item text-center">{props.student.email}</li>
          <li className="list-group-item text-center">
            {props.student.gradYear}
          </li>
          <li className="list-group-item">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => props.removeStudent(props.student)}
            >
              Delete{" "}
              <FontAwesomeIcon icon={faWarning}></FontAwesomeIcon>
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => setEditMode(true)}
            >
              Edit{" "}
              <FontAwesomeIcon icon={faMagicWandSparkles}></FontAwesomeIcon>
            </button>
          </li>
        </ul>
      )}

      {editMode && (
        <ul className="list-group-flush">
          <li className="list-group-item text-center">
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(evt) => setFirstName(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item text-center">
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(evt) => setLastName(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item text-center">
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(evt) => setEmail(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item text-center">
            <input
              type="text"
              className="form-control"
              value={gradYear}
              onChange={(evt) => setGradYear(evt.currentTarget.value)}
            />
          </li>
          <li className="list-group-item">
            <button
              id="btnSave"
              className="btn btn-secondary"
              onClick={saveStudent}
            >
              Save
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Student;
