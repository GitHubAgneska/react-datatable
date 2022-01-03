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
    

    return (
        <ComponentWrapper>

           {/*  <SelectEntriesBox 
                options={entriesOptions}
                selectEntriesAmount={selectEntriesAmount}
                currentlyshowing={currentlyShowing}
                listTotal={listTotal}
                entries={state.entries}
            />

            
 */}
            { state.collectionAsPages &&
                <Table
                currentPage={state.currentPage}
                sortListBy={state.sortListBy}
                searchTerm={state.searchTerm}

                />
            }

           {/*  <Pagination 
                totalPages={state.totalPages}
                currentPage={currentPage}
                changePage={changePage}
            /> */}

        </ComponentWrapper>
    )

}
export default Datatable