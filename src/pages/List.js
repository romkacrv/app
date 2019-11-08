import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchListIfNeeded, listItemRemove } from './../redux/actions';
import PropTypes from 'prop-types';

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

const List = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListIfNeeded())
  }, [dispatch]);

  const state = useSelector((state) => state.reducer)
  const { isFetching, data, error } = state;

  const onClickRemove = useCallback((index) => {
    dispatch(listItemRemove(index))
  }, [dispatch])

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

export default List;
