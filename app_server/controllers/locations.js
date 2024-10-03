const mongoose = require('mongoose');
const Review = require('../models/review');

// Mock data for locations
const locations = [
  {
    name: 'The Spicy',
    address: '123 Main Street, Jubilee Hills, Hyderabad, Telangana 500033',
    rating: 4,
    facilities: ['Indoor seating', 'Free Wi-Fi', 'Air conditioning'],
    coords: { lat: 17.4239, lng: 78.4000 },
    openingTimes: [
      { days: 'Monday - Friday', opening: '11:00am', closing: '11:00pm', closed: false },
      { days: 'Saturday', opening: '11:00am', closing: '12:00am', closed: false },
      { days: 'Sunday', opening: '12:00pm', closing: '11:00pm', closed: false }
    ],
    reviews: [
      { author: 'saiteja', rating: 5, timestamp: '2023-08-12', reviewText: 'Amazing food and ambiance. The staff is very courteous, and the dishes were flavorful. Highly recommended for family gatherings!' },
      { author: 'krishna vamshi', rating: 4, timestamp: '2023-08-18', reviewText: 'Great place with good food, but the waiting time can be a bit long on weekends.' }
    ],
    mapUrl: 'https://www.google.com/maps?q=The+Spicy,+Jubilee+Hills,+Hyderabad,+Telangana',
    imageSrc: '/images/img8.avif',
    gmail: 'spicybistro@gmail.com',
    phno: '9876543210'
  },
  {
    name: 'Urban Tadka',
    address: '456 High Street, Banjara Hills, Hyderabad, Telangana 500034',
    rating: 5,
    facilities: ['Rooftop seating', 'Live music', 'Valet parking'],
    coords: { lat: 17.4178, lng: 78.4482 },
    openingTimes: [
      { days: 'Monday - Friday', opening: '12:00pm', closing: '11:30pm', closed: false },
      { days: 'Saturday', opening: '12:00pm', closing: '12:30am', closed: false },
      { days: 'Sunday', opening: '12:00pm', closing: '11:30pm', closed: false }
    ],
    reviews: [
      { author: 'Ajay Kumar', rating: 5, timestamp: '2023-07-22', reviewText: 'The rooftop seating is perfect for a night out. The food was delicious, and the view was amazing.' },
      { author: 'Meera', rating: 4, timestamp: '2023-07-30', reviewText: 'The live music adds to the overall experience. Food was good, but the service was a bit slow.' }
    ],
    mapUrl: 'https://www.bing.com/maps?osid=561850da-e9b4-4bf2-be63-c2795449e04c&cp=17.527716~78.484547&lvl=17&pi=0&imgid=df28cadd-207b-45e2-891a-c0ee53c553df&v=2&sV=2&form=S00027',
    imageSrc: '/images/img1.jpeg',
    gmail: 'urbantadka@gmail.com',
    phno: '9876543211'
  },
  {
    name: 'Café Mocha',
    address: '78 Park Avenue, Hitech City, Hyderabad, Telangana 500081',
    rating: 4,
    facilities: ['Outdoor seating', 'Pet-friendly', 'Breakfast menu'],
    coords: { lat: 17.4504, lng: 78.3808 },
    openingTimes: [
      { days: 'Monday - Friday', opening: '8:00am', closing: '10:00pm', closed: false },
      { days: 'Saturday', opening: '8:00am', closing: '11:00pm', closed: false },
      { days: 'Sunday', opening: '9:00am', closing: '10:00pm', closed: false }
    ],
    reviews: [
      { author: 'karthik', rating: 4, timestamp: '2023-06-18', reviewText: 'Great place to relax and have coffee. Their breakfast menu is a must-try.' },
      { author: 'koushik', rating: 3, timestamp: '2023-06-25', reviewText: 'Loved the ambiance, but the food portions were small for the price.' }
    ],
    mapUrl: 'https://www.google.com/maps?q=4-106/C,Annojiguda,Hyderabad,Telangana',
    imageSrc: '/images/img2.jpg',
    gmail: 'cafemocha@gmail.com',
    phno: '9876543212'
  },
  {
    name: 'Royal Dine',
    address: '15 Castle Road, Kondapur, Hyderabad, Telangana 500084',
    rating: 5,
    facilities: ['Banquet hall', 'Buffet', 'Private dining'],
    coords: { lat: 17.4749, lng: 78.3892 },
    openingTimes: [
      { days: 'Monday - Friday', opening: '11:30am', closing: '10:30pm', closed: false },
      { days: 'Saturday', opening: '11:30am', closing: '11:00pm', closed: false },
      { days: 'Sunday', opening: '12:00pm', closing: '10:30pm', closed: false }
    ],
    reviews: [
      { author: 'Sakshi ', rating: 5, timestamp: '2023-09-05', reviewText: 'Excellent buffet with a variety of options. The desserts were particularly impressive.' },
      { author: 'Nikhil ', rating: 4, timestamp: '2023-09-12', reviewText: 'A bit crowded on weekends, but the service was good, and the food was worth it.' }
    ],
    mapUrl: 'https://www.google.com/maps?q=4-106/C,Annojiguda,Hyderabad,Telangana',
    imageSrc: '/images/img3.jpg',
    gmail: 'royaldine@gmail.com',
    phno: '9876543213'
  },
  {
    name: 'Spice Route',
    address: '302 Circular Road, Madhapur, Hyderabad, Telangana 500081',
    rating: 3,
    facilities: ['Takeout service', 'Family-friendly', 'Vegan options'],
    coords: { lat: 17.4493, lng: 78.3931 },
    openingTimes: [
      { days: 'Monday - Friday', opening: '11:00am', closing: '10:00pm', closed: false },
      { days: 'Saturday', opening: '11:00am', closing: '10:30pm', closed: false },
      { days: 'Sunday', opening: '12:00pm', closing: '10:00pm', closed: false }
    ],
    reviews: [
      { author: 'Anjali ', rating: 4, timestamp: '2023-08-08', reviewText: 'Tasty food with a good range of vegan options. Takeout service was quick and hassle-free.' },
      { author: 'Ravi Teja', rating: 3, timestamp: '2023-08-15', reviewText: 'Decent food, but the portions could be bigger. Good place for a family dinner.' }
    ],
    mapUrl: 'https://www.google.com/maps?q=4-106/C,Annojiguda,Hyderabad,Telangana',
    imageSrc: '/images/img4.webp',
    gmail: 'spiceroute@gmail.com',
    phno: '9876543214'
  },
  {
    name: 'Bistro Delight',
    address: '12 Garden Road, Begumpet, Hyderabad, Telangana 500016',
    rating: 4,
    facilities: ['Cozy ambiance', 'Continental cuisine', 'Late-night menu'],
    coords: { lat: 17.4415, lng: 78.4657 },
    openingTimes: [
      { days: 'Monday - Friday', opening: '12:00pm', closing: '11:00pm', closed: false },
      { days: 'Saturday', opening: '12:00pm', closing: '12:00am', closed: false },
      { days: 'Sunday', opening: '1:00pm', closing: '11:00pm', closed: false }
    ],
    reviews: [
      { author: 'Neha ', rating: 5, timestamp: '2023-08-24', reviewText: 'A hidden gem! The food is outstanding, and the ambiance is very cozy. Perfect for a date night!' },
      { author: 'Suresh ', rating: 4, timestamp: '2023-08-30', reviewText: 'Nice place for a casual outing. The late-night menu is a big plus!' }
    ],
    mapUrl: 'https://www.google.com/maps?q=4-106/C,Annojiguda,Hyderabad,Telangana',
    imageSrc: '/images/img7.jpg',
    gmail: 'bistrodelight@gmail.com',
    phno: '9876543215'
  },
  {
    name: 'The Gourmet Kitchen',
    address: '34 Food Street, Gachibowli, Hyderabad, Telangana 500032',
    rating: 5,
    facilities: ['Chef special dishes', 'Home delivery', 'Outdoor seating'],
    coords: { lat: 17.4293, lng: 78.3872 },
    openingTimes: [
      { days: 'Monday - Friday', opening: '10:00am', closing: '10:00pm', closed: false },
      { days: 'Saturday', opening: '10:00am', closing: '11:30pm', closed: false },
      { days: 'Sunday', opening: '11:00am', closing: '10:00pm', closed: false }
    ],
    reviews: [
      { author: 'Rajesh ', rating: 5, timestamp: '2023-09-01', reviewText: 'The chef specials are a must-try. Excellent service and beautiful ambiance.' },
      { author: 'Kavya ', rating: 4, timestamp: '2023-09-05', reviewText: 'Food delivery was quick, and everything arrived fresh and hot!' }
    ],
    mapUrl: 'https://www.google.com/maps?q=4-106/C,Annojiguda,Hyderabad,Telangana',
    imageSrc: '/images/img6.jpeg',
    gmail: 'gourmetkitchen@gmail.com',
    phno: '9876543216'
  },
];

