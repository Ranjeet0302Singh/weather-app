"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import CityWeatherData from "../app/cityweatherdata/[name]/page";
import Navbar from "./Navbar";
import { HoverEffect } from "./ui/card-hover-effect";
import { BackgroundBeams } from "./ui/background-beams";
import Image from "next/image";
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
  const [weatherData, setWeatherData] = useState<{ [key: string]: Weather }>(
    {}
  );

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

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  if (loading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce text-white">Loading...</p>
      </div>
    );

  return (
    <>
      <div className="container text-zinc-500 flex flex-col      ">
        <h1 className=" text-2xl mt-52 text-center  pb-11 font-extrabold">
          <p>Lorem ipsum dolor sit amet.</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
        </h1>
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search Country..."
            className="rounded-3xl border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4   bg-neutral-950 placeholder:text-neutral-700  placeholder:text-center p-2"
          />
        </div>
        <BackgroundBeams></BackgroundBeams>

        <HoverEffect items={filteredCities} />
      </div>
    </>
  );
}
