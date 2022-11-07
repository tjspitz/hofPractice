// This repo is optional extra practice to use the underscore functions.
// Here we'll be writing new functions, but these functions will use
// the underscore functions within them.

// If you would like to take a look at the inputs that are passed into these functions, please
// feel free to check out the data.js file.

/*
 *
 *  _.each
 *
 */

// use _.each to create a copy of the given array.
var moreFruits = function (fruits) {

  // WORKS #1 (original, preferred)
  var copiedFruits = [];
  _.each(fruits, function(fruit) {
    copiedFruits.push(fruit);
  });
  return copiedFruits;

  // WORKS #2 (just practicing)
  // var copiedFruits = [];
  // _.each(fruits, function(fruit, index, collection) {
  //   copiedFruits = copiedFruits.concat(collection.slice(index, index + 1));
  // });
  // return copiedFruits;

};

// use _.each to traverse the number array and determine
// which are multiples of five.
var multiplesOfFive = function (numbers) {

  // WORKS #1 (original, preferred)
  var counter = 0;
  _.each(numbers, function(number) {
    if (number % 5 === 0) {
      counter ++;
    }
  });
  return counter;

  // WORKS #2 (just practicing... or being dumb)
  // var sillyArrayTracker = [];
  // _.each(numbers, function(number) {
  //   if (Number.isInteger(number / 5)) {
  //     sillyArrayTracker.push('a ridiculous way to solve this problem');
  //   }
  // });
  // return sillyArrayTracker.length;

};

// use _.each to build an array containing only tweets belonging to a specified user.
var getUserTweets = function(tweets, user) {

  // // WORKS #1 (original, preferred)
  var userTweets = [];
  _.each(tweets, function(tweet) {
    if (tweet.user === user) {
      userTweets.push(tweet);
    }
  });
  return userTweets;

  // WORKS #2 (practicing)
  // var userTweets = [];
  // _.each(tweets, function(tweet, index, collection) {
  //   if (tweet.user === user) {
  //     userTweets = userTweets.concat(collection.slice(index, index + 1));
  //   }
  // });
  // return userTweets;

};

/*
 *
 *  _.filter
 *
 */

// use _.filter to return the fruits array with only the desired fruit.
var onlyOneFruit = function (fruits, targetFruit) {
  return _.filter(fruits, function(fruit) {
    if (fruit === targetFruit) {
      return true;
    }
  });
};

// use _.filter to return the fruits array with only fruits
// starting with the letter 'P'.
var startsWith = function (fruits, letter) {

  // WORKS #1 (original, preferred BUT with toLowerCase called on fruit to be thorough)
  return _.filter(fruits, function(fruit) {
    if (fruit.toLowerCase().startsWith(letter.toLowerCase())) {
      return true;
    }
  });

  // WORKS #2 (practicing, callling toUpperCase just to be different)
  // return _.filter(fruits, function(fruit) {
  //   if (fruit[0].toUpperCase() === letter.toUpperCase()) {
  //     return true;
  //   }
  // });
};

// return a filtered array containing only cookie-type desserts.
var cookiesOnly = function (desserts) {

  // WORKS (original, BUT added toLowerCase to be thorough)
  return _.filter(desserts, function(dessert) {
    if (dessert.type.toLowerCase() === 'cookie') {
      return true;
    }
  });
};

// rebuild the getUserTweets function from above with _.filter instead
var filterUserTweets = function(tweets, user) {

  // WORKS (original)
  return _.filter(tweets, function(tweet) {
    if (tweet.user === user) {
      return true;
    }
  });
};

/*
 *
 *  _.map
 *
 */

// given an array of strings, use _.map to return a new array containing all
// strings converted to uppercase letters.
var upperCaseFruits = function (fruits) {

  // WORKS (original)
  return _.map(fruits, function(fruit) {
    return fruit.toUpperCase();
  });
};

// given an array of dessert objects, return a new array of objects
// that have a new "glutenFree" property, with a boolean value.
// TIP: Items that contain flour are not gluten-free.
var glutenFree = function (desserts) {
  return _.map(desserts, function(dessert) {
    if (!_.contains(dessert.ingredients, 'flour')) {
      dessert.glutenFree = true;
    } else {
      dessert.glutenFree = false;
    }
    return dessert;
  });
};

// given an array of tweet objects, return a new array of strings
// containing only the message properties.
var allUserMessages = function(tweets) {
  return _.map(tweets, function(tweet) {
    return tweet.message;
  });
};

