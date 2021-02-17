import React from 'react';

import { searchService, userService } from '@/_services';

class SearchPage extends React.Component {
    constructor(props) {
        super(props);

        if (!userService.currentUserValue) {
            this.props.history.push('/');
            return null;
        }

        this.state = {
            url: '',
            expression: '',
            submitted: false,
            result: null,
            message: null,
            success: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { url, expression } = this.state;
        const { dispatch } = this.props;
        if (url && expression) {
            searchService.searchWeb(url, expression)
                .then(result => {
                    var success = result.success;
                    var data = result.data;
                    var message = result.message;
                    this.setState({ success: success, message: message, result: data });
                });
        }
    }

    render() {
        const { searching } = this.props;
        const { url, expression, submitted, result, success, message } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Search</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !url ? ' has-error' : '')}>
                        <label htmlFor="url">URL</label>
                        <input type="text" className="form-control" name="url" value={url} onChange={this.handleChange} />
                        {submitted && !url &&
                            <div className="help-block">URL required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !expression ? ' has-error' : '')}>
                        <label htmlFor="expression">Expression</label>
                        <input type="expression" className="form-control" name="expression" value={expression} onChange={this.handleChange} />
                        {submitted && !expression &&
                            <div className="help-block">Expression required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Search</button>
                        {searching &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                    {success &&
                        <div className="form-group">
                            <p>Found "<strong>{result.query}</strong> {result.hitCount} times in <a href={result.url} target='_blank'>{result.url}</a></p>
                        </div>
                    }
                    {!success && message &&
                        <div className="form-group">
                            <p className="alert alert-danger">{message}</p>
                        </div>
                    }
                </form>
            </div>
        );
    }
}

export { SearchPage };


// class SearchPage extends React.Component {
//     constructor(props) {
//         super(props);

//         if (!userService.currentUserValue) {
//             this.props.history.push('/');
//             return null;
//         }

//         this.state = {
//             currentUser: userService.currentUserValue,
//             results: null
//         };
//     }

//     componentDidMount() {
//         searchService.getLogs().then(logs => this.setState({ logs: logs }));
//     }

//     render() {
//         const { currentUser, logs } = this.state;
//         return (
//             <div>
//                 <h1>Hi {currentUser.firstName}!</h1>
//                 <h3>Logs:</h3>
//                 {logs &&
//                     <ul>
//                         {logs.map(log =>
//                             <li key={log.id}>Query "{log.query}" was found {log.hitCount} times in {log.url} at {log.searchDate}.</li>
//                         )}
//                     </ul>
//                 }
//             </div>
//         );
//     }
// }

// export { SearchPage };