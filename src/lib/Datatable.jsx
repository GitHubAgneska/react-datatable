import { useEffect, useReducer } from "react"
import { ComponentWrapper } from './DataTable_style'
import { reducer, initialState } from './datatable_state'

import Table from  './Table/Table'
import Pagination from "./Pagination/Pagination"
import SelectEntriesBox from './SelectEntriesBox/SelectEntriesBox'
import SearchBox from "./SearchBox/SearchBox"

const Datatable = () => {
    
    const [ state, dispatch ] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({type:'init'})
    }, [])

    useEffect(() => {
        console.log('state changed:', state)
    }, [state])

    const entriesOptions = [ 15, 30, 50]
    const selectEntriesAmount = (n) => { dispatch({ type:'setEntriesPerPage', value: n })}
    const currentlyShowing = state.currentPage?.length
    const listTotal = state.collection?.length

    const changePage = (pageNumber) => { dispatch({ type: 'setCurrentPage', value: pageNumber})}
    const sortListBy = (sortParam, reverse ) => { dispatch({ type: 'sortList', value: {sortParam, reverse}}) }
    
    return (
        <ComponentWrapper>
            <SelectEntriesBox 
                options={entriesOptions}
                selectEntriesAmount={selectEntriesAmount}
                currentlyshowing={currentlyShowing}
                listTotal={listTotal}
                entries={state.entries}
            />
            { state.collectionAsPages &&
                
                <Table
                currentPage={state.currentPage}
                sortListBy={sortListBy}
                searchTerm={state.searchTerm}
                />
            }

            <Pagination 
                totalPages={state.totalPages}
                currentPage={state.currentPage}
                changePage={changePage}
            />

        </ComponentWrapper>
    )

}
export default Datatable