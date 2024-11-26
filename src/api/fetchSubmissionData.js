const fetchLatestSubmissionData = async (formID) => {
  const apiKey = "3cd0f7d5cd30019a0c3924874876e21c"; // Replace with your JotForm API Key

  // Fetch all submissions for a form
  const fetchFormSubmissions = async (formID) => {
    const url = `https://shiploads.jotform.com/API/form/${formID}/submissions?apiKey=${apiKey}`;
      
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("data",data);

      if (data && data.content && data.content.length > 0) {
        console.log("Fetched Submissions:", data.content);
        return data.content;
      } else {
        console.error("No submissions found for form:", formID);
        return [];
      }
    } catch (error) {
      console.error("Error fetching form submissions:", error);
      return [];
    }
  };

  // Extract latest submission ID
  const getLatestSubmissionID = (submissions) => {
    if (submissions.length === 0) {
      return null;
    }

    // Assuming submissions are sorted by creation date descending (latest first)
    const latestSubmission = submissions[0];
    console.log("Latest Submission ID:", latestSubmission.id);
    return latestSubmission.id;
  };

  // Fetch data for a specific submission ID
  const fetchSubmissionData = async (submissionID) => {
    const url = `https://shiploads.jotform.com/API/submission/${submissionID}?apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.content) {
        console.log("Fetched Submission Data:", data.content);
        return data.content.answers;
      } else {
        console.error("Failed to fetch submission data for ID:", submissionID);
        return null;
      }
    } catch (error) {
      console.error("Error fetching submission data:", error);
      return null;
    }
  };

  // Main logic
  try {
    // Step 1: Fetch all submissions for the form
    const submissions = await fetchFormSubmissions(formID);
    console.log("submissions:", submissions)
    // Step 2: Get the latest submission ID
    const latestSubmissionID = getLatestSubmissionID(submissions);


    if (!latestSubmissionID) {
      console.log("No submissions found for the form.");
      return null;
    }

    // Step 3: Fetch data for the latest submission
    const submissionData = await fetchSubmissionData(latestSubmissionID);
    return submissionData;
  } catch (error) {
    console.error("Error fetching latest submission data:", error);
    return null;
  }
};

export default fetchLatestSubmissionData;
