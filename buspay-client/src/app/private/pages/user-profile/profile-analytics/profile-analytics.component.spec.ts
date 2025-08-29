import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAnalyticsComponent } from './profile-analytics.component';

describe('ProfileAnalyticsComponent', () => {
  let component: ProfileAnalyticsComponent;
  let fixture: ComponentFixture<ProfileAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
