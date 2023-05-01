import React from "react";
import styled from "styled-components";

const StarRating = styled.div`
  display: flex;
  font-size: 0;
`;

const StarLabel = styled.label`
  display: flex;
  font-size: 24px;
  color: lightgrey;

  &.filled {
    color: gold;
  }
`;

const ReviewStars = ({ reviewRating }) => {
  const numStars = Math.round(reviewRating);

  return (
    <StarRating>
      {[...Array(numStars)].map((_, index) => (
        <StarLabel key={index} className="filled">
          ★
        </StarLabel>
      ))}
      {[...Array(5 - numStars)].map((_, index) => (
        <StarLabel key={index}>☆</StarLabel>
      ))}
    </StarRating>
  );
};

export default ReviewStars;
