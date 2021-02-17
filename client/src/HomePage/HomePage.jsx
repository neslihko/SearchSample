import React from 'react';

import { userService } from '@/_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: userService.currentUserValue
        };
    }

    componentDidMount() {
    }

    render() {
        const { currentUser, logs } = this.state;
        return (
            <div>
                <h4>Hi {currentUser.firstName} {currentUser.lastName} - {currentUser.username}!</h4>
                <h6>Please use top navigation menu.</h6>
            </div>
        );
    }
}
export { HomePage };