// Home List Route
const homelist = (req, res) => {
  res.render('locations-list', {
    title: 'FoodHub - Connecting You to Nutritious Choices!!!',
    pageHeader: {
      title: 'FoodHub',
      strapline: 'Connecting You to Nutritious Choices!!!',
    },
    sidebar: "Looking for a restaurant that serves your favorite cuisine? FoodHub helps you discover the best dining spots around, whether you crave delicious street food or a gourmet dining experience...",
    locations: locations,
  });
};

// Location Info Route
const locationInfo = (req, res) => {
  const locationName = req.params.name.replace(/-/g, ' ');
  const location = locations.find(loc => loc.name.toLowerCase() === locationName.toLowerCase());

  if (!location) {
    return res.status(404).send('Location not found');
  }

  res.render('location-info', {
    title: location.name,
    pageHeader: { title: location.name },
    sidebar: `To Contact Us:\nGmail: ${location.gmail}\nPhone: ${location.phno}`,
    location: location
  });
};

// Add Review Page
const addReview = (req, res) => {
  res.render('location-review-form', {
    title: 'Review on FoodHub',
    pageHeader: { title: 'Add Your Review' }
  });
};

// Submit Review Route
const submitReview = async (req, res) => {
  const { name, rating, review } = req.body;
  const newReview = new Review({
    name: name,
    rating: parseInt(rating, 10), // Ensure the rating is saved as a number
    review: review
  });

  try {
    // Save the review to the database
    await newReview.save();
    console.log('Review saved:', newReview);

    // Redirect to the home page after submission
    res.redirect('/');
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).send('Error saving review');
  }
};

  // Create a new review instance
  

// Exporting all the controller functions
module.exports = {
  homelist,
  locationInfo,
  addReview,
  submitReview
};
