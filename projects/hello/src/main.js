const ipAddresseApiUrl = "http://ip-api.com/json/";
const helloTranslationApiUrl = {
  baseUrl: "http://fourtonfish.com/hellosalut/?ip=",
  proxy: "https://cors-anywhere.herokuapp.com/",
  ipaddress: "",
  getUrl() {
    return this.proxy + this.baseUrl + this.ipaddress;
  },
};

const sayHello = function (
  htmlViewElement,
  ipAddresseApiUrl,
  helloTranslationApiUrl
) {
  let locationInfo = new XMLHttpRequest();
  let helloTranslation = new XMLHttpRequest();
  console.log("Asking user ip adresse to ", ipAddresseApiUrl);
  locationInfo.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.responseText);
      if (response.status === "success") {
        if (helloTranslation && helloTranslation.readyState == 0) {
          helloTranslationApiUrl.ipaddress = response.query;
          helloTranslation.open("GET", helloTranslationApiUrl.getUrl(), true);
          helloTranslation.send();
        }
      }
    }
  };
  helloTranslation.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      htmlViewElement.innerHTML = response.hello;
      console.log(response.code);
    }
  };
  locationInfo.open("GET", ipAddresseApiUrl, true);
  locationInfo.send();
};

sayHello(
  document.getElementById("helloFrame"),
  ipAddresseApiUrl,
  helloTranslationApiUrl
);
