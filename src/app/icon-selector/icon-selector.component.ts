import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { UserAccountService } from '../user-acc.service';

@Component({
  selector: 'app-icon-selector',
  templateUrl: './icon-selector.component.html',
  styleUrls: ['./icon-selector.component.css'],
})
export class IconSelectorComponent implements OnInit {
  defaultIcon!: string;
  showIconSelection = false;
  availableIcons: string[] | undefined;

  constructor(public userServ: UserAccountService, private er: ElementRef) {}

  @HostListener('document:click', ['$event'])
  handleClick(event: Event): void {
    if (!this.er.nativeElement.contains(event.target)) {
      this.showIconSelection = false;
    }
  }
  
  ngOnInit(): void {
    this.defaultIcon = 'assets/user_icons/default.png';
    this.availableIcons = this.userServ.getAvailableIcons();
  }

  toggleIconSelection(): void {
    this.updateAvailableIcons();
    this.showIconSelection = !this.showIconSelection;
  }

  selectIcon(icon: string): void {
    this.userServ.selectedIcon = icon;
    this.showIconSelection = false;
  }

  getSelectedIcon(): string {
    return this.userServ.getSelectedIcon();
  }

  updateAvailableIcons(): void {
    this.availableIcons = this.userServ.getAvailableIcons().filter(icon => icon !== this.userServ.selectedIcon);

    if (!this.userServ.selectedIcon) {
      this.availableIcons = this.availableIcons.filter(icon => icon !== this.defaultIcon);
    }
  }
}