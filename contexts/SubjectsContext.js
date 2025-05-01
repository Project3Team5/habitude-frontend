import React, { createContext, useContext, useState } from "react";

const SubjectsContext = createContext();

export const SubjectsProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);

  const addSubject = (subject) => {
    setSubjects((prev) => [...prev, { ...subject, observations: [] }]);
  };

  const addObservation = (subjectId, observation) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject.id === subjectId
          ? {
              ...subject,
              observations: [...(subject.observations || []), observation],
            }
          : subject
      )
    );
  };

  const getObservationsBySubjectId = (subjectId) => {
    const subject = subjects.find((s) => s.id == subjectId);
    return subject?.observations || [];
  };

  return (
    <SubjectsContext.Provider
      value={{ subjects, addSubject, addObservation, getObservationsBySubjectId }}
    >
      {children}
    </SubjectsContext.Provider>
  );
};

export const useSubjects = () => useContext(SubjectsContext);
