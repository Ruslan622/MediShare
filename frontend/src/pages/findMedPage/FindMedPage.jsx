import './findMed.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Card from '../../components/Card.jsx';
import { useState, useEffect } from 'react';
import { useAuth } from '../../Contexts/AuthContext.jsx';



const images = Object.values(import.meta.glob('./assets/img/*.{png,jpg,jpeg,svg}', { eager: true })).map((mod) => mod.default);

export default function FindMedPage() {

    const {user}=useAuth();
    const userId=user?.id;
    
    const rng = 15;

    const [filterButton, setFilterButton] = useState(false);

    const [count, setCount] = useState(1);

    const [data, setData] = useState([]);


    const [searchKey, setSearchKey] = useState('');
    const [medicines, setMedicines] = useState([]);
    const [suggesion, setSuggesion] = useState([]);
    const [suggesionOn, setSuggesionOn] = useState(false);


    //filter states

    const [location, setLocation] = useState('');
    const [disease, setDisease] = useState('');
    const [company, setCompany] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [locationSuggestions, setLocationSuggestions] = useState([]);

    const handlelocationChange =async (e) => {
        const input=e.target.value;
        setLocation(input);

        if(input.length>2){
            try {
                const response = await axios.get(
                    `https://nominatim.openstreetmap.org/search`,
                    {
                        params: { q: input, format: "json", limit: 5, "accept-language": "en" },
                    }
                );

                setLocationSuggestions(response.data.map((place)=>({
                    name:place.display_name,
                    lat:place.lat,
                    lon:place.lon

                })));
                
            } catch (error) {
                console.error("Error fetching location suggestions", error);
                
            }
        }else{
            setLocationSuggestions([]);
        }
    }

    const handleSelectLocation = (suggestion) => {
        setLocation(suggestion.name);
        setLocationSuggestions([]);
    };  




    useEffect(() => {

        fetchData(searchKey);


    }, [searchKey]);


    useEffect(() => {
        if (!searchKey) setMedicines(data.slice(0, rng));

    }, [data]);

    useEffect(() => {
        if (!searchKey) {
            setSuggesionOn([]);
            setSuggesionOn(false);
        }
        else {
            setSuggesion(data.slice(0, 6));

        }

    }, [data]);


    const fetchData = async (key = '') => {
        try {

            const response = await axios.get(`http://localhost:5000/api/searchMedicine`, { params: { searchKey: key } });
            setData(response.data);






        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };



    function handleSearch() {
        setMedicines(data.slice(0, rng));


    };

    function handleSearchChange(e) {

        setSearchKey(e.target.value);
        setSuggesionOn(true);


    };



    function loadMore() {


        setCount(count + 1);


    }

    function handleFilterButton() {
        setFilterButton(!filterButton);
    }

    useEffect(() => {

        let nxtRng = count * rng;
        if (nxtRng > data.length) {
            nxtRng = data.length;
        }

        setMedicines(data.slice(0, nxtRng));
    }, [count]);

    function disableSuggesion() {
        setTimeout(() => {
            setSuggesionOn(false);
        }, 1000);

    }

    function handleSuggestionClick(itm) {

        setSearchKey(itm.common_name);

        setCount(1);



        setMedicines(data.slice(0, rng));
        setSuggesion([]);
        setSuggesionOn(false);


    }


    async function handleFilter(e) {
        e.preventDefault();
        setFilterButton(false);
        let filters = {};
        if (location) filters.location = location;
        if (disease) filters.disease = disease;
        if (company) filters.company = company;
        if (expiryDate) filters.expiry_date = expiryDate;

        try {
            const response = await axios.get('http://localhost:5000/api/searchFilteredMedicine', { params: filters });

            console.log(response.data);
            setMedicines(response.data);


        } catch (error) {
            console.error(error);
        }
        setLocation('');
        setDisease('');
        setCompany('');
        setExpiryDate('');


    }


    return (
        <div id="full-page">
            <div className="search-section">
                <h1>Find Your Med!</h1>
                <div className="search-container">
                    <input onBlur={disableSuggesion} type="text" value={searchKey} onChange={handleSearchChange} placeholder="Enter Medicine Name" />
                    <button onClick={handleSearch} className="search-icon">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <div className={suggesionOn ? "suggesion active" : "suggesion inactive"}>

                        {
                            suggesion.map((itm) =>

                                (<h4 onClick={() => handleSuggestionClick(itm)} key={itm.med_id} ><span >Generic Name:{itm.generic_name}</span> <span>Common Name:{itm.common_name}</span></h4>)

                            )
                        }


                    </div>

                </div>

            </div>
            <div className="filter-container">
                <button onClick={handleFilterButton} className="dropdown-button">
                    Filter
                </button>
                <div className={filterButton ? 'popup dropdown-active' : 'popup dropdown-inactive'}>
                    <form className="filter-form" onSubmit={handleFilter}>
                        <input id='location' type="text" placeholder="Location" value={location} onChange={handlelocationChange} />
                        {locationSuggestions.length > 0 && (
                <ul className="suggestions">
                    {locationSuggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSelectLocation(suggestion)}>
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}


                        <input id='disease' type="text" placeholder="Disease" value={disease} onChange={(e) => setDisease(e.target.value)} />
                        <input id='company' type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
                        <label htmlFor="earliest-expiry-date">Earliest Expiry Date</label>
                        <input type="date" id='earliest-expiry-date' value={disease} onChange={(e) => setExpiryDate(e.target.value)} placeholder="Earliest Expiry Date" />
                        <button type='submit'>Filter</button>
                    </form>
                </div>
            </div>
            <div className="card-section">
                <div className="cards-container">
                    {medicines.length > 0 ? (
                        medicines.map((med, index) => (
                            <Card
                                key={med.med_id}
                                userId={userId}
                                medId={med.med_id}
                                donorId={med.donor_id}
                                imgSrc={med.med_image||images[index % images.length]} // Use modulo for cycling through images
                                title={med.common_name}
                                qty={med.quantity}
                                expiryDate={med.expiry_date}
                                company={med.company}
                                disease={med.disease}
                                locx={med.locx}
                                locy={med.locy}

                            />
                        ))
                    ) : (
                        <h1 className="no-data" style={{ marginBottom: '50px' }}>No Medicine Found!</h1>
                    )}
                </div>

                <button className="loadmore-btn" onClick={loadMore}>
                    Load More
                </button>

            </div>
        </div>
    );
}
