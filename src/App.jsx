import { Search } from "lucide-react";
import { useEffect, useState } from "react";

function getDate(future) {
  const d = new Date();
  d.setDate(d.getDate() + future);
  const string_date = d.toLocaleDateString();
  return `${string_date}`;
}

function App() {
  const API_key = "8bd6f64b95fe345767d440fd333532b2";
  const [loading, setLoading] = useState(true);
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
        { id: 1, temp: data.list[0].main.temp },
        { id: 2, temp: data.list[8].main.temp },
        { id: 3, temp: data.list[16].main.temp },
        { id: 4, temp: data.list[24].main.temp },
        { id: 5, temp: data.list[32].main.temp },
      ];
      setfivedayforecast((fivedayforecast) => ({
        ...fivedayforecast,
        ...updatedValue,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchCity("Lisbon");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    searchCity(e.target[0].value);
  };

  return (
    <div className="bg-[#faf9fb] p-10 flex-1">
      <div className="max-w-screen-lg mx-auto">
        <form onSubmit={handleSearch}>
          <label className="input shadow-md flex items-center gap-2">
            <Search size={"24"} />
            <input
              type="text"
              className="text-sm md:text-md grow"
              placeholder="What do you want to cook today?"
            />
          </label>
        </form>

        <h1 className="font-bold text-3xl md:text-5xl mt-4">
          Recommended Recipes
        </h1>
        <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
          Popular choices
        </p>

        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {!loading && <p>{getDate(0)}</p>}

          {loading &&
            [...Array(9)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4 w-full">
                <div className="skeleton h-32 w-full"></div>
                <div className="flex justify-between">
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-24"></div>
                </div>
                <div className="skeleton h-4 w-1/2"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
