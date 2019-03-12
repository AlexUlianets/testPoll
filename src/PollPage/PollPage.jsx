import React from 'react';
import { connect } from 'react-redux';
import {pollActions} from '../_actions';
import {Alert, Button, ButtonToolbar, Col, Container, Form, Row} from 'react-bootstrap';
import MultiSelect from "@kenshooui/react-multi-select";
import "@kenshooui/react-multi-select/dist/style.css"

class PollPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            poll: props.poll,
            onlinePoll: false,
            questions: [
                { id: 0, label: "How often do you play sports?" },
                { id: 2, label: "What skill would you like to master?"},
                { id: 3, label: "What would be the most amazing adventure to go on?" },
                { id: 4, label: "What’s your favorite drink?" }
            ],
            user: [],
            selectedQuestions: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.openPollForm = this.openPollForm.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if ( JSON.stringify(this.props.poll) !==  JSON.stringify(newProps.poll)) {

            this.setState({...this.state, poll: newProps.poll})
        }
    }

    render() {
        const { poll, onlinePoll, questions, selectedQuestions } = this.state;

        return (
            <div>
                <Container>
                    <Row className="justify-content-md-center">
                        {!onlinePoll &&
                            <Col md="5">
                                <Form  className="mt-5">
                                    <Form.Label>Your name</Form.Label>
                                    <Form.Control type="name" placeholder="Enter name" name="name" onChange={(e) => this.handleChangeForm(e)}/>
                                </Form>
                                <ButtonToolbar>
                                    <Button variant="success" size="xxl" onClick={() => this.openPollForm()}>
                                        Create online poll
                                    </Button>
                                </ButtonToolbar>
                            </Col>
                        }
                        {onlinePoll &&
                            <Col md="10">
                                <div className="mt-5">
                                    <MultiSelect
                                        items={questions}
                                        selectedItems={selectedQuestions}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                {poll.error &&
                                <Alert variant="danger" className="mt-3">
                                    {poll.error}
                                </Alert>
                                }
                                {poll.data &&
                                <Alert variant="danger" className="mt-3">
                                    Success! You have added your poll:)
                                </Alert>
                                }
                                <ButtonToolbar  className="mt-3">
                                    <Button variant="success" size="xxl" onClick={() => this.sendRequest()}>
                                        Save online poll
                                    </Button>
                                </ButtonToolbar>
                            </Col>
                        }

                    </Row>
                </Container>
            </div>
        );
    }

    handleChange(selectedQuestions) {
        this.setState({ selectedQuestions });
    }

    handleChangeForm(e) {
        const { name, value } = e.target;

        this.setState({...this.state, user: {[name]: value }});
    }

    sendRequest (){
        const { dispatch } = this.props;
        const { user, selectedQuestions } = this.state;

        dispatch(pollActions.create(user, selectedQuestions));
    }

    openPollForm (){
        this.setState({...this.state, onlinePoll: true})
    }
}

function mapStateToProps(state) {

    const { poll } = state;
    return {
        poll
    };
}

const connectedPollPage = connect(mapStateToProps)(PollPage);
export { connectedPollPage as PollPage };