import { useRef, useEffect } from "react";
import "./App.css";
import { ColorType, createChart } from "lightweight-charts";
function App() {
  const chartContainerRef = useRef();
  console.log(new Date())
  useEffect(() => {
    const initialData = [
      { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
      { open: 9.55, high: 10.3, low: 9.42, close: 9.94, time: 1642514276 },
      { open: 9.94, high: 10.17, low: 9.92, close: 9.78, time: 1642600676 },
      { open: 9.78, high: 10.59, low: 9.18, close: 9.51, time: 1642687076 },
      { open: 9.51, high: 10.46, low: 9.1, close: 10.17, time: 1642773476 },
      { open: 10.17, high: 10.96, low: 10.16, close: 10.47, time: 1642859876 },
      { open: 10.47, high: 11.39, low: 10.4, close: 10.81, time: 1642946276 },
      { open: 10.81, high: 11.6, low: 10.3, close: 10.75, time: 1643032676 },
      { open: 10.75, high: 11.6, low: 10.49, close: 10.93, time: 1643119076 },
      { open: 10.93, high: 11.53, low: 10.76, close: 10.96, time: 1643205476 },
    ];

    const chart = createChart(chartContainerRef.current);
    chart.applyOptions({
      layout: {
        background: { color: "#222" },
        textColor: "#DDD",
      },
      grid: {
        vertLines: { color: "#444" },
        horzLines: { color: "#444" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
    });
    // chart.timeScale().fitContent();
    chart.timeScale().applyOptions({
      borderColor: "#71649C",
      rightOffset: 20,
      barSpacing: 15,
      minBarSpacing: 10,
      fixLeftEdge: true,
    });

    const newSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    newSeries.setData(initialData);
    // Setting the border color for the vertical axis
    chart.priceScale("right").applyOptions({
      borderColor: "#71649C",
    });

    // Setting the border color for the horizontal axis
    chart.timeScale("right").applyOptions({
      borderColor: "#71649C",
    });

    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => [
      chart.remove(),
      window.removeEventListener("resize", handleResize),
    ];
  }, []);


  

  return <div ref={chartContainerRef}></div>;
}

export default App;
