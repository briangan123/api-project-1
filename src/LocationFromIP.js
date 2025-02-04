/* eslint-disable lit-a11y/anchor-is-valid */
// dependencies / things imported
import { LitElement, html, css } from 'lit';
import { UserIP } from './UserIP.js';

export class LocationFromIP extends LitElement {
  static get tag() {
    return 'location-from-ip';
  }

  constructor() {
    super();
    this.UserIpInstance = new UserIP();
    this.locationEndpoint = 'https://freegeoip.app/json/';
    this.long = null;
    this.lat = null;
  }

  static get properties() {
    return {
      long: {type: Number, reflect: true},
      lat: {type: Number}, reflect: true,
    };
  }

  // not sure what this function does
  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
    this.getGEOIPData();
  }

  // I'm guessing this function calls the API to set the long and lat of the map
  async getGEOIPData() {
    const IPClass = new UserIP();
    const userIPData = await IPClass.updateUserIP();
    return fetch(this.locationEndpoint + userIPData.ip)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        return false;
      })
      .then(data => {
        console.log(data);
        this.lat = data.latitude;
        this.long = data.longitude;
        return data;
      });
  }

  // styling for the iframe
  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
        iframe {
          height: 500px;
          width: 500px;
        }
      `,
    ];
  }

  render() {
    // this function runs every time a properties() declared variable changes
    // this means you can make new variables and then bind them this way if you like
  
    const url = `https://maps.google.com/maps?q=${this.lat},${this.long}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    // const url1 = `https://www.google.com/maps/${this.lat},${this.long},14z`;
    return html`
    <iframe title="Where you are" src="${url}"></iframe>
    <ul>
      <a
          href = "https://www.google.com/maps/@${this.lat},${this.long},14z"> Open in Google Maps
       </a>
    </ul> `
    ;
  }



}

customElements.define(LocationFromIP.tag, LocationFromIP);
