import React, { useState } from 'react';

function OurServices() {
  // Initialize 'services' with an array of services (can be fetched from an API or predefined)
  const [services, setServices] = useState([
    { id: 1, name: 'Washers', description: 'Won\'t start, Not draining properly, Excessive vibration/noise', image: 'https://png.pngtree.com/png-vector/20240403/ourmid/pngtree-washing-machine-isolated-on-transparent-background-png-image_12260985.png' },
    { id: 2, name: 'Dryers', description: 'Not heating up, Takes too long to dry, Drum not spinning', image: 'https://www.pngall.com/wp-content/uploads/12/Clothes-Dryer-Machine-PNG-Photo.png' },
    { id: 3, name: 'Refrigerators', description: 'Not cooling properly, Leaking water, Ice maker not working', image: 'https://i.pinimg.com/originals/83/1c/03/831c0321a1f22eb4a37a36145493a909.png' },
    { id: 4, name: 'Dishwashers', description: 'Not cleaning dishes properly, Water not draining, Leaks during operation', image: 'https://png.pngtree.com/png-clipart/20231104/original/pngtree-realistic-dishwasher-png-image_13504893.png' },
    { id: 5, name: 'Microwaves', description: 'Not heating food, Display not working, Sparks inside the microwave', image: 'https://pngimg.com/d/microwave_PNG15734.png' },
    { id: 6, name: 'Ovens', description: 'Uneven cooking/baking, Oven not heating to the right temperature, Oven door won\'t close properly', image: 'https://www.fulgor-milano.com/sites/default/files/styles/product_grid_320x320_/public/2022-12/F6PDF364GS1%20-%20Product%20Grid.png?itok=YAPNiVYv' },
  ]);
  const [filteredServices, setFilteredServices] = useState(services); // State for filtered services

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = services.filter(service =>
      service.name.toLowerCase().includes(query)
    );
    setFilteredServices(filtered);
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="inputsearch">
        <div className="fieldcontent">
          <div className="rowwhatservices">
            <input
              name="text"
              placeholder="What services are you looking for?"
              type="text"
              onChange={handleSearch} // Handle search input change
            />
          </div>
          <div className="suffix">
            <div className="icon">
              <input type="image" src="https://cdn-icons-png.flaticon.com/512/54/54481.png" className="icon_one" alt="Submit" />
            </div>
          </div>
        </div>
      </div>

      {/* Render filtered services */}
      {filteredServices.map(service => (
        <div key={service.id} className="userprofile-5">
          <div className="createfrom_one">
            <div className="description-3">
              <div className="image-1">
                {/* Use the image URL directly here */}
                <img
                  src={service.image} // Dynamically set the image source from the 'image' property
                  alt={service.name}
                  className="washers_one"
                />
                <div className="columnbookmark">
                  <div className="iconbutton">
                    <img src="https://cdn-icons-png.flaticon.com/512/709/709496.png" alt="Bookmark" className="bookmark_one" />
                  </div>
                  <button className="fortyeight ui button outline size-lg fill">4.8</button>
                </div>
              </div>
              <h1 className="washers ui heading size-textmd">{service.name}</h1>
              <h2 className="description-9 ui heading size-textmd">{service.description}</h2>
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}

export default OurServices;
