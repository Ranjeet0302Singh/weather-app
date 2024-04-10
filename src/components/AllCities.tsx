"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import CityWeatherData from "../app/cityweatherdata/[name]/page";
import Navbar from "./Navbar";

interface City {
  id: number;
  name: string;
  country: string;
  population: number;
  latitude: number;
  longitude: number;
  timezone: string;
}

interface Weather {
  description: string;
  temperature: number;
}

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [weatherData, setWeatherData] = useState<{ [key: string]: Weather }>({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=10000"
        );

        const formattedCities = response.data.records.map((record: any) => ({
          id: record.geoname_id,
          name: record.fields.cou_name_en,
          country: record.fields.country_code,
          population: record.fields.population,
          timezone: record.fields.timezone,
          latitude: record.fields.latitude,
          longitude: record.fields.longitude,
        }));

        setCities(formattedCities);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  // useEffect(() => {
  //   const fetchWeatherData = async () => {
  //     const promises = cities.map(async (city) => {
  //       try {
  //         const response = await axios.get(
  //           `https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.country}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
  //         );
  //         const weather: Weather = {
  //           description: response.data.weather[0].description,
  //           temperature: response.data.main.temp,
  //         };
  //         setWeatherData((prevData) => ({ ...prevData, [city.name]: weather }));
  //       } catch (error) {
  //         console.error("Error fetching weather data for", city.name, ":", error);
  //       }
  //     });
  //     await Promise.all(promises);
  //   };

  //   fetchWeatherData();
  // }, [cities]);

  useEffect(() => {
    const uniqueCityNames = new Set<string>(); // Set to store unique city names

    // Filter cities based on search query and remove duplicates
    const filtered = cities.filter((city) => {
      // Check if city name exists and is not already added to the set
      if (
        city.name &&
        !uniqueCityNames.has(city.name.toLowerCase()) &&
        city.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        uniqueCityNames.add(city.name.toLowerCase()); // Add city name to the set
        return true;
      }
      return false;
    });

    setFilteredCities(filtered);
  }, [searchQuery, cities]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Cities</h1>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search cities..."
        />
      </div>

      {/* <Navbar location={CityWeatherData.name } /> */}
      <div className="grid grid-cols-3 gap-4">
        {filteredCities.map((city) => (
          <Link href={`/cityweatherdata/${encodeURIComponent(city.name)}`}  key={city.id} className="border p-4 rounded-md">
            <h2>{city.name}</h2>
            <p>Country: {city.country}</p>
            <p>Population: {city.population}</p>
            <p>Timezone: {city.timezone}</p>
            {weatherData[city.name] && (
              <div>
                <p>Weather: {weatherData[city.name].description}</p>
                <p>Temperature: {weatherData[city.name].temperature}°C</p>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
