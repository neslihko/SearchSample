import React from 'react';
import { Router, Route, Link } from 'react-router-dom';

import { history } from '@/_helpers';
import { userService } from '@/_services';
import { PrivateRoute } from '@/_components';
import { HomePage } from '@/HomePage';
import { LoginPage } from '@/LoginPage';
import { SearchPage } from '@/SearchPage';
import { ReportPage } from '@/ReportPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        userService.currentUser.subscribe(user => this.setState({ currentUser: user }));
    }

    logout() {
        userService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <div className="container">
                            <nav className="navbar navbar-expand navbar-dark bg-dark">
                                <div className="navbar-nav">
                                    <Link to="/" className="nav-item nav-link">Home</Link>
                                    <Link to="/search" className="nav-item nav-link">Search</Link>
                                    <Link to="/report" className="nav-item nav-link">Report</Link>
                                    <a onClick={this.logout} className="nav-item nav-link">Logout {currentUser.username}</a>
                                </div>
                            </nav>
                        </div>
                    }
                    <p></p>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/search" component={SearchPage} />
                                <PrivateRoute exact path="/report" component={ReportPage} />
                                <Route path="/login" component={LoginPage} />
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App }; 