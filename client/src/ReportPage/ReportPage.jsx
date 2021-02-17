import React from 'react';

import { searchService, userService } from '@/_services';

class ReportPage extends React.Component {
    constructor(props) {
        super(props);

        if (!userService.currentUserValue) {
            this.props.history.push('/');
            return null;
        }

        this.state = {
            currentUser: userService.currentUserValue,
            logs: null,
            loading: true
        };
    }

    componentDidMount() {
        searchService.getLogs().then(logs => this.setState({ logs: logs, loading: false }));
    }

    render() {
        const { currentUser, logs, loading } = this.state;
        return (
            <div>
                <h1>Hi {currentUser.firstName}!</h1>
                <h3>Search report:</h3>
                {loading &&
                    <p><em>Loading...</em></p>
                }
                {logs &&
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Query</th>
                                <th scope="col">Page</th>
                                <th scope="col">Hit count</th>
                                <th scope="col">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log =>
                                <tr key={log.id}>
                                    <td>{log.query}</td>
                                    <td><a href={log.url} target='_blank'>{log.url}</a></td>
                                    <td>{log.hitCount}</td>
                                    <td>{log.searchDate}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

export { ReportPage };