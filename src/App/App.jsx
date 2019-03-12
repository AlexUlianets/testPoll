import React from 'react';
import { connect } from 'react-redux';
import {Router, Route, Switch} from "react-router-dom";
import PropTypes from 'prop-types';

import { history } from '../_helpers';

import {PollPage} from "../PollPage";



class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
    }

    render() {
        return (
            <Router history={history} >
                <div>
                    <Switch>
                        <Route path="/" component={PollPage} />
                    </Switch>
                </div>
            </Router>

        );
    }
}

function mapStateToProps(state) {
    const { alert, authentication, company } = state;
    return {
        alert, authentication, company
    };
}

App.proptypes = {
    location: PropTypes.object.isRequired,
};


const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 