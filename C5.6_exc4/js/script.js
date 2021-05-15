/**
  * Функция-обертка над XMLHttpRequest, осуществляющая запрос
  * url - урл, по которому будет осуществляться запрос
  * callback - функция, которая вызовется при успешном выполнении
  * и первым параметром получит объект-результат запроса
  */
function useRequestXHR(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      const result = xhr.responseURL;
      if (callback) {
        callback(result);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};


function useFetch(url, callback) {
  fetch(url)
  .then((response) => {
    // Объект ответа на запрос
    console.log('response', response);
      // Превращаем объект в JSON. Мы не можем его сразу прочитать,
      // надо отдать в следующий then
      const result = response.url;
      console.log(result);
      if (callback) {
        callback(result);
      }
    })
    
    .catch(() => { console.log('error') });

  };
  

// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');
// Ищем кнопку XHR & fetch, по нажатии на которую будет запрос
const btnNodes = document.querySelectorAll('.j-btn-request');

/**
  * Функция обработки полученного результата
  * apiData - объект с результатом запроса
  */
function displayResult(resultUrl) {
  const cardBlock = `
      <div class="card">
        <img
          src="${resultUrl}"
          class="card-image"
        />
        <p>${resultUrl}</p>
      </div>
    `;
  resultNode.innerHTML = cardBlock;
}

getData = function(isXHR) {
  const inputNodes =  document.querySelectorAll('input');
  var value = 5;
  console.log(isXHR);
  try {
    var wdt = Number(inputNodes[0].value);
    var hgt = Number(inputNodes[1].value);
    if (hgt<100 || hgt>300 || wdt<100 || wdt>300) throw 'bad range';
    if (isXHR)
      useRequestXHR(`https://picsum.photos/${wdt}/${hgt}`, displayResult);
    else
      useFetch(`https://picsum.photos/${wdt}/${hgt}`, displayResult);
  }
  catch (e) {
    // инструкции для обработки ошибок
    alert("Value must be between 100 and 300, try again");
    console.log(e);
  }
  
}

// Вешаем обработчик на кнопку для запроса

btnNodes[0].addEventListener('click', () => { getData(true);})
btnNodes[1].addEventListener('click', () => { getData(false);})