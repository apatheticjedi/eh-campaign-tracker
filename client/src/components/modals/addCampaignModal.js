import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_CAMPAIGN } from '../../utils/mutations';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
} from 'reactstrap';

function AddCampaignModal(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [formState, setFormState] = useState({
        status: '',
        scenarios: '',
        investigators: '',
        cities: '',
        notes: ''
    });

    const [addCampaign, { error }] = useMutation(ADD_CAMPAIGN);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submits form and adds game to database
    const handleFormSubmit = async (event) => {
        try {
            await addCampaign({
                variables: { ...formState },
            });

        } catch (error) {
            console.log(error)
        }

        //clear form state
        setFormState({
            status: '',
            scenarios: '',
            investigators: '',
            cities: '',
            notes: ''
        });
    };

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} fullscreen>
                <ModalHeader size="lg" className="font campaign-modal-header" toggle={toggle}>Add Campaign!</ModalHeader>
                <ModalBody className="addCampaignModal">
                    <Form onSubmit={handleFormSubmit}>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label className="game-label font" for="title">
                                        Game Title
                                    </Label>
                                    <Input
                                        id="title"
                                        className="font"
                                        name="title"
                                        placeholder="Add Your Game's Title Here"
                                        type="text"
                                        value={formState.title}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label className="game-label font" for="username">
                                        Players
                                    </Label>
                                    <Input
                                        id="players"
                                        className="font"
                                        name="players"
                                        placeholder="Add the Players Here"
                                        type="text"
                                        value={formState.players}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label className="font game-label" for="gameModalWinner">
                                Winner
                            </Label>
                            <Input
                                id="winner"
                                className="font"
                                name="winner"
                                placeholder="Who Won?"
                                type="Text"
                                value={formState.winner}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="game-label font" for="score">
                                Score
                            </Label>
                            <Input
                                id="score"
                                className="font"
                                name="score"
                                placeholder="What was the score?"
                                type="text"
                                value={formState.score}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label className="game-label font" for="gameNotes">
                                Game Notes
                            </Label>
                            <Input
                                id="gameNotes"
                                className="font"
                                name="gameNotes"
                                placeholder="Anything you would like to remember for next Game?"
                                type="textarea"
                                value={formState.gameNotes}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="game-label font" for="link">
                                            Link
                                        </Label>
                                        <Input
                                            id="link"
                                            className="font"
                                            name="link"
                                            placeholder="Add a link to the game rules."
                                            type="text"
                                            value={formState.link}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label className="game-label font" for="image">
                                            Image
                                        </Label>
                                        <Input
                                            id="image"
                                            className="font"
                                            name="image"
                                            placeholder="Add an image of your Game."
                                            type="text"
                                            value={formState.image}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            {' '}
                            <Button onClick={toggle} className="submit-button" type="submit" value="submit" color='dark'>
                                Add Game
                            </Button>
                            <Button className="signup-cancel-button" onClick={toggle}>
                                Cancel
                            </Button>
                        </FormGroup>

                    </Form>
                </ModalBody>
            </Modal>

        </div>
    )
};

export default AddCampaignModal;