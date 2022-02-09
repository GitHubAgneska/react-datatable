## React Datatable Library with sort, search & pagination
### Features
    - Select amount of entries per page
    - Search functionality with suggestions and highlighting of matches in table
    - Sort table by original model property, with optional reverse order
    - Mock data list to play around

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

// custom values:

// ENTRIES OPTION: array of numbers
// How many entries per page to display
// if not defined will default to [15, 30, 50]

// TABLEHEAD: array of strings
// The properties of the objects from your data array you want to use in the datatable header
// if not defined will default to mock objects properties:
//[ 'firstName', 'lastName', 'dob', 'startDate', 'street', 'city', 'state', 'zipcode', 'department']


// DATASRC: array of objects
// The data to feed the datatable
// if not defined will default to mockdata json to feed the datatable


// CUSTOM VALUES EXAMPLE

const mytableHead = [ 'name', 'show', 'motto', ]
const mydataSrc = [
    {
        name: 'peter griffin',
        show: 'family guy',
        motto: 'bird is the word'
    },
    {
        name: 'saul goodman',
        show: 'better call saul',
        motto: 'its all good, man'
    },
    {
        name: 'bojack horseman',
        show: 'bojack horseman',
        motto: 'help me, help you!'
    }
]
 

return (
    <div className="App">
        <Datatable
            tableHead={mytableHead}
            dataSrc={mydataSrc}
        />
    </div>
);
}
export default App;
```




