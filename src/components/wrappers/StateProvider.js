import React, { Component } from 'react';
import { FILTER_ALL } from '../../services/filter';
import { MODE_CREATE, MODE_NONE } from '../../services/mode';
import { objectWithOnly, wrapChildrenWith } from '../../util/common';
import { getAll, addToList, updateStatus, sortByDueDate, sortByPriority } from '../../services/todo';

class StateProvider extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      mode: MODE_CREATE,
      filter: FILTER_ALL,
      list: getAll(),
    };
  }

  render() {
   
    let children = wrapChildrenWith(this.props.children, {
      data: this.state,
      actions: objectWithOnly(this, [
        'addNew',
        'changeFilter',
        'changeStatus',
        'changeMode',
        'setSearchQuery',
        'sortListByDueDate',
        'sortListByPriority',
      ]),
    });

    return <div>{children}</div>;
  }

  addNew = (text) => {
    const updatedList = addToList(this.state.list, { text, completed: false });
    this.setState({ list: updatedList });
  };

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  changeStatus = (itemId, completed) => {
    const updatedList = updateStatus(this.state.list, itemId, completed);
    this.setState({ list: updatedList });
  };

  changeMode = (mode = MODE_NONE) => {
    this.setState({ mode });
  };

  setSearchQuery = (text) => {
    this.setState({ query: text || '' });
  };

  sortListByDueDate = (order) => {
    const sortedList = sortByDueDate(this.state.list, order);
    this.setState({ list: sortedList });
  };

  sortListByPriority = () => {
    const sortedList = sortByPriority(this.state.list);
    this.setState({ list: sortedList });
  };
}

export default StateProvider;
