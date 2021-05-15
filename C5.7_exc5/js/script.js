


function useFetch(url, callback) {
  fetch(url)
  .then((response) => {
    // Объект ответа на запрос
    console.log('response', response);
      // Превращаем объект в JSON. Мы не можем его сразу прочитать,
      // надо отдать в следующий then
      // надо отдать в следующий then
      const result = response.json();
      console.log('result', result);
      return result;
    })
  .then((data) => {
      console.log('data', data);
      if (callback) {
        callback(data);
      }
    })
    
    .catch(() => { console.log('error') });

  };
  

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// Ищем кнопку XHR & fetch, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');

/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(apiData) {
  let cards = '';
  // console.log('start cards', cards);
  
  apiData.forEach(item => {
    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
        <p>${item.author}</p>
      </div>
    `;
    cards = cards + cardBlock;
  });
  
  // console.log('end cards', cards);
    
  resultNode.innerHTML = cards;
}

getData = function() {
  const inputNodes =  document.querySelectorAll('input');
  var pageOK = false;
  var limitOK = false;

  try {
    var page = Number(inputNodes[0].value);
    if (page>=1 && page<=10) pageOK = true;
  } catch (e) {}
  try { 
    var limit = Number(inputNodes[1].value);
    if (limit>=1 && limit<=10) limitOK = true;
  } catch (e) {}

  try {
    if (!pageOK && !limitOK) throw 'Номер страницы и лимит вне диапазона от 1 до 10';
    else if (!pageOK ) throw 'Номер страницы вне диапазона от 1 до 10';
         else if (!limitOK) throw 'Лимит вне диапазона от 1 до 10'; 
  } catch (e) {
    alert(e);
    return;
  }
  localStorage.setItem('С5_7_exc5_page',page);
  localStorage.setItem('С5_7_exc5_limit',limit);
  useFetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`, displayResult);
}

// Вешаем обработчик на кнопку для запроса

btnNode.addEventListener('click', () => { getData();})

// есть ли возможность показать данные предыдущей сессии?

// Получаем данные по ключу myKey в localStorage
let pageNum = localStorage.getItem('С5_7_exc5_page');
let limitCnt = localStorage.getItem('С5_7_exc5_limit');

if (pageNum!=null && limitCnt!=null) 
  if (pageNum>=1 && pageNum<=10 && limitCnt>=1 && limitCnt<=10 ) {
    const inputNodes =  document.querySelectorAll('input');
    inputNodes[0].value = pageNum;
    inputNodes[1].value = limitCnt;
    useFetch(`https://picsum.photos/v2/list?page=${pageNum}&limit=${limitCnt}`, displayResult);
  }

