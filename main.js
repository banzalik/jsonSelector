import './style.css'
import JSPATH from 'jspath';

document.querySelector('#app').innerHTML = `
<h1>JS Path</h1>
<form id="form">
  <label for="jspath">JS path:<br/></label> 
  <input type="text" id="jspath" name="jspath" value=".books.author"><br><br>
  <label for="json">JSON:</label><br/>
  <textarea id="json" name="json" cols="100" rows="30" spellcheck="false">
{
  "books" : [
      {
          "id"     : 1,
          "title"  : "Clean Code",
          "author" : { "name" : "Robert C. Martin" },
          "price"  : 17.96
      },
      {
          "id"     : 2,
          "title"  : "Maintainable JavaScript",
          "author" : { "name" : "Nicholas C. Zakas" },
          "price"  : 10
      },
      {
          "id"     : 3,
          "title"  : "Agile Software Development",
          "author" : { "name" : "Robert C. Martin" },
          "price"  : 20
      },
      {
          "id"     : 4,
          "title"  : "JavaScript: The Good Parts",
          "author" : { "name" : "Douglas Crockford" },
          "price"  : 15.67
      }
  ]
}
  </textarea><br><br>
  
  <button type="button" id="copy">copy</button>
  <pre id="result">
  </pre>
</form>
`;


const jspathInput = document.getElementById('jspath');
const jsonDataInput = document.getElementById('json');
let result = [];

const update = () => {
    const jspath = jspathInput.value;
    const jsonDataValue = jsonDataInput.value;
  
    let jsonData = {};

    try {
      jsonData = JSON.parse(jsonDataValue);
    } catch {
      jsonData = {};
    }
    
    result = JSPATH.apply(jspath, jsonData);

    document.getElementById('result').innerText = JSON.stringify(result, null, 2);
}

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

const init = () => {
    const form = document.getElementById("form");
    const button = document.getElementById("copy");

    form.addEventListener("submit", (e) => {
      e.stopPropagation();
      e.preventDefault();
    }, true);

    jspathInput.addEventListener("input", update);
    jsonDataInput.addEventListener("input", update);
    button.addEventListener("click", copyContent)

  update();
}


init();