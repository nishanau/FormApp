import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Typography, List } from "antd";

const { Title } = Typography;

const IMS = () => {
  const [selectedForms, setSelectedForms] = useState([]);
  const navigate = useNavigate();

  // Array of forms with names and corresponding IDs/paths
  const forms = [
    { name: "Form 1", id: "form1" },
    { name: "Form 2", id: "form2" },
    { name: "Form 3", id: "form3" },
  ];

  // Handle starting the form filling process
  const handleStartFilling = () => {
    if (selectedForms.length > 0) {
      navigate("/form-viewer", { state: { selectedForms: selectedForms } });
    }
  };

  // Handle form selection
  const handleSelect = (form) => {
    if (selectedForms.some((f) => f.id === form.id)) {
      setSelectedForms(selectedForms.filter((f) => f.id !== form.id));
    } else {
      setSelectedForms([...selectedForms, form]);
    }
  };

  return (
    <div>
      <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
        <Card>
          <Title
            level={2}
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            IMS Forms
          </Title>
          <List
            dataSource={forms}
            renderItem={(form) => (
              <List.Item
                key={form.id} // Use the `id` as a unique key
                style={{
                  padding: "10px 20px",
                  border: "1px solid #e8e8e8",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  transition: "all 0.3s",
                  boxShadow: "none",
                  transform: "scale(1)",
                  backgroundColor: selectedForms.some((f) => f.id === form.id) // Check if the `id` exists
                    ? "blue"
                    : "white",
                  color: selectedForms.some((f) => f.id === form.id) // Adjust text color based on selection
                    ? "white"
                    : "black",
                  cursor: "pointer",
                }}
                onClick={() => handleSelect(form)} // Pass the entire form object
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.2)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {form.name}
              </List.Item>
            )}
          />

          {selectedForms.length > 0 && (
            <Button
              type="primary"
              block
              style={{ marginTop: "20px" }}
              onClick={handleStartFilling}
            >
              Start Filling
            </Button>
          )}
        </Card>
      </div>
      <button
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          backgroundColor: "#1890ff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px 15px",
          cursor: "pointer",
          fontSize: "16px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default IMS;
