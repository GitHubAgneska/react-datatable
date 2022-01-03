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
        if (state.collectionAsPages===null) { 
            dispatch({type:'setEntriesPerPage', value:15})}

    }, [state.collectionAsPages])
    
    console.log('collection=>', state.collection)
    console.log('collectionAsPages=>', state.collectionAsPages)

    const entriesOptions = [ 15, 30, 50]
    const selectEntriesAmount = (n) => { dispatch({ type:'setEntriesPerPage', value: n })}
    
    const currentPage = state.collectionAsPages??[state.currentPageIndex]
    console.log('currentPage=>',currentPage)
    
    const currentlyShowing = currentPage.length
    const listTotal = state.collection.length
    const changePage = (pageNumber) => { console.log('page requested:', pageNumber); dispatch({ type: 'setCurrentPage', value: pageNumber})}

    const sortListBy = (filterParam, reverse ) => { dispatch({ type: 'sortList', value: {filterParam, reverse}}) }

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
                currentPageToDisplay={currentPage}
                sortListBy={sortListBy}
                searchTerm={state.searchTerm}

                />
            }

            <Pagination 
                totalPages={state.totalPages}
                currentPage={currentPage}
                changePage={changePage}
            />

        </ComponentWrapper>
    )

}
export default Datatable