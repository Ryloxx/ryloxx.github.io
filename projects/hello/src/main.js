const ipAddresseApiUrl = 'https://ipapi.co/json';
const helloTranslationApiUrl = {
  baseUrl: 'https://fourtonfish.com/hellosalut',
  proxy: 'https://cors-anywhere.herokuapp.com',
  ipaddress: '',
  getUrl() {
    return this.proxy + this.baseUrl + this.ipaddress;
  },
};

const sayHello = function (
  htmlViewElement,
  ipAddresseApiUrl,
  helloTranslationApiUrl,
) {
  fetch(`${ipAddresseApiUrl}`)
    .then((res) => res.json())
    .then(({ ip }) =>
      fetch(
        `${helloTranslationApiUrl.proxy}/${helloTranslationApiUrl.baseUrl}?ip=${ip}`,
      ),
    )
    .then((res) => res.json())
    .then(({ hello }) => {
      htmlViewElement.innerText = hello;
    })
    .catch(() => {
      htmlViewElement.innerText = 'Unable to say hello in your language 😿';
    });
};

sayHello(
  document.getElementById('helloFrame'),
  ipAddresseApiUrl,
  helloTranslationApiUrl,
);
