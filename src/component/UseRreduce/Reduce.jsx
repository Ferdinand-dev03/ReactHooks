import React, { useEffect, useReducer, useState } from 'react'
import ListReducer from './ListReducer'
import useLocalStore from './useLocalStore'

const tasks = [
    {
        nom: 'Ferdinand',
        matricul: 'ff124',
        note: 15,
        date: '12/21/1995',
        num: 1,
        done: false,
        id: 158884564654,
    },
    {
        nom: 'Kouadio',
        matricul: 'gdg244',
        note: 16,
        date: '12/21/2001',
        num: 2,
        done: false,
        id: 487565652,
    },
    {
        nom: 'Doue kouya',
        note: 12,
        matricul: 'hfgdf124',
        date: '12/21/2012',
        num: 3,
        done: false,
        id: 45456654653,
    },
]

let nextId = crypto.randomUUID()

const Reduce = () => {

    const [state, dispatch] = useReducer(ListReducer , {
        listes: tasks,
        count: tasks.length,
        activeId: null,
        isloading: false,
    })
   

  return (
    <div className='reduce'>
      <h1>Liste des etudiants {state.count}</h1>
      
        <div className='add'><FormList state={state} dispatch={dispatch} /> </div>
        <div className='etudiant'><Lists state={state} dispatch={dispatch}/></div>
      
    
      <div className='detail'>
            {state.activeId && <Etudiants state={state} activeId={state.activeId} dispatch={dispatch}/>}
        </div>
           
    </div>
  )
}

const Lists = ({ state, dispatch , active, onSet})=> {
    const [value, setValue] = useState(false)

    const [sort, setSort] = useState('entrer')
    let sortItems ;

    if(sort === 'entrer') sortItems = state.listes ;
    if(sort === 'nom') sortItems = state.listes.slice().sort((a,b)=>
                    a.nom.localeCompare(b.nom));
    if(sort === 'note')sortItems = state.listes.slice().sort((a,b)=> Number(a.note) - Number(b.note))

    const handleChange = ()=> {
        dispatch({
            type: 'detail'
        })
        setValue(val => !val)
    }
    console.log(value)
    return(
        <div className='blocs'>

            <div>
                <p>Trier par</p>
                <select
                    value={sort}
                    onChange={(e)=>setSort(e.target.value)}
                >
                    <option value='entrer'>Enter</option>
                    <option value='nom'>(a-z)</option>
                    <option value='note'>Notes</option>
                </select>

                <p>Detail: </p>
                <button onClick={handleChange} >{!value ? 'non' : 'oui'}</button>
            </div>
            <ul>
                {sortItems.map( list => <List list={list} key={list.id}
                dispatch={dispatch}
                state={state}
                onvalue={value}
                />)}
                
            </ul>

           
        </div>

    )
}

const List = ({list, dispatch, onvalue })=> {
  
    

    const handleList = (id)=>{
        dispatch({
            type: 'reference',
            payload: id
        })
     
    }
    
    return(
        <div className='liste'>
            {onvalue ? <li  key={list.id}> 
                
                {onvalue ? (
                    <>
                        {/* <span>{list.matricul} </span>
                        <span> {list.note} </span> */}
                         <div className='detail' >
                          <div  key={list.id}>
                            <h1>{list.nom}</h1>

                            <p>Matricule : <input value={list.matricul} readOnly/> </p>
                            <p>Note : <input value={list.note} /> </p>
                            <p>date de naissance: {list.date} </p> 
                            
                            </div> 
                        </div>
                    </>) : <><span>{list.num}</span>
                        <span>{list.nom} </span> 
                        
                        <button onClick={()=> dispatch({type:'delet', payload: list })}>❌</button>
                     </>}
            </li> : <li onClick={()=> handleList(list.id)} key={list.id}><span>{list.num}</span>
                        <span>{list.nom} </span> 
                        
                        <button onClick={()=> dispatch({type:'delet', payload: list })}>❌</button></li> }
          
        </div>
    )
}

const FormList = ({state, dispatch})=> {

    
    const [textInput, setTextInput] = useState('')
    const [matricul, setMatricul] = useState('')
    const [note, setNote] = useState('');
    const [date, setDate] = useState('');

        const handleDateChange = (e)=> {
            const inputDate = e.target.value;
            const [year, month, day] = inputDate.split('-');
            const formaDate = `${day}/${month}/${year}`
            setDate(formaDate);
        }

    const id = crypto.randomUUID();
   
    const onSubmit = (e, num)=> {
        dispatch(
            {
                type: 'add',
                text: textInput,
                matricule: matricul,
                note: note,
                date: date,
                num: num,
                id: id
            },
        )
        e.preventDefault()
        setNote('')
        setTextInput('')
        setMatricul('')
      
    }

    return (
        <form onSubmit={onSubmit} >
            
            <label>Nom</label>
            <input type='text' 
            required
            placeholder='Nom et Prenom'
            value={textInput}
            onChange={(e)=> setTextInput(e.target.value)}
            />
            <label>Matricule</label>
            <input type='text' 
                value={matricul}
                onChange={(e)=> setMatricul(e.target.value)}
                placeholder='matricule'
            />
            <label>Note</label>
            <input type='number'
                value={note}
                onChange={(e)=> setNote(e.target.value)}
                
            />
            <label>Date de naissance</label>
            <input type='date'
                value={date.split('/').reverse().join('-')}
                onChange={handleDateChange}
            />
            {/* <label>N:</label>
            <select value={num}
                readOnly
            >
                {Array.from({length :10},(_, i)=> i+1).map(count => 
                    <option value={count} key={count}> {count} </option>
                )}
            </select> */}
            <button >Ajouter</button>

        </form>
    )
}
const Etudiants = ({state, activeId , dispatch})=>{
    
    const etudiant = state.listes.find(list => list.id === activeId)
 


    return(
        <div className='modifier' >
           { etudiant &&(  <div  key={etudiant.id}>
            <h1>{etudiant.nom}</h1>

            <p>Matricule : <input value={etudiant.matricul} readOnly/> </p>
            <p>Note : <input value={etudiant.note} /> </p>
            <p>date de naissance: {etudiant.date} </p> 
            <button onClick={()=> dispatch({type: 'retour'})}>Retour</button >
            </div> )}
        </div>
    )
}
export default Reduce
