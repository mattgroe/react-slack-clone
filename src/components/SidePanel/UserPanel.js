import React from 'react';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';
import firebase from '../../firebase';

class UserPanel extends React.Component {

    dropDownOptions = () => [
        {
            key: 'user',
            text: <span>Signed in as <strong>User</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Change Avatar</span>
        },
        {
            key: 'signup',
            text: <span onClick={this.handleSignout}>Sign Out</span>
        }
    ];

    handleSignout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                console.log("Signed out...")
            })
    }

    render() {
        return (
            <Grid style={{ background: '#4c3c4c' }}>
                <Grid.Column>
                    <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                        {/* App Header */}
                        <Header inverted floated='left' as='h2'>
                            <Icon name='code' />
                            <Header.Content>TeamChat</Header.Content>
                        </Header>
                    </Grid.Row>

                    {/* User Dropdown w/Logout */}
                    <Header style={{ padding: '0.25em' }} as='h4' inverted>
                        <Dropdown trigger={
                            <span>User</span>
                        } options={this.dropDownOptions()} />
                    </Header>
                </Grid.Column>
            </Grid>
        );
    }
}

export default UserPanel;