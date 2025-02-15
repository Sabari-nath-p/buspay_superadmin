import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../../core/guards/authentication/authentication.service';
import { AvatarService } from '../../shared/services/avatar.service';

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
    private authService: AuthenticationService,
    private avatarsService: AvatarService
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
    this.userProfileImage = this.avatarsService.getAvatarWithInitials(
      this.userName
    );
  }
}
