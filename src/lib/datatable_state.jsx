import mockdata from './mockData.json'
// ......................................................
// INITIAL STATE
// ......................................................
export const initialState = {

        collection: null,
        sorted: false,
        sortedBy: { sortParam: '', reverse: false },
        searchActive: false,
        searchTerm: '',

        collectionAsPages: null,
        entries: null,
        currentPage: null,
        currentPageIndex: null,
        totalPages: null
}
// ......................................................
// REDUCER
// ......................................................
export const reducer = (state, action) => {
    let newState;
    switch (action.type) {

        case 'init':
            newState = { ...state, collection: mockdata.list, entries: 15, currentPageIndex: 0 }
            return setUpPages(newState)

        case 'setCollection':
            if ( state.collection.length ) { state.collection = null }
            return { ...state, collection: action.value }
        
        case 'setCollectionAsPages':
            if ( state.collectionAsPages.length ) { state.collectionAsPages = null }
            return  { ...state, collectionAsPages: action.value }
        
        case 'setEntriesPerPage':
            let requestedEntries = action.value
            newState = { ...state, entries: requestedEntries}
            return setUpPages(newState)

        case 'setCurrentPage':
            let requestedIndex = action.value
            let collectionPages = state.collectionAsPages
            return { ...state, currentPageIndex: requestedIndex, currentPage: collectionPages[requestedIndex] }        
        
        case 'sortList':
            let { sortParam, reverseOrder } = action.value; 
            newState =  { ...state, sortedBy: { sortParam, reverseOrder } }
            return reduceSort(sortParam, reverseOrder)(newState)

        case 'searchList':
            return { ...state, searchTerm: action.value, searchActive: true }
        
        default: throw new Error (`${action.type} is not a valid action`)
        //default: return state
    }
}

// ......................................................
// REDUCERS FUNCTIONS
// ......................................................
const setUpPages = (state) => {
    console.log('setUpPages called')
    
    const currentList = state.collection
    const currentIndex = state.currentPageIndex??0
    const entries = state.entries

    let outputPages = []
    let from = 0
    let totalPages = Math.floor(currentList.length / entries)

    // setup pages arrays
    for (let i = from; i <= totalPages; i++ ) {
        let to = from + entries
        outputPages.push(currentList.slice(from, to ))
        from += entries
    }

    if ( state.collectionAsPages && state.collectionAsPages.length ) { state.collectionAsPages = [] }
    
    console.log('entries:', entries,'totalPages=', totalPages, 'outputPages=', outputPages )
    
    return {
        ...state,
        entries: entries,
        totalPages: totalPages,
        collectionAsPages: [...outputPages],
        currentPageIndex: currentIndex,
        currentPage: outputPages[currentIndex]
    }
}

const reduceSort = (sortParam, reverseOrder) => (state) => {
    let newState
    const currentList = state.collection
    let sortedList = [ ...currentList] // ---- for 'sort()' will try to mutate 'currentList' and fail ---- !
    
    if ( sortParam === 'state') {
        !reverseOrder?
            sortedList.sort( (a, b) => a[sortParam].name.localeCompare(b[sortParam].name))
            : sortedList.sort( (a, b) => b[sortParam].name.localeCompare(a[sortParam].name))
    } else { 
        !reverseOrder ?
            sortedList.sort( (a, b) => a[sortParam].localeCompare(b[sortParam])) // a, b = employee objects of employees array
            : sortedList.sort( (a, b) => b[sortParam].localeCompare(a[sortParam])) 
    }
    newState =  {
        ...state,
        sorted: true,
        sortedBy: { sortParam, reverseOrder },
        collection: [...sortedList]
    }
    return setUpPages(newState)
}

