import React from "react";
import { Row, Col } from "antd";

export const MainTemplate: React.FC = ({ children }) => {
  return (
    <Row>
      <Col span={12} offset={6}>
        {children}
      </Col>
    </Row>
  );
};
