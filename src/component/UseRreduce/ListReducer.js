
const ListReducer = (state, action)=> {

    switch(action.type){
      
        case 'add' : {
            return {
                ...state,
                listes: [
                    ...state.listes,
                    {
                        nom: action.text,
                        matricul: action.matricule,
                        note: action.note,
                        date: action.date,
                        id: action.id,
                        num: state.listes.length + 1,
                    },                
                ],
                count: state.count + 1   ,
              
                 
            }
        }
        case 'delet': {
            return {
                ...state,
                listes: state.listes.filter(list => list !== action.payload),
                count: state.count - 1  ,
                // activeId: action.payload
                
            }
        }
        case 'reference' :{
            return{
                ...state,
                activeId: action.payload
            }
        }
        case 'retour' : {
            return{
                ...state,
                activeId: null
            }
        }
        case 'modifier':{
            return{
                ...state,
                listes: state.listes.map(list => {
                    if(list.id === action.task.id){
                        return {
                            ...state.listes,
                            note: action.payload,
                         
           
                        }
                    }else {
                        return list
                    }
                }),
                
            }
        }
        case 'detail':{
            return {
                ...state,
                activeId: null
            }
        }

        default: throw Error(`state inconue ${action.type}`)
        
    }

    
}

export default ListReducer