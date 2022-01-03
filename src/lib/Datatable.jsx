import { useEffect, useReducer } from "react"
import { ComponentWrapper } from './DataTable_style'
import { reducer, initialState } from './datatable_state'

import Table from  './Table/Table'
import Pagination from "./Pagination/Pagination"
import SelectEntriesBox from './SelectEntriesBox/SelectEntriesBox'
import SearchBox from "./SearchBox/SearchBox"

const Datatable = () => {
    const [
        {
            collection,
            collectionAsPages,
            currentPageIndex,
            entries,
            totalPages,
            searchTerm
        },
        dispatch
    ] = useReducer(reducer, initialState)
    
    useEffect(() => {
        if (!collectionAsPages || !collectionAsPages.length) { 
                dispatch({type: 'setCollection', value: collection })
        }
    }, [collection, collectionAsPages])

    const entriesOptions = [ 15, 30, 50]
    const selectEntriesAmount = (n) => { dispatch({ type:'setEntriesPerPage', value: n })}
    const currentPage = collection[currentPageIndex]
    const currentlyShowing = currentPage.length
    const listTotal = collection.length
    const changePage = (pageNumber) => { console.log('page requested:', pageNumber); dispatch({ type: 'setCurrentPage', value: pageNumber})}

    const sortListBy = (filterParam, reverse ) => { dispatch({ type: 'sortList', value: {filterParam, reverse}}) }

    return (
        <ComponentWrapper>

            <SelectEntriesBox 
                options={entriesOptions}
                selectEntriesAmount={selectEntriesAmount}
                currentlyshowing={currentlyShowing}
                listTotal={listTotal}
                entries={entries}
            />

            

            { collectionAsPages &&
                <Table
                currentPageToDisplay={currentPage}
                sortListBy={sortListBy}
                searchTerm={searchTerm}

                />
            }

            <Pagination 
                totalPages={totalPages}
                currentPage={currentPage}
                changePage={changePage}
            />

        </ComponentWrapper>
    )

}
export default Datatable