import { SelectEntriesBoxWrapper } from './SelectEntriesBox_style'

const SelectEntriesBox = ({options, entries, selectEntriesAmount, currentlyshowing, listTotal}) => {


    return (
        <SelectEntriesBoxWrapper>

            <label htmlFor="entries">Show per page:</label>
            <select 
                options={options}
                name="entries"
                value={entries}
                onChange={e => ( console.log(e.target.value))}
                aria-required="true">
                { options.map(o => (
                    <option key={Math.random()} onClick={() => {selectEntriesAmount(o)}}>{o}</option>
                ))}
            </select>

            <div currentlyshowing={currentlyshowing}>Showing: {currentlyshowing} of {listTotal}</div>
        </SelectEntriesBoxWrapper>
    )
}

export default SelectEntriesBox