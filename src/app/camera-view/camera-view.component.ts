import {Component, ElementRef, Inject, Renderer2, ViewChild} from '@angular/core';
import {DetectedObject} from "@tensorflow-models/coco-ssd";
import {Router} from "@angular/router";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

@Component({
  selector: 'app-camera-view',
  templateUrl: './camera-view.component.html',
  styleUrls: ['./camera-view.component.css']
})
export class CameraViewComponent {

  @ViewChild('cameraFeed') videoElement: ElementRef;
  @ViewChild('canvasElement') canvasElement: ElementRef;

  availableCameras: MediaDeviceInfo[] = [];
  selectedCamera: string | undefined;
  capturedImage: string | null = null;
// Load the pre-trained model
  model: any;
  video;
  private canvas:HTMLCanvasElement;
  public predictions: DetectedObject[];
  private videoObjectMarkers: any[] = [];
  private mediaStream: MediaStream;
  private testCanvas: HTMLCanvasElement;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private router: Router,
              @Inject('TITLE') public tt: string
  ) {
  }

  ngAfterViewInit(): void {
    this.video = this.videoElement.nativeElement;
    this.canvas = this.canvasElement.nativeElement;
    this.canvas.width = 540;
    this.canvas.height = 480;
    this.enumerateCameras()
    this.startCamera()
    this.loadModel()
  }

  enumerateCameras(): void {
    navigator.mediaDevices.enumerateDevices()
      .then((devices: MediaDeviceInfo[]) => {
        this.selectedCamera = devices[1].toString()
        devices.forEach(device => console.log('device label: ', device.kind))
        this.availableCameras = devices.filter(device => device.kind === 'videoinput');
      })
      .catch((error) => {
        console.error('Error enumerating devices:', error);
      });
  }

  onCameraChange(): void {
    if (this.selectedCamera) {
      this.openCamera(this.selectedCamera);
      this.loadModel();
    }
  }

  copyText(text:string) {
    navigator.clipboard.writeText(text).then(result => {
      alert('Copy to clipboard')
    })
  }

  captureImage(): void {
    // Convert the canvas content to a data URL representing the image
    this.capturedImage = this.canvas.toDataURL('image/png');

    // Set canvas dimensions to match the video dimensions


    // const context = this.canvas.getContext('2d');
    // context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

    // Convert the canvas content to a data URL representing the image
    // this.capturedImage = this.canvas.toDataURL('image/png');
  }

  openCamera(deviceId: string): void {
    navigator.mediaDevices.getUserMedia({video: {deviceId}})
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
        this.mediaStream = stream;
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({video: true})
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
        this.mediaStream = stream;
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  }

  async loadModel() {
    console.log('COCO SSD loading')
    this.model = await cocoSsd.load();
    console.log('COCO-SSD Model loaded successfully');
    // Start real-time object detection
    this.videoElement.nativeElement.addEventListener('timeupdate', () => {      //timeupdate
      this.detectObjects();    // Start object detection after the model is loaded
    });
  }

  reverseText(input: string): string {
    // Split the input string into an array of characters
    const characters = input.split('');
    // Reverse the array of characters
    const reversedCharacters = characters.reverse();
    // Join the reversed array of characters back into a string
    const reversedString = reversedCharacters.join('');
    return reversedString;
  }

// Detect objects in each frame
  async detectObjects() {
    // console.log('Detecting in progress...')
    if (!this.model) return;
    this.predictions = await this.model.detect(this.video)
    // Display bounding boxes and object names
    try {
      const ctx = this.canvas.getContext('2d');
      ctx.beginPath();
      ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
      this.predictions.forEach(prediction => {
        console.log('Prediction: ', prediction);
        ctx.rect(prediction.bbox[0], prediction.bbox[1], prediction.bbox[2], prediction.bbox[3]);

        // console.log(prediction.bbox[0], ' : ',prediction.bbox[1], ' : ', prediction.bbox[2], ' : ', prediction.bbox[3])
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'red';
        ctx.fillText(prediction.class, prediction.bbox[0], prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10);
        ctx.stroke();
        // this.captureImage();
        // requestAnimationFrame(this.detectObjects)
      });
    } catch (e) {
      console.log('Error in drawing : ', e)
    }

    const videoOuter = this.elementRef.nativeElement.querySelector('.video-outer')

    try {
      const videoOuter = this.elementRef.nativeElement.querySelector('.video-outer')
      this.videoObjectMarkers.forEach(element => {
        this.renderer.removeChild(videoOuter, element)
      })
    }catch (e) {
      console.log(e)
    }
    this.videoObjectMarkers.splice(0);

    this.predictions.forEach(prediction => {

      const objLabel = this.renderer.createElement('p')
      this.renderer.addClass(objLabel, 'object-label')
      this.renderer.setStyle(objLabel, 'left', prediction.bbox[0] + 'px')
      this.renderer.setStyle(objLabel, 'top', (prediction.bbox[1]-35) + 'px')
      this.renderer.setStyle(objLabel, 'width', prediction.bbox[2] + 'px')
      this.renderer.setStyle(objLabel, 'height', 'auto')
      this.renderer.setProperty(objLabel, 'innerText', `${prediction.class} - confidence level ${Math.round(prediction.score*100)}%`)
      this.renderer.appendChild(videoOuter, objLabel)

      const objFrame = this.renderer.createElement('div')
      this.renderer.addClass(objFrame, 'object-frame')
      this.renderer.setStyle(objFrame, 'left', prediction.bbox[0] + 'px')
      this.renderer.setStyle(objFrame, 'top', prediction.bbox[1] + 'px')
      this.renderer.setStyle(objFrame, 'width', prediction.bbox[2] + 'px')
      this.renderer.setStyle(objFrame, 'height', prediction.bbox[3] + 'px')
      this.renderer.appendChild(videoOuter, objFrame);

      this.videoObjectMarkers.push(objLabel)
      this.videoObjectMarkers.push(objFrame)

    });
  };

  testDraw(){
    let ctx = this.testCanvas.getContext('2d');
    ctx.rect(20,30, 100,100);
    ctx.lineTo(200,200)
    ctx.moveTo(40,30)
    ctx.lineTo(200,200)
  }

  stop() {
    if (this.mediaStream) {
      const tracks = this.mediaStream.getTracks();
      tracks.forEach(stream => stream.stop());
      this.videoElement.nativeElement.srcObject = null;
      this.mediaStream = null;
    }
    try {
      const videoOuter = this.elementRef.nativeElement.querySelector('.video-outer')
      this.videoObjectMarkers.forEach(element => {
        this.renderer.removeChild(videoOuter, element)
      })
    }catch (e) {
      console.log(e)
    }
  }

  navigateToProducts() {
    this.router.navigate(['/products'])
  }
}
