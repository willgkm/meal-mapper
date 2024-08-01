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

  async function deleteFood(id:number){
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
      <h2> FOODS </h2>
      <Button href="/food/new" className='my-2'>New Food</Button>
      <Table striped bordered hover >
        <thead className="table-dark">
          <tr>
            <th className="text-center">ID</th>
            <th>Name</th>
            <th className="text-center">Protein</th>
            <th className="text-center">Carbs</th>
            <th className="text-center">Calories</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.map((item) =>{ 
            return (
              <tr key={item.id} className="align-middle">
                <td className="text-center" >{item.id}</td>
                <td >{item.name}</td>
                <td className="text-center">{item.protein}</td>  
                <td className="text-center">{item.carbs}</td>
                <td className="text-center">{item.calories}</td>
                <td className="text-center">
                  <Button className="mx-1" variant='info' onClick={() => edit(item.id)}>
                    <i className="bi bi-file-earmark-text"></i>
                  </Button>
                  <Button className="mx-1" variant='danger' onClick={() => deleteFood(item.id)}>
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
              )
            }
          )}

        </tbody>
      </Table>
    </div>
  )
}
