import { useState } from "react";
import { View } from "react-native-web";
import styled from "styled-components/native";

const StarRating = styled(View)`
  display: flex;
  font-size: 0;
`;

const StarInput = styled.input`
  display: none;

  &:checked ~ label {
    color: gold;
  }
`;

const StarLabel = styled.label`
  display: flex;
  font-size: 24px;
  color: lightgrey;
  cursor: pointer;

  &:hover,
  &:hover ~ label {
    color: gold;
    ${props => props.hovered && `
      background: linear-gradient(to right, gold ${props.percent}%, lightgrey ${props.percent}%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `}
  }
`;

const RatingStars = ({ reviewRating, onChange }) => {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleClick = (index) => {
    onChange(index + 1);
  };

  const getPercent = (index) => {
    const rating = hovered !== null ? hovered : reviewRating;
    return Math.round((index / 4) * 100);
  };

  return (
    <StarRating>
      {[...Array(5)].map((_, index) => (
        <StarInput
          key={index}
          type="radio"
          name="reviewRating"
          id={`reviewRating-${index}`}
          value={index + 1}
          checked={reviewRating === index + 1}
          onChange={() => { }}
        />
      ))}
      {[...Array(5)].map((_, index) => (
        <StarLabel
          key={index}
          htmlFor={`reviewRating-${index}`}
          hovered={index < (hovered || reviewRating)}
          percent={getPercent(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave()}
          onPress={() => handleClick(index)}
        >
          {index < (hovered || reviewRating) ? '★' : '☆'}
        </StarLabel>
      ))}
    </StarRating>
  );
};

export default RatingStars;
