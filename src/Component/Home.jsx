import React, { useEffect } from 'react'
import { useGetAllProductsQuery } from '../features/productsApi'
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetAllProductsQuery();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  }

  const [filtereddata, setfiltereddata] = React.useState(data);
  const [pricefilteredData, setpricefilteredData]=React.useState(filtereddata)
  const [filterprice, setfilterprice]= React.useState(0)
  
  useEffect(() => {
    datafiltration('all')
  }, [useGetAllProductsQuery()]);


  const datafiltration = (filterbycategory) => {
    if (filterbycategory === 'all') {
      setfiltereddata(data)
    } else{
      setfiltereddata(data?.filter((cat) => cat?.category === filterbycategory))
    }
  }
  
  useEffect(()=>{
    const datafilterbyprice = () => {
     if(filterprice == 0){
      setpricefilteredData(filtereddata);
     }else if (filterprice == 100){
      setpricefilteredData(filtereddata?.filter((cat) => cat?.price <= filterprice));
     }else if (filterprice == 500){
      setpricefilteredData(filtereddata?.filter((cat) => cat?.price <= filterprice && cat?.price >= 100));
     }else if (filterprice == 1000){
      setpricefilteredData(filtereddata?.filter((cat) => cat?.price <= filterprice && cat?.price >= 500));
     }else if (filterprice == 1500){
      setpricefilteredData(filtereddata?.filter((cat) => cat?.price <= filterprice && cat?.price >= 1000));
     }else if (filterprice == 2000){
      setpricefilteredData(filtereddata?.filter((cat) => cat?.price <= filterprice && cat?.price >= 1500));
     }else if (filterprice == 2500){
      setpricefilteredData(filtereddata?.filter((cat) => cat?.price <= filterprice && cat?.price >= 2000));
     }else if (filterprice == 3000){
      setpricefilteredData(filtereddata?.filter((cat) => cat?.price <= filterprice && cat?.price >= 2500));
     }else if (filterprice == 3500){
      setpricefilteredData(filtereddata?.filter((cat) => cat?.price <= filterprice && cat?.price >= 3000));
     }else if (filterprice == 4000){
      setpricefilteredData(filtereddata?.filter((cat) => cat?.price <= filterprice && cat?.price >= 3500));
     }
    }
    datafilterbyprice();
  },[filterprice,filtereddata]);

  return (
    <div className='home-container'>
      {isLoading ? (<p>Loading...</p>) : error ? (
        <p>An error occured...</p>) : (
        <>
          <div className="filter-category">
            <div className="categories-heading">
            <h4>Categories</h4>
            <h4 className='price-Heading'>Price</h4>
            </div>
            <select onClick={(e)=>datafiltration(e.target.value)}>
              <option value="all">All Category</option>
              <option value="laptop">Laptop</option>
              <option value="mobile">Mobile</option>
              <option value="fragrances">Fragrances</option>
              <option value="skincare">Skincare</option>
              <option value="groceries">Groceries</option>
              <option value="home-decoration">Home-Decoration</option>
          </select>
          <select className='select' onClick={(e)=>setfilterprice(e.target.value)}>
              <option value={0}>All</option>
              <option value={100}>0 to 100</option>
              <option value={500}>101 to 500</option>
              <option value={1000}>501 to 1000</option>
              <option value={1500}>1001 to 1500</option>
              <option value={2000}>1501 to 2000</option>
              <option value={2500}>2001 to 2500</option>
              <option value={3000}>2501 to 3000</option>
              <option value={3500}>3001 to 3500</option>
              <option value={4000}>3501 to 4000</option>
          </select>
          </div>

          <h2>New Arrivals</h2>
          <div className="products">
            {pricefilteredData?.map((product) => (
            
              <>
              <div key={product.id} className='product'>
                <h3>{product.name}</h3>
                <img src={product.image} alt={product.name} />
                <div className="details">
                  <span>{product.desc}</span>
                  <span className="price">₹{product.price}</span>
                </div>
                <button onClick={() => handleAddToCart(product)}> Add To Cart </button>
              </div>

            {/* Bootstrap style */}
              {/* <div class="card" style={{ width: "16rem", marginBottom:"10px"}}>
                  <img src={product.image} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">${product.price}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a  onClick={() => handleAddToCart(product)} href="#" class="btn btn-primary">Add to cart</a>
                  </div>
              </div> */}
                </>
                
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;





 


 

// const Home = ({ products }) => {

//   const [selectedCategory, setSelectedCategory] = React.useState('all');

//   const [selectedPriceRange, setSelectedPriceRange] = React.useState('all');

//   const { data, error, isLoading } = useGetAllProductsQuery();

//   // Define the predefined price ranges

//   const priceRanges = [

//     { label: 'All', min: 0, max: Infinity },

//     { label: '$0 - $1000', min: 0, max: 1000 },

//     { label: '$1000 - $2000', min: 1000, max: 2000 },

//     { label: '$2000 - $3000', min: 2000, max: 3000 },

//   ];

 

//   // Filter products based on the selected category and price range

//   const filteredProducts = data?.filter(product => {

//     const price = product.price;

//     const { min, max } = priceRanges.find(range => range.label === selectedPriceRange);

 

//     if (

//       (selectedCategory === 'all' || product.category === selectedCategory) &&

//       (price >= min && price <= max)

//     ) {

//       return true;

//     }

//     return false;

//   });

 

//   const handleCategoryChange = (event) => {

//     setSelectedCategory(event.target.value);

//   };

 

//   const handlePriceRangeChange = (event) => {

//     setSelectedPriceRange(event.target.value);

//   };

 

//   return (

//     <div>

//       <h1>Product List</h1>

//       <div>

//         <label htmlFor="category">Filter by Category:</label>

//         <select id="category" onChange={handleCategoryChange} value={selectedCategory}>

//           <option value="all">All</option>

//           <option value="laptop">Laptops</option>

//           <option value="mobile">Mobiles</option>

//           <option value="fragrances">Fragrances</option>

//           <option value="skincare">Skincare</option>

//           <option value="groceries">Groceries</option>

//           <option value="home-decoration">Home Decoration</option>

//         </select>

//       </div>

//       <div>

//         <label>Filter by Price Range:</label>

//         {priceRanges?.map((range) => (

//           <label key={range.label}>

//             <input

//               type="radio"

//               value={range.label}

//               checked={selectedPriceRange === range.label}

//               onChange={handlePriceRangeChange}

//             />

//             {range.label}

//           </label>

//         ))}

//       </div>

//       <ul>

//         {filteredProducts?.map(product => (

//           <li key={product.id}>

//             <img src={product.image} alt={product.name} />

//             <h3>{product.name}</h3>

//             <p>{product.desc}</p>

//             <p>Price: ${product.price}</p>

//           </li>

//         ))}

//       </ul>

//     </div>

//   );

// };

 

// export default Home;


