import mockdata from './mockData.json'
// ......................................................
// INITIAL STATE
// ......................................................
export const initialState = {

        collection: mockdata.list,
        sorted: false,
        sortedBy: { sortParam: '', reverse: false },
        searchActive: false,
        searchTerm: '',

        collectionAsPages: null,
        entries: 15,
        currentPage: null,
        currentPageIndex: 0,
        totalPages: 1
}
// ......................................................
// REDUCER
// ......................................................
export const reducer = (state, action) => {
    let newState;
    switch (action.type) {

        case 'init':
            return reduceCollectionAsPages(15)(state)

        case 'setCollection':
            if ( state.collection.length ) { state.collection = null }
            return { ...state, collection: action.value }
        
        case 'setCollectionAsPages':
            if ( state.collectionAsPages.length ) { state.collectionAsPages = null }
            return  { ...state, collectionAsPages: action.value }
        
        case 'setEntriesPerPage':
            newState = reduceCollectionAsPages(action.value)
            return {...state, ...newState }

        case 'setCurrentPage':
            let requestedIndex = action.value
            return { ...state, currentPageIndex: requestedIndex, currentPage: state.collection[requestedIndex] }        
        
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
const reduceCollectionAsPages = (entries) => (state) => {
    
    const currentList = state.collection
    const currentActivePageIndex = state.currentPageIndex
    let currentIndex
    let outputPages = []
    let from = 0
    let totalPages = Math.floor(currentList.length / entries)

    // setup pages arrays
    for (let i = from; i <= totalPages; i++ ) {
        let to = from + entries
        outputPages.push(currentList.slice(from, to ))
        from += entries
    }
    if ( !currentActivePageIndex ) { currentIndex = 0 }
    if ( state.collectionAsPages.length ) { state.collectionAsPages = [] }
    return {
        ...state,
        entries: entries,
        totalPages: totalPages,
        collectionAsPages: [...outputPages],
        currentActivePageIndex: currentIndex
    }
}

const reduceSort = (sortParam, reverseOrder) => (state) => {
    let newState
    const currentList = state.collection
    const currentEntries = state.entries
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
    return reduceCollectionAsPages(currentEntries)(newState)
}

