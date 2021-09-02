export function weather(root) {
  const weatherWidget = document.createElement('aside');
  weatherWidget.classList.add('weather-container');
  weatherWidget.innerHTML = `
    <iframe src='https://www.meteoblue.com/en/weather/widget/three?geoloc=detect&nocurrent=0&noforecast=0&days=4&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&layout=image' 
    frameborder='0' scrolling='NO' allowtransparency='true' sandbox='allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox' 
    class='widget'></iframe>
  `;
  root.appendChild(weatherWidget);
  return root;
}
