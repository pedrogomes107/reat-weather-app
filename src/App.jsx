function App() {
  const API_key = "8bd6f64b95fe345767d440fd333532b2";

  const search = async () => {
    let city = "London";
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return <h1 onClick={search}>Hello World</h1>;
}

export default App;
