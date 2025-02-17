import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  constructor() {}

  getAvatarWithInitials(userName: string) {
    let name = userName.split(' ');
    let canvas = document.createElement('canvas');
    canvas.style.display = 'none';
    canvas.width = 32;
    canvas.height = 32;
    document.body.appendChild(canvas);
    let context = canvas.getContext('2d');
    if (!context) {
      return false;
    }
    context.fillStyle = '#0F67B1';
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
