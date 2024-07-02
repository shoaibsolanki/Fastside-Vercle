"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import SimpleProductComponent from "./components/SimpleProductComponent";
import ProductComponent from "./components/ProductComponent";
import SaleComponenet from "./components/SaleComponenet";
import PopularProducts from "./components/PopularProducts";
import HeroSection from "./components/HeroSection";
import WhyUs from "./components/MicroComponenets/WhyUs";
import Testomonials from "./components/Testomonials";
import Footer from "./components/Footer";

export default function Home() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (search) {
      const apiUrl = `${BASEURL.ENDPOINT_URL}search/get-result/10001/1/${search}`;
      axios
        .get(apiUrl)
        .then((response) => {
          if (response.status === 200) {
            console.log("new Api", response);
            const data = response.data.data;
            console.log(" search", data);
            setData(data);
          } else {
            console.log("Failed to fetch data from the API.");
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    } else {
      // recommend();
    }
  }, [search]);

  return (
    <main className=" min-h-screen max-w-[1800px] mx-auto px-4 my-2">
      <HeroSection />
      <PopularProducts />
      <SaleComponenet />
      <WhyUs />
      {/* <Testomonials /> */}
    </main>
  );
}
