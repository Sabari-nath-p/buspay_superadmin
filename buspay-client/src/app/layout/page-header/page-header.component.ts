import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../../core/guards/authentication/authentication.service';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  title: string = 'BusPay';
  subHeading: string = "Let's book your seat";
  userName: string = '';
  designation: string = '';
  width: string = '200px';
  userProfileImage: any;

  constructor(
    private sanitizer: DomSanitizer,
    // private headerService: HeaderService,
    // private masterService: MasterDataService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // this.headerService.headerTitle$subscribe((title: string) => {
    //   this.title = title;
    // });

    this.setUserDetails();
    this.getProfilePicture();
  }

  setUserDetails(): void {
    // const masterData = this.masterService.getMasterData();
    // if(masterData){
    //   this.userName = masterData['firstName']+' '+masterData['lastName']
    //   this.designation = masterData['designation']
    // }
    this.userName = 'BusPay User';
    this.designation = 'Global Admin';
  }

  getProfilePicture(): void {
    // Add API for getting profile picture.
    // if no profile picture is available
    this.userProfileImage = this.getAvatarWithInitials();
  }

  getAvatarWithInitials() {
    let name = this.userName.split(' ');
    let canvas = document.createElement('canvas');
    canvas.style.display = 'none';
    canvas.width = 32;
    canvas.height = 32;
    document.body.appendChild(canvas);
    let context = canvas.getContext('2d');
    if (!context) {
      return false;
    }
    context.fillStyle = '#22C55E';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = '16px Arial';
    context.fillStyle = '#fff';

    let first, last;
    if (name && name.length > 0 && name[0] != '') {
      first = name[0].charAt(0);
      last =
        name && name.length > 1 && name[1] != '' ? name[1].charAt(0) : null;

      if (last) {
        let initials = first + last;
        context.fillText(initials.toUpperCase(), 4, 22);
      } else {
        let initials = first;
        context.fillText(initials.toUpperCase(), 10, 22);
      }
      let data = canvas.toDataURL();
      document.body.removeChild(canvas);
      return data;
    } else {
      return false;
    }
  }
}
