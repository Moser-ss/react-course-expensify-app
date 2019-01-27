// Object destructuring

/* const person = {
  name: 'Steph',
  age: 30,
  location: {
    city: 'Lisbon',
    temp: 28
  }
} */

/* const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {

  }
}

const { name: publisherName = 'Self-Published'} = book.publisher
console.log(publisherName);  // Pengium , self-Published */


//Array destructuring


const item = ['Coffee (hot)', '2.00€', '2.50€' ,'2.75€']
const [beverge, medium ] = item 
console.log(`A medium ${beverge} costs ${medium}`);
