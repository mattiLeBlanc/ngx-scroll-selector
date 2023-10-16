import { AfterViewInit, Component, EventEmitter, HostBinding, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { Subject, fromEvent } from 'rxjs';


export interface SelectedItem {
  id: string;
  column: string;
}

@Component({
  selector: 'ngx-scroll-selector-item',
  template: `<ng-content></ng-content>`,
})
export class ScrollSelectorItemComponent {
  @Input() id!: string;
  @HostBinding('id') get getId() {
    return this.id;
  }
  @HostListener('click', ['$event']) scrollIntoView(event: Event & { target: HTMLElement }) {
    event.target.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  }

  // // Possible to detect changes to ng-content
  // ngOnChanges(changes: SimpleChanges): void {
  //   const change = changes as any;
  //   console.log(changes);
  //   console.log('>>', change.id.currentValue, this.parent.columnPosition);
  // }
}


/**
 * ScrollSelector Column Component
 */
@Component({
  selector: 'ngx-scroll-selector-column-title',
  template: `
      <ng-content></ng-content>
  `,
})
export class ScrollSelectorColummTitleComponent { }

/**
 * ScrollSelector Icon Component
 */
@Component({
  selector: 'ngx-scroll-selector-icon',
  template: `
      <ng-content></ng-content>
  `,
})
export class ScrollSelectorIconComponent implements OnInit {
  @HostBinding('style.top') get topPosition() {
    return this._topPosition;
  }
  private _topPosition!: string;

  ngOnInit(): void {
    const component = document.querySelector('ngx-scroll-selector') as HTMLElement;
    const titleBar = component.querySelector('ngx-scroll-selector-column-title') as HTMLElement;
    const height = component.offsetHeight - titleBar.offsetHeight;
    this._topPosition = `${height / 2 + titleBar.offsetHeight}px`;
  }
}

/**
 * ScrollSelector Column Component
 */
@Component({
  selector: 'ngx-scroll-selector-column',
  template: `
    <ng-content select="ngx-scroll-selector-column-title"></ng-content>
    <div class="wrapper">
      <div class="list">
        <div class="visor" [ngStyle]="{ 'background-color': this.visorColor}"></div>
        <div class="spacer"></div>
        <ng-content></ng-content>
        <div class="spacer"></div>
      </div>
    </div>
  `,
})
export class ScrollSelectorColummComponent implements OnInit, OnDestroy, AfterViewInit {


  @HostBinding('class') get columnPosition() {
    return this._columnPosition;
  }
  @Output() selected = new EventEmitter<SelectedItem>();
  @Input() select!: number;
  @Input() visorColor!: string;
  @Input() left!: string;
  @Input() right!: string;
  private _columnPosition!: string;
  private onDestroy = new Subject();

  ngOnInit(): void {
    if (this.left !== undefined) {
      this._columnPosition = 'left';
    } else if (this.right !== undefined) {
      this._columnPosition = 'right';
    }
  }

  ngAfterViewInit(): void {
    this.setupScrollListener(this._columnPosition, this.select);
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  setupScrollListener(target: string, selected = 0) {
    const scrollSelectorElement = document.querySelector('ngx-scroll-selector') as HTMLElement;
    const column = scrollSelectorElement.querySelector(`ngx-scroll-selector-column[${target}]`) as HTMLElement;
    const wrapper = column.querySelector('.wrapper') as HTMLElement;
    const list = column.querySelector('.list') as HTMLElement;
    let items = list.querySelectorAll('ngx-scroll-selector-item');

    const selectedItem = items[selected];
    selectedItem.scrollIntoView({
      behavior: 'instant',
      block: 'center',
      inline: 'center'
    });
    selectedItem.classList.add('active');

    let parentOffset = getParentOffset();

    fromEvent(list, 'scroll')
      .pipe(
        takeUntil(this.onDestroy),
        debounceTime(50),
        tap(() => {
          // get parent ofset again in case something changed AfterViewInit
          parentOffset = getParentOffset();
          // refresh items because the list may have been repainted
          items = list.querySelectorAll('ngx-scroll-selector-item');
          items.forEach(item => {
            const position = item.getBoundingClientRect();
            const yPos = position.y - parentOffset;
            // console.log(target, item.id, position);
            // console.log(yPos);

            // give a bit of margin
            if (yPos > 95 && yPos < 105) {
              item.classList.add('active');
              this.itemSelected(item.id)
            } else {
              item.classList.remove('active');
            }
          })
        })
      )
      .subscribe();

      function getParentOffset() {
        // correct for strange 0.5 offset in scroll position
        return scrollSelectorElement.offsetTop + wrapper.offsetTop - 0.5;
      }
  }

  itemSelected(id: string) {
    this.selected.emit({
      id,
      column: this._columnPosition,
    });
  }
}


@Component({
  selector: 'ngx-scroll-selector',
  templateUrl: './scroll-selector.component.html',
  styleUrls: ['./scroll-selector.component.scss']
})
export class ScrollSelectorComponent { }
