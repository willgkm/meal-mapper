import {Table, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Food } from '../../models/Food';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Foods() {

  const [foods, setFoods] = useState<Food[]>([])

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8910/food')
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the foods!', error);
      });
  }, []); 

  async function remove(id:number){
    axios.delete(`http://localhost:8910/food/${id}`)
    .then( () => {
      setFoods(foods.filter(item => item.id !== id))
    })
    .catch(error => {
      console.error('There was an error deleting the foods!', error);
    });   
  }

  async function edit(foodId: number) {
    navigate(`/food/${foodId}`);
  }

  return (
    <div className='container'> 
      <h2> Food </h2>
      <Button href="/food/new" className='my-2' variant='success'>New Food</Button>
      {foods ? (

      <Table striped bordered hover >
        <thead className="table-dark">
          <tr>
            <th className="text-center" style={{width:"5rem"}} >ID</th>
            <th>Name</th>
            <th className="text-center px-3" style={{width:"5rem"}}>Weight</th>
            <th className="text-center px-3" style={{width:"5rem"}}>Calories</th>
            <th className="text-center px-3" style={{width:"5rem"}}>Protein</th>
            <th className="text-center px-3" style={{width:"5rem"}}>Carbs</th>
            <th className="text-center" style={{width:"12rem"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((item) =>{ 
            return (
              <tr key={item.id} className="align-middle">
                <td className="text-center"  >{item.id}</td>
                <td >{item.name}</td>
                <td className="text-center">{item.weight} g</td>  
                <td className="text-center">{item.calories} </td>
                <td className="text-center">{item.protein} g</td>  
                <td className="text-center">{item.carbs} g</td>
                <td className="text-center">
                  <Button className="mx-1" variant='info' onClick={() => edit(item.id)}>
                    Edit
                  </Button>
                  <Button className="mx-1" variant='danger' onClick={() => remove(item.id)}>
                    Remove
                  </Button>
                </td>
              </tr>
              )
            }
          )}
        </tbody>
      </Table>
      ) : (
        <div>
          <h4>There is no food available. You can create on clicking on "New Food"</h4>
        </div>
      )}
    </div>
  )
}

