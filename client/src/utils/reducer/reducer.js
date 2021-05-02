const reducer = (state, action)=>{
  switch (action.type) {
    case 'ADD':
      console.log('action',action);
      console.log('state',state);
      return{
        ...state,
        list:[
          ...state.list,
          action.payload]
      }

     case'ALLCAFE':    
     return{
       ...state,
       list: action.payload       
     } 
     case'STAR':   
     console.log("star",state, action.payload ); 
     return{
       ...state,
       about: {...state.about,
        newRating:action.payload.newRating}     
     } 
     case'ADDABOUT': 
     return{
       ...state,
       about: action.payload     
     } 
     case 'UPDATECARD':
       return{
         ...state,
         about:action.payload  
       }

      case 'DELETE':
        console.log("state.list",action.payload);
      return{
        ...state,
        list:[
          ...state.list].filter((el)=>el._id !==action.payload)
        
        
      }
      
 

    default:
      break;
  }
}


export default reducer
