import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeResultComponent } from './code-result.component';

describe('CodeResultComponent', () => {
  let component: CodeResultComponent;
  let fixture: ComponentFixture<CodeResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
