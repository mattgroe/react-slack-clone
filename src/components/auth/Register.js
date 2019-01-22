import React from 'react';
import firebase from '../../firebase';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                console.log(createdUser);
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {

        const { username, email, password, passwordConfirmation } = this.state;

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="green" textAlign="center">
                        <Icon name="leaf" color="green" />
                        Register for TeamChat
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name="username" icon="user" iconpositon="left"
                            placeholder="Username" onChange={this.handleChange} value={username} type="text" />
                            
                            <Form.Input fluid name="email" icon="mail" iconpositon="left"
                            placeholder="Email Address" onChange={this.handleChange} value={email} type="email" />

                            <Form.Input fluid name="password" icon="lock" iconpositon="left"
                            placeholder="Password" onChange={this.handleChange} value={password} type="password" />

                            <Form.Input fluid name="passwordConfirmation" icon="repeat" iconpositon="left"
                            placeholder="Password Confirmation" onChange={this.handleChange} value={passwordConfirmation} type="password" />

                            <Button color="green" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    <Message>Already a user? <Link to="/login">Login</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;