import React from "react";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import { GameButtonsWrapper } from "./game";
import callBackend from "../helpers";

const AdminSectionWrapper = styled.div`
    padding: 1.5rem;
`
  
export default function AdminUploadQuestion() {
    const router = useRouter();
    const { register, handleSubmit, reset, formState, formState: { isSubmitSuccessful, errors } } = useForm();

    
    const handleReturnHome = () => {
        router.push('/');
    };

    const onSubmit = async (data) => {
        // e.preventDefault();
        console.log({data})
        try {
            await callBackend({
                method: 'POST',
                url: 'questions/create',
                payload: data,
            })
        } catch(err) {
            alert({err})
        }  
    }

    React.useEffect(() => {
        if (isSubmitSuccessful) {
          reset()
        }
      }, [formState, reset])
    
return (
    <AdminSectionWrapper className="main">
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="question">
                <Form.Label>Question</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter new quiz question" 
                    {...register("question", { required: true })}/>
                    <p className="danger">{errors.question && "This field is required"}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="correctAnswer">
                <Form.Label>Correct answer</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Correct answer is.."
                    {...register("correctAnswer", { required: true })} />
                    <p className="danger">{errors.correctAnswer && "This field is required"}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="badAnswer1">
                <Form.Label>Wrong answer 1</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Wrong answer is.." 
                    {...register("badAnswer1", { required: true })}/>
                    <p className="danger">{errors.badAnswer1 && "This field is required"}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="badAnswer2">
                <Form.Label>Wrong answer 1</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Another wrong answer is.." 
                    {...register("badAnswer2", { required: true })}/>
                    <p className="danger">{errors.badAnswer2 && "This field is required"}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="badAnswer3">
                <Form.Label>Wrong answer 1</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="And another wrong answer is.." 
                    {...register("badAnswer3", { required: true })}/>
                    <p className="danger">{errors.badAnswer3 && "This field is required"}</p>
            </Form.Group>

            <GameButtonsWrapper>
                <Button 
                    variant="primary" 
                    type="submit">
                    Upload to database
                </Button>
                <Button 
                    variant="secondary"
                    onClick={handleReturnHome}
                    className="buttonMinWidth">
                    Home 🏠
                </Button>
            </GameButtonsWrapper>
        </Form>
    </AdminSectionWrapper>
);
}
