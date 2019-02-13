import React from 'react';
import firebase from 'firebase';
import { Menu, Icon } from 'semantic-ui-react';

class DirectMessages extends React.Component {
    state = {
        user: this.props.currentUser,
        users: [],
        usersRef: firebase.database().ref('users'),
        connectedRef: firebase.database().ref('.info/connected'),
        presenceRef: firebase.database().ref('preference')
    }

    componentDidMount() {
        if (this.state.user) {
            this.addListener(this.state.user.uid);
        }
    }

    addListener = currentUserUid => {
        let loadedUsers = [];
        this.state.usersRef.on('child_added', snap => {
            if (currentUserUid !== snap.key) {
                let user = snap.val();
                user['uid'] = snap.key;
                user['status'] = 'offline';
                loadedUsers.push(user);
                this.setState({ users: loadedUsers })
            }
        });

        this.state.connectedRef.on('value', snap => {
            if (snap.val() === true) {
                const ref = this.state.presenceRef.child(currentUserUid);
                ref.set(true);
                ref.onDisconnect().remove(err => {
                    if (err !== null) {
                        console.error(err);
                    }
                })
            }
        });

        this.state.presenceRef.on('child_added', snap => {
            if (currentUserUid !== snap.key) {
                // add status to user
                this.addStatusToUser(snap.key);
            }
        });

        this.state.presenceRef.on('child_removed', snap => {
            if (currentUserUid !== snap.key) {
                // add status to user
                this.addStatusToUser(snap.key);
            }
        })
    }

    addStatusToUser = (userId, connected = true) => {
        const updatedUser = this.state.users.reduce((acc, user) => {
            if (user.uid === userId) {
                user['status'] = `${connected ? 'online' : 'offline'}`;
            }
            return acc.concat(user);
        }, []);
        this.setState({ users: updatedUser })
    }

    isUserOnline = user => user.status === 'online';

    render() {
        const { users } = this.state;

        return(
            <Menu.Menu className='menu'>
                <Menu.Item>
                    <span>
                        <Icon name="mail" /> DIRECT MESSAGES
                    </span> {' '}
                    ({ users.length })
                </Menu.Item>
                {/* Users to send Direct Messages */}
                {users.map(user => (
                    <Menu.Item
                        key={user.uid}
                        onClick={() => console.log(user)}
                        style={{ opacity: 0.7, fontStyle: 'italic'}}
                    >
                        <Icon 
                            name='circle'
                            color={this.isUserOnline(user) ? 'green' : 'red'}
                        />
                        @ {user.name}
                    </Menu.Item>
                ))}
            </Menu.Menu>
        );
    }
}

export default DirectMessages;