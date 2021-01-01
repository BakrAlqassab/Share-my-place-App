import {Modal} from "./UI/Modal";
class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector("form");
    const locateUserBtn = document.getElementById("locate-btn");
    locateUserBtn.addEventListener("click", this.locateUserHandler);
    addressForm.addEventListener("click", this.findAddressHandler);
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        "location feature is not available in your browser - please use a more model browser"
      );
      return;
    }

    const modal = new Modal('loading-modal-content','loading location - please wait!');
    modal.show();
    navigator.geolocation.getCurrentPosition(
      (successResult) => {
          modal.hide();
        const coordinates = {
          lat: successResult.coords.latitude, // Math.random() * 50

          lng: successResult.coords.longitude,
        };
        console.log(coordinates);
      },
      (error) => {
           modal.hide();
        alert(
          "code not locate you unfortunately. Please eneter an address manually!."
        );
      }
    );
  }

  findAddressHandler() {}
}

const placeFinder = new PlaceFinder();
