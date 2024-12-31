import React from 'react';
import Info from './Info';
import Header from './Header';
import Footer from './Footer';
import FilteredList from './FilteredList';
import {applyFilter, search, FILTER_ACTIVE} from '../../services/filter';

export default function TodoList(props) {
    const {list, filter, mode, query} = props.data;
    const {addNew, changeFilter, changeStatus, changeMode, setSearchQuery,changePriority, sortListByDueDate,sortListByPriority} = props.actions;


    const activeItemCount = applyFilter(list, FILTER_ACTIVE).length;
    const items = search(applyFilter(list, filter), query);

    // function sortListByPriority () {
    //     const priorityOrder = {
    //         "Low": 1,
    //         "Medium": 2,
    //         "High": 3
    //       };

    //       // Sort the array by priority
    //       list.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    //       return list;
    // }

    return (
        <div className="container">
            <div className="row">
                <div className="todolist">
                    <Header {...{addNew, mode, query, setSearchQuery}}/>
                    <FilteredList {...{items, changeStatus,changePriority}}/>
                    <Footer {...{activeItemCount, filter, changeFilter, mode, changeMode, sortListByPriority, sortListByDueDate }}/>
                    <Info {...{mode}}/>
                </div>
            </div>
        </div>
    );
}
