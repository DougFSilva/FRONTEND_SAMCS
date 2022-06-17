import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute } from "@angular/router";
import {
  Component,
  ElementRef,
  OnInit,
  VERSION,
  ViewChild,
} from "@angular/core";
import { WebcamImage, WebcamInitError } from "ngx-webcam";
import { Observable, Subject } from "rxjs";
import Cropper from "cropperjs";
import { Location } from "@angular/common";

import { DialogComponent } from "../../dialog/dialog.component";
import { PhotoFORM } from "src/app/models/PhotoFORM";
import { FuncionarioService } from "src/app/services/funcionario.service";

@Component({
  selector: "app-photo-save-funcionario",
  templateUrl: "./photo-save-funcionario.component.html",
  styleUrls: ["./photo-save-funcionario.component.css"],
})
export class PhotoSaveFuncionarioComponent implements OnInit {
  // Web Cam
  webCamWidth;
  webCamHeight;
  allowCameraSwitch = true;
  webcamImage: WebcamImage = null;
  trigger: Subject<void> = new Subject<void>();
  nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  errors: WebcamInitError[] = [];

  // CropperJs
  @ViewChild("image", { static: false })
  public imageElementRef: ElementRef;
  cropper: Cropper;
  imageDestination: string;
  // CropperJs

  mobileMedia = window.matchMedia("(max-width: 1024px)");

  checkMedia(mobileMedia) {
    if (mobileMedia.matches) {
      this.webCamWidth = 600;
      this.webCamHeight = 600;
    } else {
      this.webCamWidth = 600;
      this.webCamHeight = 600;
    }
  }
  id: number = null;
  constructor(
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private location: Location,
    private dialog: MatDialog
  ) {
    this.checkMedia(this.mobileMedia);
    this.mobileMedia.addListener(this.checkMedia);
  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get("id"));
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  triggerSnapshot() {
    this.trigger.next();

    if (this.webcamImage) {
      setTimeout(() => {
        this.intializeCropper();
      }, 300);
    }
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  intializeCropper() {
    this.cropper = new Cropper(this.imageElementRef.nativeElement, {
      zoomable: true,
      scalable: false,
      aspectRatio: 1 / 1.335,
      cropBoxResizable: true,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas({
          width: 200,
          height: 267,
        });
        this.imageDestination = canvas.toDataURL("image/jpg", 1);
      },
    });
  }

  saveCroppedImageDialog() {
    let dialog = this.dialog.open(DialogComponent);
    dialog.afterClosed().subscribe((response) => {
      if (response == "true") {
        this.saveCroppedImage();
      }
        return;
    });
  }

  saveCroppedImage() {
    const photo = new PhotoFORM(this.imageDestination);
    this.funcionarioService.saveImage(photo, this.id).subscribe(
      () => {
        this.toast.success("Foto salva com sucesso", "Save");
        this.location.back();
      },
      (ex) => {
        this.toast.error(ex.error.error, "Error");
      }
    );
  }
}
