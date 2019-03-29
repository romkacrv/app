import React, {useEffect } from 'react';
import {connect} from 'react-redux';
import {fetchListIfNeeded, listItemRemove} from './../redux/actions';

const ListWrapper = (props) => {
  const { isFetching, error } = props;

  if (isFetching) {
    return <div>...loading</div>
  }

  if (error) {
    return <div>{error.status} {error.statusText}</div>
  }

  return props.children;
};

const ListItem = (props) => {

  const { Name, Price, Location, index, } = props;

  return <li>
    {Name} {Price} {Location}
    <button onClick={() => props.onClickRemove(index)}>x</button>
  </li>
};

const List = (props) => {
  useEffect(() => {
    props.fetchListIfNeeded();
  }, []);

  const onClickRemove = (index) => {
    props.listItemRemove(index);
  };

  const {isFetching, data, error} = props;

  return (
    <ListWrapper
      isFetching={isFetching}
      error={error}
    >
      <ul>
        {data.map((item, key) => {
          return <ListItem
            {...item}
            onClickRemove={onClickRemove}
            index={key}
            key={key}
          />
        })}
      </ul>
    </ListWrapper>
  )
};

export default connect((state, ownProps) => {
  const reducer = state.reducer;

  return {
    ...reducer
  }
}, (dispatch, ownProps) => {
  return {
    fetchListIfNeeded: () => dispatch(fetchListIfNeeded()),
    listItemRemove: (index) => dispatch(listItemRemove(index))
  }
})(List);
