
  const NameInput = ( props ) => {
      return (
        <div>Name:  
          <input value={props.value} onChange={props.onChange} /> 
        </div>
      )
    }
  
  const NumberInput = ( props ) => {
    return (
      <div>Number:  
        <input value={props.value} onChange={props.onChange} /> 
      </div>
    )
  }
  
  const AddButton = ( props ) => {
    return (
      <div>
        <button type="submit">add</button>
      </div>
    )
  }
  
  const PersonForm = ( props) => {
    return (
      <form  onSubmit={props.onSubmit}>
        <NameInput value={props.namevalue} onChange={props.nameonChange} /> 
        <NumberInput value={props.numbervalue} onChange={props.numberonChange} /> 
        <AddButton />
      </form>
    )
  }
  
export default PersonForm  