import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-external-link-button',
  templateUrl: './external-link-button.component.html',
  styleUrls: ['./external-link-button.component.scss']
})
export class ExternalLinkButtonComponent implements OnInit, AfterViewInit {

  @Input() imageUrl: string = '';
  @Input() size: string = '128px';
  @Input() externalUrl: string = '';

  @ViewChild('externalLinkButton', { read: ElementRef }) externalLinkButton!: ElementRef;

  constructor(
    private renderer2: Renderer2
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.renderer2.setStyle(this.externalLinkButton.nativeElement, 'width', this.size);
    this.renderer2.setStyle(this.externalLinkButton.nativeElement, 'height', this.size);
  }

  gotoExternalLink = () => {
    window.open(this.externalUrl, "_blank");
  }

}
