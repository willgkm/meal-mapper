import { Button, Col, Form, Row, Table } from 'react-bootstrap';

import { useEffect, useState } from 'react';
import { Food } from '../../../models/Food';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Meal } from '../../../models/Meal';

export default function MealForm() {


  const [meal, setMeal] = useState<Meal>({} as Meal);
  const [foods, setFoods] = useState<Food[]>([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8910/meal/${id}`)
        .then(response => {
          setMeal(response.data);
        })
        .catch(error => {
          console.error(`There was an error fetching the meal with id:${id} !`, error);
        });
    }
  }, [id]);

  useEffect(() => {
    fetchFoods()
  }, [])

  async function fetchFoods() {
    await axios.get('http://localhost:8910/food')
      .then(response => {
        setFoods(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the foods!', error);
      });
  }

  async function submit(event: any){ 
    event.preventDefault();
    if(id ){
      edit()
    } else {
      create()
    }
  }
  
  async function create() {
    try {
      await axios.post('http://localhost:8910/meal', meal);
      navigate('/meal');
    } catch (error) {
      console.error('There was an error creating the meal!', error);
    }
  };

  async function edit() {
    try {
      await axios.put(`http://localhost:8910/meal/${id}`, meal);
      navigate('/meal');
    } catch (error) {
      console.error('There was an error creating the meal!', error);
    }
  };

  function addFood(food: Food) {
    if (!meal!.foods?.find(f => f.id === food.id)) {
      const updatedFoods = [...(meal!.foods || []), food];
      setMeal({ ...meal, foods: updatedFoods });
    }
  }

  function removeFood(foodId: number) {
    const updatedFoods = meal.foods?.filter(food => food.id !== foodId) || [];
    setMeal({ ...meal, foods: updatedFoods });
  }
  
  return (
    <div className='container'>
      <h2> Create Meal </h2>
      <Button href="/meal" className='my-2' variant='secondary'> {"< Back"} </Button>

      <Form onSubmit={submit}>

        <Form.Group className="mb-3" controlId="form.mealName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name"
            value={meal?.name || ''}
            onChange={(event) => setMeal({ ...meal, name: event.target.value })} />
        </Form.Group>

        <Row>
          <Col className='col-6'>
            <Form.Group className="mb-3" controlId="form.availableFoods">
              <Form.Label>Foods available</Form.Label>
              <Table striped bordered hover>
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th className="text-center" style={{ width: "5rem" }}>Add</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map((item) => (
                    <tr key={item.id} className="align-middle">
                      <td>{item.name}</td>
                      <td className="text-center">
                        <Button className="mx-1" variant='success' onClick={() => addFood(item)}>
                          <i className="bi bi-plus"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Form.Group>
          </Col>
          <Col className='col-6'>
            <Form.Group className="mb-3" controlId="form.selectedFoods">
              <Form.Label>Foods selected</Form.Label>
              <Table striped bordered hover>
                <thead className="table-dark">
                  <tr>
                    <th className="text-center" style={{ width: "5rem" }}>Remove</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {meal.foods?.map((item) => (
                    <tr key={item.id} className="align-middle">
                      <td className="text-center">
                        <Button className="mx-1" variant='danger' onClick={() => removeFood(item?.id)}>
                          <i className="bi bi-dash"></i>
                        </Button>
                      </td>
                      <td>{item.name}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Form.Group>
          </Col>
        </Row>
        

        <Row className='d-grid gap-2 d-md-flex justify-content-md-end'>
          <Button style={{ width: "100px" }} className='me-md-2 mb-2' type="submit" variant="success">
            Submit
          </Button>
        </Row>
      </Form>
    </div>
  )
}

