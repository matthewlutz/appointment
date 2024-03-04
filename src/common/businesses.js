import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';



function CategorySelector({ categories, selectedCategory, onSelectCategory }) {
    return (
        <div className="flex justify-center space-x-4 p-4">
            {categories.map((category) => {
                // Define your category background images
                const bgImages = {
                    Medical: "url('/path-to-medical-bg.jpg')",
                    Fitness: "url('/path-to-fitness-bg.jpg')",
                    Health: "url('/path-to-health-bg.jpg')"
                };
                return (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        style={{ backgroundImage: bgImages[category] }}
                        className={`w-1/3 h-20 bg-cover bg-center bg-no-repeat text-lg font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ${
                        selectedCategory === category ? 'bg-blue-500 text-white' : 'text-gray-700'
                        }`}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
      );
  }


function BusinessPage() {

  const [selectedCategory, setSelectedCategory] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [searchInput, setSearchInput] = useState(''); // Define the state for search input
  const navigate = useNavigate();
    

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    // You can also perform a search operation here if needed
    console.log(event.target.value); // This will log what the user types in real-time

    
};


    const categories = ['Medical', 'Fitness', 'Beauty'];

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        console.log(`Fetching businesses for category: ${category}`);

        fetch('http://localhost:3001/api/business-details')
          .then(res => res.json())
          .then(allBusinesses => {
              console.log("All businesses:", allBusinesses);
              const filteredBusinesses = allBusinesses.filter(business => business.serviceType.toLowerCase() === category.toLowerCase());
              console.log(`Filtered businesses for category '${category}':`, filteredBusinesses);
              setBusinesses(filteredBusinesses);
          })
        .catch(err => console.error("Failed to fetch businesses:", err));
    }

    const handleClick = (businessID) => {
      console.log("navigating to: ", businessID);

      navigate(`/common/viewBusiness/${businessID}`);

    }


    return (
        <div className="flex flex-col h-screen">
          {/* Hero section */}
          <div className="relative bg-cover bg-center ripple-background text-white py-12 px-10 object-fill" >
            <h1 className="text-5xl font-bold text-center mb-6">Find the Perfect Fit</h1>
            <p className="text-2xl mb-6 text-center">Discover professionals near you</p>
            <input
                type="text"
                placeholder="Search services or businesses"
                className="w-full h-14 px-5 pr-10 rounded-full text-sm focus:outline-none text-black" // Added text-black for black font color
                value={searchInput}
                onChange={handleSearchInputChange}
          />
          </div >
    
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}

          />
    
          
          {/* Business Listings */}
          <div className="flex-grow overflow-auto">
            {selectedCategory && (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-semibold text-center mb-6">Businesses in {selectedCategory}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {businesses.map((business) => (
                    <div key={business.id} className="bg-white p-6 shadow-lg rounded-lg mb-4 transform transition duration-500 hover:scale-105 cursor-pointer" onClick={() => handleClick(business.id)}>
                      <h3 className="text-lg font-bold mb-2">{business.businessName}</h3>
                      <p className="text-gray-700 mb-4">{business.businessDescription}</p>
                      <p className="text-sm font-medium text-gray-600">Service Type: {business.serviceType}</p>
                      <p className="text-sm font-medium text-gray-600">Duration: {business.appointmentDuration} - Price: ${business.appointmentPrice}</p>
                      <p className="text-sm font-medium text-gray-600">Address: {business.businessAddress}</p>
                      <p className="text-sm font-medium text-gray-600">Email: {business.email} - Phone: {business.phone}</p>
                      <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition duration-300">Visit Website</a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
}

export default BusinessPage;
