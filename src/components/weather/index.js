export function weather(root) {
  const weatherWidget = document.createElement('div');
  weatherWidget.classList.add('weather-container');
  weatherWidget.innerHTML = `
    <nav>
      <iframe src='https://www.meteoblue.com/en/weather/widget/three?geoloc=detect&nocurrent=0&noforecast=0&days=4&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&layout=image' 
      frameborder='0' scrolling='NO' allowtransparency='true' sandbox='allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox' 
      class='widget'></iframe>
    </nav>
    <a href= 'https://www.meteoblue.com/en/weather/week/index?utm_source=weather_widget&utm_medium=linkus&utm_content=three&utm_campaign=Weather%2BWidget'
    target='_blank'>meteoblue</a>
  `;
  root.appendChild(weatherWidget);
  return root;
}
