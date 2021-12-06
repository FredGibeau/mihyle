import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'mihyle-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public parsedText: string | undefined;

  constructor() {
    this.parsedText = undefined;
  }

  uploadFile = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement;

    if (element.files && element.files[0]) {
      // TODO Move that in a service
      const enhanceFormData: FormData = new FormData();
      enhanceFormData.append('image', element.files[0], element.files[0].name);
      axios
        .post('http://localhost:3334/api/enhance', enhanceFormData, {
          params: {
            grayscale: true,
            threshold: 216,
            left: 220,
            top: 135,
            width: 575,
            height: 1145,
            invert: true,
            toBuffer: true,
          },
        })
        .then((response) => {
          const ocrSearchParams: FormData = new URLSearchParams();
          ocrSearchParams.append('base64', response.data);
          axios
            .post('http://localhost:3333/api/ocrFromBase64', ocrSearchParams, {
              params: {
                language: 'fra',
              },
            })
            .then((response) => {
              this.parsedText = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
}
