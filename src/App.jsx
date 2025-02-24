import { Search } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FadeLoader } from "react-spinners";

function getDate(future_day) {
  const d = new Date();
  d.setDate(d.getDate() + future_day);
  const string_date = d.toLocaleDateString();
  return `${string_date}`;
}

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

function App() {
  const API_key = "8bd6f64b95fe345767d440fd333532b2";
  const [loading, setLoading] = useState(false);
  const [fivedayforecast, setfivedayforecast] = useState({});

  const searchCity = async (city) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=Metric&appid=${API_key}`
      );
      const data = await response.json();

      let updatedValue = {};
      updatedValue = [
        data.list[0].main.temp,
        data.list[8].main.temp,
        data.list[16].main.temp,
        data.list[24].main.temp,
        data.list[32].main.temp,
      ];
      setfivedayforecast((fivedayforecast) => ({
        ...fivedayforecast,
        ...updatedValue,
      }));
    } catch (error) {
      toast.error("City not found");
      setfivedayforecast({});
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchCity(e.target[0].value);
  };

  return (
    <div className="p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="font-bold text-3xl md:text-5xl mt-4">Temperature</h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Next 5 days
        </p>
        <form
          onSubmit={handleSearch}
          className="relative max-w-xs w-full flex-center"
        >
          <label className="input shadow-md flex items-center gap-2">
            <Search size={"24"} />
            <input
              type="text"
              className="text-sm md:text-md grow"
              placeholder="What city are you looking for?"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
              {" "}
              Search{" "}
            </button>
          </label>
        </form>
        <div className="max-w-2xs gap-3">
          {!loading && !isEmptyObject(fivedayforecast) && (
            <ul className="my-3">
              <li>
                <div className="flex justify-between">
                  <p>{getDate(0)}</p>
                  <p>{fivedayforecast[0]} ºC</p>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <p>{getDate(1)}</p>
                  <p>{fivedayforecast[1]} ºC</p>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <p>{getDate(2)}</p>
                  <p>{fivedayforecast[2]} ºC</p>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <p>{getDate(3)}</p>
                  <p>{fivedayforecast[3]} ºC</p>
                </div>
              </li>
              <li>
                <div className="flex justify-between">
                  <p>{getDate(4)}</p>
                  <p>{fivedayforecast[4]} ºC</p>
                </div>
              </li>
            </ul>
          )}
          {loading && <FadeLoader className="content-center my-3" />}
        </div>
      </div>
    </div>
  );
}

export default App;
