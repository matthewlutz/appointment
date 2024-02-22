import React, {useState} from 'react';

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
                        className={`w-1/3 h-32 bg-cover bg-center bg-no-repeat text-lg font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ${
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

    const categories = ['Medical', 'Fitness', 'Health'];

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        console.log(`Fetching businesses for category: ${category}`);
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
              className="w-full h-14 px-5 pr-10 rounded-full text-sm focus:outline-none"
            />
          </div>
    
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}

            />
    
          
          {/* Business Listings */}
          <div className="flex-grow overflow-auto">
            {selectedCategory && (
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl font-semibold text-center mb-4">Businesses in {selectedCategory}</h2>
                {/* Here you would map through your businesses and create components/cards for each one */}
                {businesses.map((business) => (
                  <div key={business.id} className="bg-white p-6 shadow rounded-lg mb-4">
                    <h3 className="text-lg font-bold">{business.name}</h3>
                    {/* Other business details */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
}

export default BusinessPage;