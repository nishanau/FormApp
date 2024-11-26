import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Typography, List } from "antd";

const { Title } = Typography;

const MultiFormViewer = () => {
  const [selectedForms, setSelectedForms] = useState([]);
  const navigate = useNavigate();

  const forms = ["Form 1", "Form 2", "Form 3"];

  const handleSelect = (form) => {
    if (selectedForms.includes(form)) {
      setSelectedForms(selectedForms.filter((f) => f !== form));
    } else {
      setSelectedForms([...selectedForms, form]);
    }
  };

  const handleStartFilling = () => {
    if (selectedForms.length > 0) {
      navigate("/form-viewer", { state: { selectedForms } });
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
                style={{
                  padding: "10px 20px",
                  border: "1px solid #e8e8e8",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  transition: "all 0.3s",
                  boxShadow: "none",
                  transform: "scale(1)",
                  backgroundColor: selectedForms.includes(form)
                    ? "#1890ff"
                    : "white",
                  color: selectedForms.includes(form) ? "white" : "black",
                  cursor: "pointer",
                }}
                onClick={() => handleSelect(form)}
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
                {form}
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

export default MultiFormViewer;
