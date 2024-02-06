//Dashboard service providers are brought to after logging in. 

import React, {useState, useEffect} from 'react';


function ServiceDashboard() {
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try{
                const response = await fetch('/api/service-provider/profile', {
                    method: 'GET',
                    headers: {
                      // Include authorization header if needed (e.g., bearer token)
                      'Authorization': 'Bearer your_token_here',
                    },
                  });

                  if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                  }

                  const data = await response.json();
                  setName(data.name);
            }catch (error){
                console.error('Failed to fetch profile:', error);
            }
        };
        fetchProfile();
    }, []);



    return (
        <div>
            <h1>Welcome, {name}</h1>
        </div>
    );

}

export default ServiceDashboard;