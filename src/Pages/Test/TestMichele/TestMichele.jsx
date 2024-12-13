import React from 'react'
import './TestMichele.css'
import ProductContainer from '../../../Components/ProductContainer/ProductContainer';
 const TestMichele = ( ) => {
  const products = [
    { id: 1, name: "Prodotto 1", originalPrice: "10.00€", currentPrice: "80.00€", image: "https://app.naturasi.it/media/catalog/product/cache/852x852/_/1/_1725943432_000100022410_1.jpg", detail: "Un prodotto di alta qualità per ogni esigenza." },
    { id: 2, name: "Prodotto 2", currentPrice: "20.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641649427_000100023810_1.jpg", detail: "Un prodotto versatile e ideale per tutta la famiglia." },
    { id: 3, name: "Prodotto 3", originalPrice: "20.00€", currentPrice: "25.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641812603_000100023921_1.jpg", detail: "Perfetto per soddisfare ogni tuo desiderio di qualità." },
    { id: 4, name: "Prodotto 4", originalPrice: "1.00€", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1672720840_000100068965_1.jpg", detail: "Un'ottima scelta per il tuo benessere quotidiano." },
    { id: 5, name: "Prodotto 5", currentPrice: "20.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1692786758_000100023101_1.jpg", detail: "Prodotto naturale e sostenibile per ogni occasione." },
    { id: 6, name: "Prodotto 6", currentPrice: "30.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641783795_000100023617_1.jpg", detail: "Qualità e gusto in un unico prodotto." },
    { id: 7, name: "Prodotto 7", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1705579086_000100022608_1.jpg", detail: "Ideale per prendersi cura di sé ogni giorno." },
    { id: 8, name: "Prodotto 8", currentPrice: "20.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1711003172_000100023121_1.jpg", detail: "Prodotto ricco di benefici naturali." },
    { id: 9, name: "Prodotto 9", currentPrice: "30.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641640213_000100023796_1.jpg", detail: "Un'ottima scelta per una vita sana e attiva." },
    { id: 10, name: "Prodotto 10", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1705579086_000100022608_1.jpg", detail: "Un prodotto pensato per offrirti il massimo comfort." },
    { id: 1, name: "Prodotto 1", originalPrice: "10.00€", currentPrice: "80.00€", image: "https://app.naturasi.it/media/catalog/product/cache/852x852/_/1/_1725943432_000100022410_1.jpg", detail: "Un prodotto di alta qualità per ogni esigenza." },
    { id: 2, name: "Prodotto 2", currentPrice: "20.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641649427_000100023810_1.jpg", detail: "Un prodotto versatile e ideale per tutta la famiglia." },
    { id: 3, name: "Prodotto 3", originalPrice: "20.00€", currentPrice: "25.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641812603_000100023921_1.jpg", detail: "Perfetto per soddisfare ogni tuo desiderio di qualità." },
    { id: 4, name: "Prodotto 4", originalPrice: "1.00€", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1672720840_000100068965_1.jpg", detail: "Un'ottima scelta per il tuo benessere quotidiano." },
    { id: 5, name: "Prodotto 5", currentPrice: "20.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1692786758_000100023101_1.jpg", detail: "Prodotto naturale e sostenibile per ogni occasione." },
    { id: 6, name: "Prodotto 6", currentPrice: "30.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641783795_000100023617_1.jpg", detail: "Qualità e gusto in un unico prodotto." },
    { id: 7, name: "Prodotto 7", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1705579086_000100022608_1.jpg", detail: "Ideale per prendersi cura di sé ogni giorno." },
    { id: 8, name: "Prodotto 8", currentPrice: "20.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1711003172_000100023121_1.jpg", detail: "Prodotto ricco di benefici naturali." },
    { id: 9, name: "Prodotto 9", currentPrice: "30.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641640213_000100023796_1.jpg", detail: "Un'ottima scelta per una vita sana e attiva." },
    { id: 10, name: "Prodotto 10", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1705579086_000100022608_1.jpg", detail: "Un prodotto pensato per offrirti il massimo comfort." },
    { id: 1, name: "Prodotto 1", originalPrice: "10.00€", currentPrice: "80.00€", image: "https://app.naturasi.it/media/catalog/product/cache/852x852/_/1/_1725943432_000100022410_1.jpg", detail: "Un prodotto di alta qualità per ogni esigenza." },
    { id: 2, name: "Prodotto 2", currentPrice: "20.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641649427_000100023810_1.jpg", detail: "Un prodotto versatile e ideale per tutta la famiglia." },
    { id: 3, name: "Prodotto 3", originalPrice: "20.00€", currentPrice: "25.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641812603_000100023921_1.jpg", detail: "Perfetto per soddisfare ogni tuo desiderio di qualità." },
    { id: 4, name: "Prodotto 4", originalPrice: "1.00€", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1672720840_000100068965_1.jpg", detail: "Un'ottima scelta per il tuo benessere quotidiano." },
    { id: 5, name: "Prodotto 5", currentPrice: "20.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1692786758_000100023101_1.jpg", detail: "Prodotto naturale e sostenibile per ogni occasione." },
    { id: 6, name: "Prodotto 6", currentPrice: "30.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641783795_000100023617_1.jpg", detail: "Qualità e gusto in un unico prodotto." },
    { id: 7, name: "Prodotto 7", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1705579086_000100022608_1.jpg", detail: "Ideale per prendersi cura di sé ogni giorno." },
    { id: 8, name: "Prodotto 8", currentPrice: "20.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1711003172_000100023121_1.jpg", detail: "Prodotto ricco di benefici naturali." },
    { id: 9, name: "Prodotto 9", currentPrice: "30.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641640213_000100023796_1.jpg", detail: "Un'ottima scelta per una vita sana e attiva." },
    { id: 10, name: "Prodotto 10", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1705579086_000100022608_1.jpg", detail: "Un prodotto pensato per offrirti il massimo comfort." },
    { id: 1, name: "Prodotto 1", originalPrice: "10.00€", currentPrice: "80.00€", image: "https://app.naturasi.it/media/catalog/product/cache/852x852/_/1/_1725943432_000100022410_1.jpg", detail: "Un prodotto di alta qualità per ogni esigenza." },
    { id: 2, name: "Prodotto 2", currentPrice: "20.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641649427_000100023810_1.jpg", detail: "Un prodotto versatile e ideale per tutta la famiglia." },
    { id: 3, name: "Prodotto 3", originalPrice: "20.00€", currentPrice: "25.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641812603_000100023921_1.jpg", detail: "Perfetto per soddisfare ogni tuo desiderio di qualità." },
    { id: 4, name: "Prodotto 4", originalPrice: "1.00€", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1672720840_000100068965_1.jpg", detail: "Un'ottima scelta per il tuo benessere quotidiano." },
    { id: 5, name: "Prodotto 5", currentPrice: "20.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1692786758_000100023101_1.jpg", detail: "Prodotto naturale e sostenibile per ogni occasione." },
    { id: 6, name: "Prodotto 6", currentPrice: "30.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641783795_000100023617_1.jpg", detail: "Qualità e gusto in un unico prodotto." },
    { id: 7, name: "Prodotto 7", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1705579086_000100022608_1.jpg", detail: "Ideale per prendersi cura di sé ogni giorno." },
    { id: 8, name: "Prodotto 8", currentPrice: "20.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1711003172_000100023121_1.jpg", detail: "Prodotto ricco di benefici naturali." },
    { id: 9, name: "Prodotto 9", currentPrice: "30.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1641640213_000100023796_1.jpg", detail: "Un'ottima scelta per una vita sana e attiva." },
    { id: 10, name: "Prodotto 10", currentPrice: "10.00€", image: "https://app.naturasi.it/media/catalog/product/cache/264x264/_/1/_1705579086_000100022608_1.jpg", detail: "Un prodotto pensato per offrirti il massimo comfort." },
 
  ];

  const starNumber = 4;
  return (
    <div>
      <br/><br/><br/><br/><br/><br/> 
      <ProductContainer products={products}/>
    </div>
  )
}


export default TestMichele
