import React, { useState, useEffect } from "react";

import arrayShuffle from "array-shuffle";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import styled from "styled-components";

import Question from "../components/question";
import callBackend from "../helpers";


const CounterWrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
`;

export default function Game() {
    const [questions, setQuestions] = useState([]);
    const [pickedQuestions, setPickedQuestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [rightAnswers, setRightAnswers] = useState(0);
    const [loading, setLoading] = useState(true)
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const numberOfQuestions = 5;

    // get questions from db
    useEffect(()=> {
        // TODO: use react-query, see notes from previous app
        const loadQuestions = async () => {
            try {
                const questionsFromDb = await callBackend({method: 'GET', url: 'questions'});
                if (questionsFromDb) {
                    setQuestions(questionsFromDb);
                }
            } catch(err) {
                alert(err)
            }
        }
        loadQuestions();
    }, [])

    useEffect(()=> {
        setPickedQuestions(getQuestions());
        setLoading(false);
    }, [questions])


    const getQuestions = () => {
        const shuffledQuestions = arrayShuffle(questions).slice(0, numberOfQuestions);
        
        return shuffledQuestions.map((x)=>{
            // re-format questions from db to better format for shuffle
            const answers = [
                {text:x.correctAnswer, correct:true},
                {text:x.badAnswer1, correct:false},
                {text:x.badAnswer2, correct:false},
                {text:x.badAnswer3, correct:false},
            ];
            return {
                question: x.question,
                answers: arrayShuffle(answers)
            }
        });
    }

    // for starting a new quiz
    const newQuiz = () => {
        setPickedQuestions(getQuestions());
        setSelectedIndex(0);
        setRightAnswers(0);
        setShowSuccessToast(false);
        setShowErrorToast(false);
    }

    const answerClicked = (index) => {
        const question = pickedQuestions[selectedIndex];
        if (question?.answers[index]?.correct) {
            setRightAnswers(rightAnswers+1);
            setShowSuccessToast(true);
        } else {
            setShowErrorToast(true);
        }
        setSelectedIndex(selectedIndex+1)
    }

    return (
        <div className="main">
            {
                loading 
                    ? <p>Loading questions...</p>
                    : 
                    <>
                        <div>
                            {selectedIndex < numberOfQuestions
                                ? 
                                <div>
                                    <ToastContainer
                                        className="p-3"
                                        position="top-center"
                                        style={{ zIndex: 1 }}
                                    >
                                    <Toast 
                                        onClose={() => setShowErrorToast(false)} 
                                        show={showErrorToast} 
                                        delay={1000} 
                                        bg="danger"
                                        autohide
                                        >
                                        <Toast.Header>
                                            <img
                                            src="flight.png"
                                            className="rounded me-2"
                                            alt=""
                                            width="50"
                                            height="50"
                                            />
                                            <strong className="me-auto">Nope...</strong>
                                        </Toast.Header>
                                        <Toast.Body className="ml-2">
                                            Try another question.
                                        </Toast.Body>
                                    </Toast>
                                    <Toast 
                                        onClose={() => setShowSuccessToast(false)} 
                                        show={showSuccessToast} 
                                        delay={1000} 
                                        bg="success"
                                        autohide
                                        >
                                        <Toast.Header>
                                            <img
                                            src="kick.png"
                                            className="rounded me-2"
                                            alt=""
                                            width="100"
                                            height="50"
                                            />
                                            <strong className="me-auto">Hell yeah!</strong>
                                        </Toast.Header>
                                        <Toast.Body className="ml-2">
                                            Good job.
                                        </Toast.Body>
                                    </Toast>
                                    </ToastContainer>
                                        <CounterWrapper>Question {selectedIndex + 1} / {numberOfQuestions}</CounterWrapper>
                                        <Question
                                            individualQuestion={pickedQuestions[selectedIndex] || {}}
                                            answerClicked={answerClicked} />
                                </div>
                                : <div className="center"> 
                                    <h1 className="mb-4">Quiz finished - correct answers {rightAnswers}/{numberOfQuestions}</h1>
                                    <Button 
                                        onClick={newQuiz}
                                        variant="success">
                                        Play again!
                                    </Button>
                                </div>
                            }
                        </div>
                    </>
            }
        </div>
    );
}