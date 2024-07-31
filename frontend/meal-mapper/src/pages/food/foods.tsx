import {Table, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Food } from '../../models/Food';
import axios from 'axios';

export default function Foods() {

  const [foods, setFoods] = useState<Food[]>([])


  useEffect(() => {
    axios.get('http://localhost:8910/food')
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the foods!', error);
      });
  }, []); 

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
              </tr>
              )
            }
          )}

        </tbody>
      </Table>
    </div>
  )
}

