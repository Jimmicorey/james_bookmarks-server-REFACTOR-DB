/* eslint-disable strict */

function makeBookmarksArray() {
  return [
    {
      id: 1,
      title: 'Space',
      url: 'https://www.space.com/',
      description: 'Celebrate humanity\'s ongoing expansion across the final frontier',
      rating: 5,
    },
    {
      id: 2,
      title: 'Bing',
      url: 'https://www.bing.com/',
      description: 'Well it ain\'t Google',
      rating: 4,
    },
    {
      id: 3,
      title: 'D&D Beyond',
      url: 'https://www.dndbeyond.com/',
      description: 'Dungeons & Dragons, \'nuff said...',
      rating: 5,
    },
  ];
}
  
module.exports = {
  makeBookmarksArray,
};