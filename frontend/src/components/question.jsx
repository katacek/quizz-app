import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled(Button)`
    margin: 1rem;
    width: 16rem;
`

const QuestionWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function Question ({individualQuestion, answerClicked}) {
    return (
        <div className="p-4">
            <h2 className="mt-4">
                { individualQuestion.question }
            </h2>
            <QuestionWrapper>
                { individualQuestion?.answers?.map((el,index)=>
                        <StyledButton 
                            onClick={()=>answerClicked(index)}
                            key={index} >
                                {el.text}
                        </StyledButton>
                )}
            </QuestionWrapper>
        </div>

    )
}

Question.propTypes = {
    individualQuestion: PropTypes.object,
    answerClicked: PropTypes.func,
  };