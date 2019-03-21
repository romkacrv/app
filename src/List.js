import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {fetchList} from "./store";

const Data = (props) => {
    const {data} = props;

    return <div>
        {data.map((item, key) => {
            return <div key={`list-${key}`}>{item.Name} {item.Price} {item.Location}</div>
        })}
        <Link to='/'>home</Link>
    </div>
};

const Loading = (props) => {
    const {isFetching} = props;

    if (isFetching) {
        return <div>...loading</div>
    }

    return props.children;
};

const Access = (props) => {

    if (props.error) {
        return <div>Error: {props.error.status}</div>
    }

    if (!props.isFetching && props.data.length <= 0) {
        return <Redirect to='/'/>
    }

    return props.children;
};

class List extends Component {
    componentDidMount() {
        this.props.fetchList();
    }

    render() {
        return (
            <Loading  {...this.props}>
                <Access {...this.props} >
                    <Data {...this.props} />
                </Access>
            </Loading>
        )
    }
}

export default connect(
    (state, ownProps) => {
        const {data, error, isFetching} = state.list;

        return {
            data,
            error,
            isFetching
        }

    },
    (dispatch, ownProps) => {
        return {
            fetchList: (data) => dispatch(fetchList(data))
        }
    }
)(List);