// use _.map to return an array of items with their sale prices, with a new property
// containing the sale price. round any decimals to 2 places.
//
// having trouble with decimals? check out this article:
// http://adripofjavascript.com/blog/drips/avoiding-problems-with-decimal-math-in-javascript.html
//
/*

 example output:
  var salePrices = applyCoupon(groceries, 0.20);
  [
    {
      id: 1,
      product: 'Olive Oil',
      price: '$12.1',
      salePrice: '$9.68' <-- price - (price * coupon)
    }
  ];

I: an array of objs; a number representing a price discount
O: a mapped array of objs, now with a 'salePrice' property
C: the 2nd arg needs to be applied as: item.price - (item.price * coupon)
   the .price is a coerced string
   the .salePrice is a coerced string
E:

Strategy:
return mapped array of each item;
convert each .price to an actual Num by slicing first char & calling Number
  but also convert to cents f.or decimal accuracy;
set new .salePrice prop that is '$' concatted to 'realNumPrice', to cents,
  back to dollars after performing coupon operation
return the item

Pseudocode:
// return mapped array of each item
  // declare alias f.or converting .price to actual Num (also convert to cents)
  // set new .salePrice prop: '$' plus 'numPriceDollars'
  // return item

*/
var applyCoupon = function (groceries, coupon) {
  return _.map(groceries, function(item) {

    // WORKS #1 (Original)
    /* did the cents conversion because of the link referenced
       but the 'get exact numbers by converting to cents' thing didn't seem to work out
       until I used .toFixed(2) - so, was there a real need to convert to cents f.or this? */

    // var numPriceToCents = Number(item.price.slice(1)) * 100;
    // var numSalePriceToDollars = (numPriceToCents - numPriceToCents * coupon) / 100;
    // item.salePrice = '$' + numSalePriceToDollars.toFixed(2);
    // return item;

    // WORKS #2 (Preferred, result of above thoughts)
    var numPrice = Number(item.price.slice(1));
    var numSalePrice = numPrice - numPrice * coupon;
    item.salePrice = '$' + numSalePrice.toFixed(2);
    return item;

  });
};

/*
 *
 *  _.reduce
 *
 */

// return the total price of all products.
var sumTotal = function (products) {
  return _.reduce(products, function(accumulator, product) {
    // has to be hard-coded, ish, to accept the data set in data.js(?)
    return accumulator + Number(product.price.slice(1));
  }, 0);
};

// return an object consisting of dessert types and how many of each.
// exampleOutput: { dessertType: 3, dessertType2: 1 }
var dessertCategories = function (desserts) {

  // WORKS #1 (original)
  return _.reduce(desserts, function(accumulator, dessert) {
    if (!accumulator[dessert.type]) {
      accumulator[dessert.type] = 0;
    }
    accumulator[dessert.type] ++;
    return accumulator;
  }, {});

  // #2 (not working yet)
  // return _.reduce(desserts, function(accumulator, dessert) {
  //   return (!accumulator[dessert.type]) ? accumulator[dessert.type] = 0
  //   : accumulator[dessert.type] ++;
  // }, {});

};

// return an object with the proper count of all user messages
/*
 example output:
  var tweetCountPerUser = countMessagesPerUser(tweets);
  {
    "douglascalhoun": 5,
    "mracus": 6,
    "shawndrost": 5,
    "sharksforcheap": 3
  }
*/
var countMessagesPerUser = function(tweets) {
  return _.reduce(tweets, function(accumulator, tweet) {
    if (!accumulator[tweet.user]) {
      accumulator[tweet.user] = 0;
    }
    accumulator[tweet.user] ++;
    return accumulator;
  }, {});

};

// given an array of movie data objects,return an array containing
// movies that came out between 1990 and 2000.
// TIP: use an array as your accumulator - don't push to an external array!
var ninetiesKid = function (movies) {
  return _.reduce(movies, function(accumulator, movie) {
    if (1989 < movie.releaseYear && movie.releaseYear < 2001) {
      accumulator.push(movie.title);
    }
    return accumulator;
  }, []);
};

// return an boolean stating if there exists a movie with a shorter
// runtime than your time limit.
// timeLimit is an integer representing a number of minutes.
var movieNight = function (movies, timeLimit) {
  return _.reduce(movies, function(accumulator, movie) {
    if (timeLimit > movie.runtime) {
      accumulator = true;
    }
    return accumulator;
  }, false);
};
