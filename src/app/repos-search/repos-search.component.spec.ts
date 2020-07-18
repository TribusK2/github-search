import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposSearchComponent } from './repos-search.component';

describe('ReposSearchComponent', () => {
  let component: ReposSearchComponent;
  let fixture: ComponentFixture<ReposSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReposSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReposSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
