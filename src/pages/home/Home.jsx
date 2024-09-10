import React from 'react';
import '../home/home.css';
import HomeSlider from './HomeSlider';
import DealOfTheDay from '../../components/deal_of_the_Day/DealOfTheDay';
import BestSeller from '../../components/bestSeller/BestSeller';
import Banner from '../../components/banner/Banner';
import TrendingProduct from '../../components/bestSeller/trending/TrendingProduct';
import CategoryList from '../../components/categoryList/CategoryList';
const Home = () => {
  return (
    <>
    <div className="homeContainer">
     
      <div className="home"> 
        <HomeSlider/> 
        <CategoryList/>
        <DealOfTheDay/>
      <BestSeller/>
   <div className="container">
   <Banner/>
   </div>
      <TrendingProduct/>
     
      </div>

    


    </div>
      
    </>
  )
}

export default Home



