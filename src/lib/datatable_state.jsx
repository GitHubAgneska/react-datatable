// ......................................................
// INITIAL STATE
// ......................................................
export const initialState = {
        status: 'void',
        data: null,
        error: null,

        collection: null,
        sorted: false,
        sortedBy: { sortParam: '', reverse: false },
        searchActive: false,
        searchTerm: '',

        collectionAsPages: null,
        entries: 15,
        currentPage: null,
        currentPageIndex: null,
        totalPages: 1
}

// ......................................................
// REDUCER
// ......................................................
export default function reducer(state, action) {
    let newState;
    switch (action.type) {
        
        case 'setCollection':
            if ( collection.length ) { collection = null }
            return { ...state, collection: action.value }
        
        case 'setCollectionAsPages':
            if ( collectionAsPages.length ) { collectionAsPages = null }
            return  { ...state, collectionAsPages: action.value }
        
        case 'setEntriesPerPage':
            newState = setUpPages(action.value)
            return {...state, ...newState }

        case 'setCurrentActivePageIndex':
            return { ...state, currentPageIndex: action.value }
        
        case 'setTotalPages':
            return { ...state, totalPages: action.value }
        
        case 'setCurrentActivePage':
            return { ...state, currentPage: action.value }
        
        case 'sortList':
            let { param, reverseOrder } = action.value; 
            newState =  { ... state, sortedBy: { param, reverseOrder } }
            return reduceSort(sortParam, reverseOrder)(newState)

        case 'searchtermChanged':
            return { ...state, searchTerm: action.value, searchActive: true }
        
        default: throw new Error (`${action.type} is not a valid action`)
        //default: return state
    }
}

// ......................................................
// REDUCERS FUNCTIONS
// ......................................................
const updatePage = (pageNumber) => {

}


const setUpPages = (entries) => (state) => {
    
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
    if ( collectionAsPages.length ) { collectionAsPages = [] }
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
        sortedBy: { param, reverseOrder },
        collection: [...sortedList]
    }
    return setUpPages(currentEntries)(newState)
}

