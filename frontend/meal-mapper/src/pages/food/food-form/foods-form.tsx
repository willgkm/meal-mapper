import {Button,Form, Row} from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { Food } from '../../../models/Food';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function FoodForm() {


  const [food, setFood] = useState<Food>({
    id: 0,
    portion:  undefined,
    weight:  undefined,
    name: undefined,
    calories: undefined,
    protein: undefined,
    fat: undefined,
    carbs: undefined,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8910/food/${id}`)
        .then(response => {
          setFood(response.data);
        })
        .catch(error => {
          console.error(`There was an error fetching the food with id:${id} !`, error);
        });
    }
  }, [id]);

  async function submit(event: any){ 
    if(id){
      edit(event)
    } else {
      create(event)
    }
  }

  async function edit(event: any) {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8910/food/${id}`, food);
      navigate('/food');
    } catch (error) {
      console.error('There was an error creating the food!', error);
    }
  };

  async function create(event: any) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8910/food', food);
      navigate('/food');
    } catch (error) {
      console.error('There was an error creating the food!', error);
    }
  };

  return (
    <div className='container'> 
      <h2> Create Food </h2>
      <Button href="/food" className='my-2' variant='secondary'> {"< Back"} </Button>

        <Form onSubmit={submit}>

        <Form.Group className="mb-3" controlId="form.foodName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" 
          value={food.name} 
          onChange={(event) => setFood( {...food, name: event.target.value})}/>
        </Form.Group>

        <Row>

          <Form.Group className="col mb-3" controlId="form.foodPortion">
            <Form.Label>Portion</Form.Label>
            <Form.Control type="number" placeholder="portion" 
            value={food.portion} 
            onChange={(event) => setFood( {...food, portion: parseInt(event.target.value)})}/>
          </Form.Group>

          <Form.Group className="col mb-3" controlId="form.foodWeight">
            <Form.Label>Weight</Form.Label>
            <Form.Control type="number" placeholder="Weight in gr" 
            value={food.weight} 
            onChange={(event) => setFood( {...food, weight: parseInt(event.target.value)})}/>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="col mb-3" controlId="form.foodCalories">
            <Form.Label>Calories</Form.Label>
            <Form.Control type="number" placeholder="Calories in gr" 
            value={food.calories} 
            onChange={(event) => setFood( {...food, calories: parseInt(event.target.value)})}/>
          </Form.Group>

          <Form.Group className="col mb-3" controlId="form.foodProtein">
            <Form.Label>Protein</Form.Label>
            <Form.Control type="number" placeholder="Protein in gr" 
            value={food.protein} 
            onChange={(event) => setFood( {...food, protein: parseInt(event.target.value)})}/>
          </Form.Group>
        </Row>

        <Row >
          <Form.Group className="col mb-3" controlId="form.foodCarbs">
            <Form.Label>Carbs</Form.Label>
            <Form.Control type="number" placeholder="Carbs in gr" 
            value={food.carbs} 
            onChange={(event) => setFood( {...food, carbs: parseInt(event.target.value)})}/>
          </Form.Group>
        
          <Form.Group className="col mb-3" controlId="form.foodFat">
            <Form.Label>Fat</Form.Label>
            <Form.Control type="number" placeholder="fat in gr" 
            value={food.fat} 
            onChange={(event) => setFood( {...food, fat: parseInt(event.target.value)})}/>
          </Form.Group>
        </Row>

        <Row className='d-grid gap-2 d-md-flex justify-content-md-end'>

          <Button style={{width:"100px"}}  className='me-md-2 mb-2' type="submit" variant="success">
            Submit
          </Button>
        </Row>
      </Form> 
    </div>
  )
}

