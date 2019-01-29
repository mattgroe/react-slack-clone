import React from 'react';
import firebase from '../../firebase';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: [],
            loading: false
        }
        this.handleChange = this.handleChange.bind(this);
    }

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({ errors: [], loading: true})
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log(signedInUser);
                })
                .catch(err => {
                    console.error(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false
                    })
                })
        }
    }

    isFormValid = ({ email, password }) => email && password;

    handleInputError = (errors, inputName) => {
        return errors.some(error => 
            error.message.toLowerCase().includes(inputName)
        ) ? 
        'error' 
        : 
        ''
    }

    render() {

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet" />
                        Login
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name="email" icon="mail" iconpositon="left"
                            placeholder="Email Address" onChange={this.handleChange} value={this.state.email} type="email" 
                            className={this.handleInputError(this.state.errors, 'email')} />

                            <Form.Input fluid name="password" icon="lock" iconpositon="left"
                            placeholder="Password" onChange={this.handleChange} value={this.state.password} type="password" 
                            className={this.handleInputError(this.state.errors, 'password')} />

                            <Button disabled={this.state.loading} className={this.state.loading ? 'loading' : ''} color="violet" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    {this.state.errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(this.state.errors)}
                        </Message>
                    )}
                    <Message>Don't have an account? <Link to="/register">Create one!</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Login;