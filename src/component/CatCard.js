import React from "react";
import { Card } from 'antd';
const { Meta } = Card;
const CatCard = ({image , titre , description}) => (
  <Card
    hoverable
    style={{
      width: "100%",
      height:"30px",
      backgroundColor:"black"
    }}
    cover={<img alt={titre} src={image} />}
    size="small"
  >
    <Meta title={titre} description={description} />
  </Card>
);
export default CatCard;