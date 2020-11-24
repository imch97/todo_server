const {URL_MONGODB, PORT} = require('../../server/constans/constans.js');




export const getAllTodo = async() =>{
    let response = await fetch(`http://${URL_MONGODB}:${PORT}/todoitem/All`, {
        method: 'GET',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        //body: JSON.stringify({id, text, completed: false})
      });
      return response.json();
}

export const submitTodo = async (text) =>{
  
    let response = await fetch(`http://${URL_MONGODB}:${PORT}/todoitem`, {
        method: 'POST',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({text, completed: false,})
      });
      
      let result = await response.json();
      console.log(result.message);
}

export default submitTodo
