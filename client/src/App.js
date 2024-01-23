import React, { useState, useEffect } from 'react';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [newPizza, setNewPizza] = useState({
    price: 0,
    pizza_id: 0,
    restaurant_id: 0,
  });

  useEffect(() => {
    // Fetch restaurants
    fetch('/restaurants')
      .then((response) => response.json())
      .then((data) => setRestaurants(data));

    // Fetch pizzas
    fetch('/pizzas')
      .then((response) => response.json())
      .then((data) => setPizzas(data));
  }, []);

  const handleDelete = (restaurantId) => {
    fetch(`/restaurants/${restaurantId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted restaurant from the state
          setRestaurants((prevRestaurants) =>
            prevRestaurants.filter((r) => r.id !== restaurantId)
          );
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data && data.error) {
          console.error(data.error);
        }
      })
      .catch((error) => console.error('Error deleting restaurant:', error));
  };

  const handleCreatePizza = () => {
    fetch('/restaurant_pizzas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPizza),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Pizza created successfully:', data);
        // You may want to update the state or perform additional actions after successful creation
      })
      .catch((error) => {
        console.error('Error creating pizza:', error);
      });
  };

  return (
    <div>
      <h1>Pizza Restaurants</h1>

      <h2>Restaurants</h2>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            {restaurant.name} - {restaurant.address}
            <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Pizzas</h2>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            {pizza.name} - {pizza.ingredients}
          </li>
        ))}
      </ul>

      <h2>Create Pizza</h2>
      <label>
        Price:
        <input
          type="number"
          value={newPizza.price}
          onChange={(e) =>
            setNewPizza({ ...newPizza, price: parseInt(e.target.value) })
          }
        />
      </label>
      <label>
        Pizza ID:
        <input
          type="number"
          value={newPizza.pizza_id}
          onChange={(e) =>
            setNewPizza({ ...newPizza, pizza_id: parseInt(e.target.value) })
          }
        />
      </label>
      <label>
        Restaurant ID:
        <input
          type="number"
          value={newPizza.restaurant_id}
          onChange={(e) =>
            setNewPizza({
              ...newPizza,
              restaurant_id: parseInt(e.target.value),
            })
          }
        />
      </label>
      <button onClick={handleCreatePizza}>Create Pizza</button>
    </div>
  );
};

export default App;
