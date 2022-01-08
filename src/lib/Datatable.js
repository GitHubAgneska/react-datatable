import React from 'react';
import { useEffect, useReducer, useState } from "react"
import { reducer, initialState } from './datatable_state'
import { searchSuggestions } from './searchText'
import { ComponentWrapper } from './DataTable_style'

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

    const input = document.querySelector('input')
    const [ searchInputValues, setSearchInputValues ] = useState("")
    const [ suggestions, setSuggestions ] = useState([])

    const handleSearchChange = e => { 
        let query = e.target.value
        dispatch({type: 'searchList', value: query })
        if ( query.length > 2 ) {
            let sugg = searchSuggestions(query, state.collection)
            setSuggestions(sugg)
        } else { 
            setSuggestions([])
            dispatch({type:'init'})
        }
    }
    const handleKeyDown = e => {
        const key = e.code; 
        if ( key === 'Enter' ) { validateCurrentSearch() }
    }
    const validateCurrentSearch = () => { 
        let suggestedResults = Array.from(suggestions.values()).flat()
        dispatch({ type: 'setCollection', value: suggestedResults})
        dispatch({ type: 'setEntriesPerPage', value: state.entries})
        setSuggestions([])
    }
    const clearInput = () => {
        if ( input.value !== "" ) {
            setSearchInputValues("")
            input.value = ""
            setSuggestions([])
            dispatch({type:'init'})
        } else { return }
    }
    const selectSuggestion = (suggestion) => {
        input.value = suggestion
        let resultsOfClickedSuggestion = suggestions.get(suggestion)
        setSuggestions([])
        dispatch({ type: 'setCollection', value: resultsOfClickedSuggestion})
        dispatch({ type: 'setEntriesPerPage', value: state.entries})
    }
    const handleSearchSubmit = () => { return input.value !== ""? validateCurrentSearch() : null }


    return (
        <ComponentWrapper>
            <SelectEntriesBox 
            options={entriesOptions}
            selectEntriesAmount={selectEntriesAmount}
            currentlyshowing={currentlyShowing}
            listTotal={listTotal}
            entries={state.entries}
            />
            <SearchBox 
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
            clearInput={clearInput}
            values={searchInputValues}
            suggestions={suggestions}
            selectSuggestion={selectSuggestion}
            handleKeyDown={handleKeyDown}
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