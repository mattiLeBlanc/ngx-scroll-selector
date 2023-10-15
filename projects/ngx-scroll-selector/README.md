# NgxScrollSelector

The Angular component allows you to select items from a scrolling list. This would be mainly used when you
want to select an source and destination, for example transfering from one account to another.

The `ngx-scroll-selector-column` can have a `left` and `right` attribute to mark its position.
You can preselect a `ngx-scroll-selector-item` by providing `[select]='number'` (start counting from 0).
To capture the selected item, you can setup a handler to listen to `(selected)`.

The **id** is mandatory in the `ngx-scroll-selector-item`, otherwise we can't exclude the selected account from the second column, or provide the id of the selected column.

## Transfer between accounts example

Example usage with 2 columns
```
<div class="container">
  <ngx-scroll-selector>
    <!--
    Set 'left' to make it the left column. [select] is optional to preselect a list item (start from 0).
    (selected) allows you to capture the selected item
  -->
    <ngx-scroll-selector-column left [select]="1" (selected)="handleSelected($event)">
      <ngx-scroll-selector-column-title>From</ngx-scroll-selector-column-title>
      <ngx-scroll-selector-item *ngFor="let account of currentAccounts" [id]="account.id">
        <div fxLayout="column" fxLayoutAlign="center center">
          <div class="title">{{ account.name }}</div>
          <div class="title">{{ account.balance | currency }}</div>
          <div class="sub-title" *ngIf="account.dateAvailable">Date available: {{ account.dateAvailable | date:
            'shortDate' }}</div>
        </div>
      </ngx-scroll-selector-item>
    </ngx-scroll-selector-column>

    <!-- Replace content with mat-icon if you want -->
    <ngx-scroll-selector-icon>=></ngx-scroll-selector-icon>

    <!--
    Set 'right' to make it the right column. [select] is optional to preselect a list item (start from 0).
    (selected) allows you to capture the selected item
  -->
    <ngx-scroll-selector-column right [select]="0" (selected)="handleSelected($event)">
      <ngx-scroll-selector-column-title>To</ngx-scroll-selector-column-title>
      <ngx-scroll-selector-item *ngFor="let account of availableAccounts" [id]="account.id">
        <div fxLayout="column" fxLayoutAlign="center center">
          <div class="title">{{ account.name }}</div>
          <div class="title" *ngIf="account.rate">{{ account.rate }}</div>
        </div>
      </ngx-scroll-selector-item>

    </ngx-scroll-selector-column>


  </ngx-scroll-selector>

</div>
```