/* Этап 1. Подготовка данных */
// Создание экземпляра класса DOMParser. Он позволит нам парсить XML
const parser = new DOMParser();
//console.log('parser', parser);

// XML, который мы будем парсить
const xmlString = `
  <list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;
//console.log('xmlString', xmlString);

/* Этап 2. Получение данных */

// Парсинг XML
const xmlDOM = parser.parseFromString(xmlString, "text/xml");
//console.log('DOM', xmlDOM);
// Получение всех DOM-нод
const lstNode = xmlDOM.querySelector("list");
//console.log('lstNode', lstNode);

const studentNodes = lstNode.querySelectorAll("student");
//console.log('studentNodes', studentNodes);
//console.log('studentNode 0', studentNodes[0]);
const students = [];
for (var idx = 0; idx < 2;idx++) {
  const nameNode = studentNodes[idx].querySelector("name");
  const name = nameNode.querySelector("first").textContent + " " +
        nameNode.querySelector("second").textContent;
  students[idx] = { 
    name:  name, 
    age:  Number(studentNodes[idx].querySelector("age").textContent), 
    prof: studentNodes[idx].querySelector("prof").textContent, 
    lang: nameNode.getAttribute("lang") 
  };  
}

/* Этап 3. Запись данных в результирующий объект */
const result = {  list : students };
console.log('result', result);



