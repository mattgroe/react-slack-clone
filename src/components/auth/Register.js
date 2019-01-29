import React from 'react';
import firebase from '../../firebase';
import md5 from 'md5';
import { Grid, Form, Segment, Button, Header, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            errors: [],
            loading: false,
            usersRef: firebase.database().ref('users')
        }
        this.handleChange = this.handleChange.bind(this);
    }

    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            // throw error
            error = { message: 'Fill in all fields' };
            this.setState({ errors: errors.concat(error) });
            return false;
        } else if (!this.isPasswordValid(this.state)) {
            // throw error
            error = { message: 'Password is invalid'};
            this.setState({ errors: errors.concat(error) });
            return false;
        } else {
            // form valid
            return true;
        }
    }

    isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    }

    isPasswordValid = ({ password, passwordConfirmation }) => {
        if (password.length < 6 || passwordConfirmation < 6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    }

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid()) {
            this.setState({ errors: [], loading: true})
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser);
                    createdUser.user.updateProfile({
                        displayName: this.state.username,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                    })
                    .then(() => {
                        this.saveUser(createdUser).then(() => {
                            console.log('user saved');
                        })
                    })
                    .catch((err) => {
                        console.error(err);
                        this.setState({ errors: this.state.errors.concat(err), loading: false });
                    })
                    // this.setState({ loading: false });
                })
                .catch(err => {
                    console.error(err);
                    this.setState({ errors: this.state.errors.concat(err), loading: false })
                })
        }
    }

    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        });
    }

    handleInputError = (errors, inputName) => {
        return errors.some(error => 
            error.message.toLowerCase().includes(inputName)
        ) ? 
        'error' 
        : 
        ''
    }

    render() {

        const { username, email, password, passwordConfirmation, errors, loading } = this.state;

        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h1" icon color="violet" textAlign="center">
                        <Icon name="leaf" color="violet" />
                        Register
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name="username" icon="user" iconpositon="left"
                            placeholder="Username" onChange={this.handleChange} value={username} type="text" />
                            
                            <Form.Input fluid name="email" icon="mail" iconpositon="left"
                            placeholder="Email Address" onChange={this.handleChange} value={email} type="email" 
                            className={this.handleInputError(errors, 'email')} />

                            <Form.Input fluid name="password" icon="lock" iconpositon="left"
                            placeholder="Password" onChange={this.handleChange} value={password} type="password" 
                            className={this.handleInputError(errors, 'password')} />

                            <Form.Input fluid name="passwordConfirmation" icon="repeat" iconpositon="left"
                            placeholder="Password Confirmation" onChange={this.handleChange} value={passwordConfirmation} type="password" 
                            className={this.handleInputError(errors, 'password')} />

                            <Button disabled={loading} className={loading ? 'loading' : ''} color="violet" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(this.state.errors)}
                        </Message>
                    )}
                    <Message>Already a user? <Link to="/login">Login</Link></Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;