/* Этап 1. Подготовка данных */

// JSON, который мы будем парсить
const jsonString = `
{
  "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;
 //console.log('jsonString', jsonString);

/* Этап 2. Получение данных */
const data = JSON.parse(jsonString);
//console.log('data', data);
//console.log('list 0', data.list[0]);

const mans = [];
for (var idx = 0; idx < 2; idx++) {
  mans[idx] = {
    name : data.list[idx].name,
    age  : Number(data.list[idx].age),
    prof : data.list[idx].prof,
  }
}

/* Этап 3. Запись данных в результирующий объект */
const result = {list:mans};
console.log('result', result);