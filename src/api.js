export const getAllTodo = async() =>{
    let response = await fetch('http://localhost:1234/todoitem/All', {
        method: 'GET',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        //body: JSON.stringify({id, text, completed: false})
      });
      return response.json();
}

export const submitTodo = async(id, text) =>{
    let response = await fetch('http://localhost:1234/todoitem', {
        method: 'POST',
        mode: "cors",
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({id, text, completed: false})
      });
      
      let result = await response.json();
      console.log(result.message);
}

export default submitTodo
