import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollSelectorComponent } from './scroll-selector.component';

describe('ScrollSelectorComponent', () => {
  let component: ScrollSelectorComponent;
  let fixture: ComponentFixture<ScrollSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollSelectorComponent]
    });
    fixture = TestBed.createComponent(ScrollSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
