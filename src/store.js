/* eslint-disable strict */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const { v4: uuidv4 } = require('uuid');


const bookmarks = [

  { id: uuidv4(),
    title: 'Space',
    url: 'https://www.space.com/',
    description: "Celebrate humanity's ongoing expansion across the final frontier",
    rating: 5 
  },

  { id: uuidv4(),
    title: 'Bing',
    url: 'https://www.bing.com/',
    description: "Well it ain't Google",
    rating: 3
  },

  { id: uuidv4(),
    title: 'D&D Beyond',
    url: 'https://www.dndbeyond.com/',
    description: "Dungeons & Dragons, 'nuff said...",
    rating: 5 
  },

];
    

module.exports = { bookmarks };
