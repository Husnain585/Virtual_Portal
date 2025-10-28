// src/pages/teacher/Submissions.jsx
import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { getCourseGrades, getStudentGrades, updateGrade } from "../../api/grade.api";
import Button from "../../components/common/Button";
import { useToast } from "../../context/ToastContext";

const Submissions = () => {
  const { courseId } = useParams();
  const { data, refetch } = useFetch(`/api/courses/${courseId}/assignments`);
  const { success, error } = useToast();

  const handleGrade = async (assignmentId, submissionId) => {
    try {
      await getCourseGrades(assignmentId, submissionId, {
        score: 100,
        maxScore: 100,
        comments: "Excellent work",
      });
      success("Graded successfully");
      refetch();
    } catch {
      error("Failed to grade");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Submissions</h1>
      {data?.assignments?.map((assignment) => (
        <div key={assignment.id} className="bg-white rounded-xl shadow p-4 mb-4">
          <h3 className="font-semibold">{assignment.title}</h3>
          {assignment.submissions?.map((s) => (
            <div
              key={s.id}
              className="flex justify-between items-center border-t py-2 mt-2"
            >
              <div>
                <p className="text-sm font-medium">{s.student.name}</p>
                <p className="text-xs text-gray-500">{s.submittedAt}</p>
              </div>
              <Button
                size="sm"
                onClick={() => handleGrade(assignment.id, s.id)}
              >
                Grade
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Submissions;
