const Person = ({ person, onClick }) => {
    return (
      <li>
        {person.name} {person.number}
        <button onClick={onClick}>'delete'</button>      
      </li> )
  }

const Persons = ({persons, onClick} ) => {
  return (
    <ul>
      {persons.map(person => 
          <Person key={person.name} person={person} onClick={() => onClick(person.id)} />
      )}
    </ul>
    )
  }

  export default Persons