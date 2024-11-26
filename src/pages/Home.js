import React from "react";
import { useNavigate } from "react-router-dom";
import { List, Typography, Card } from "antd";

const { Title } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const forms = [
    { name: "Incidents/Security/Maintenance", path: "/ims" },
    { name: "Uniform", id: "uniform" },
    { name: "Recalls", id: "recalls" },
    { name: "Stock Counts", id: "stock-counts-form-id" },
    { name: "Stocktakes", id: "stocktakes-form-id" },
  ];

  const handleNavigation = (form) => {
    if (form.name === "Incidents/Security/Maintenance") {
      navigate("/ims");
    } else {
      navigate("/form-viewer", { state: { selectedForms: [form] } });
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <Card>
        <Title level={2} style={{ textAlign: "center" }}>
          Forms
        </Title>
        <List
          dataSource={forms}
          renderItem={(form) => (
            <List.Item
              onClick={() => handleNavigation(form)}
              style={{
                cursor: "pointer",
                padding: "10px 20px",
                border: "1px solid #e8e8e8",
                borderRadius: "8px",
                marginBottom: "10px",
                transition: "all 0.3s",
                boxShadow: "none",
                transform: "scale(1)",
              }}
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
              <Typography.Text strong>{form.name}</Typography.Text>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Home;
