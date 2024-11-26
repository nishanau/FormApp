import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useCallback } from "react";
import { message } from "antd";
import fetchLatestSubmissionData from "../api/fetchSubmissionData";
const FormViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedForms } = location.state || {};

  const iframeRef = useRef();
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const currentForm = selectedForms ? selectedForms[currentFormIndex] : null;


  const handleNextForm = useCallback(() => {

    if (currentFormIndex < selectedForms.length - 1) {
      setCurrentFormIndex(currentFormIndex + 1);
      setIsFormSubmitted(false);
    } else {
      message.success("All forms completed");
      // Add a 1-second delay before redirecting to the homepage
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [currentFormIndex, selectedForms, navigate]);

  useEffect(() => {
    const handleMessage = async (event) => {
      // Check if the message is from the correct origin
      if (event.origin === "https://shiploads.jotform.com") {
        const data = event.data;
       
        // Filter messages to only handle 'submission-completed' events
        if (data.action === "submission-completed") {
          
          setIsFormSubmitted(true);
            const formID = data.formID;
            console.log(formID);
            try{
                const submissionData = await fetchLatestSubmissionData(formID);
                console.log("submission data:",submissionData);
            }catch (error) {
                console.error("Error fetching submission data:", error);
              }
      
          setTimeout(5000);
          handleNextForm();
        }
      }
    };

    // Add the event listener for message events
    window.addEventListener("message", handleMessage);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("message", handleMessage);
  }, [currentFormIndex, handleNextForm]);

  if (!selectedForms || selectedForms.length === 0) {
    return <div>No forms selected. Please go back and select forms.</div>;
  }

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <iframe
        ref={iframeRef}
        title={`Form ${currentForm}`}
        src={`https://shiploads.jotform.com/team/admin/${currentForm.id
          .replace(/\s+/g, "-")
          .toLowerCase()}/`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
          overflow: "hidden",
        }}
      />
      {isFormSubmitted && currentFormIndex < selectedForms.length - 1 && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        >
          <Button type="primary" onClick={handleNextForm}>
            Next Form
          </Button>
        </div>
      )}
    </div>
  );
};

export default FormViewer;
