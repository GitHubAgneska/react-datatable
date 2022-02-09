## React Datatable Library with sort, search & pagination
### Features
    - Select amount of entries per page
    - Search functionality with suggestions and highlighting of matches in table
    - Sort table by original model property, with optional reverse order

<p align="center">
    <img src="./public/img/Screenshot 2022-01-08 at 18.35.22.png">
</p>

### Stack
    - ReactJs ( >= 17.0.0 )
    - Styled Components

### Installation
`npm i react-datatable-search-pagination`

### Use
```bash
import { Datatable } from  'react-datatable-search-pagination' 

function App() {

// custom values

// entriesOptions - array of numbers
// How many entries per page to display
// if not defined will default to [15, 30, 50]

// tableHead - array of strings
// The properties of the objects from your data array you want to use in the datatable
// if not defined will default to mock objects properties:
//[ 'firstName', 'lastName', 'dob', 'startDate', 'street', 'city', 'state', 'zipcode', 'department']


// dataSrc - array of objects
// the data to use to feed the datatable
// if not defined will default using mockdata json to feed the datatable
 

return (
    <div className="App">
        <Datatable
            entriesOptions={entriesOptions}
            tableHead={tableHead}
            dataSrc={dataSrc}
        />
    </div>
);
}
export default App;
```




