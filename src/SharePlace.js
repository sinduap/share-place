import { Modal } from './UI/Modal';
import { Map } from './UI/Map';

class PlaceFinder {
  constructor() {
    const addressFrom = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');

    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
    addressFrom.addEventListener('submit', this.findAddressHandler);
  }

  selectPlace(coordinates) {
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        'Your browser does not support location feature. Please enter your location manually'
      );
      return;
    }

    const modal = new Modal(
      'loading-modal-content',
      'Loading location, please wait..'
    );
    modal.show();

    navigator.geolocation.getCurrentPosition(
      successResult => {
        modal.hide();
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        this.selectPlace(coordinates);
      },
      error => {
        modal.hide();
        alert('Cound not locate you unfortunatelly. Please enter manually');
      }
    );
  }

  findAddressHandler() {}
}

new PlaceFinder();
