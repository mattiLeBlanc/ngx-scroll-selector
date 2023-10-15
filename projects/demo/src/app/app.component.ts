import { Component } from '@angular/core';
import { SelectedItem } from 'ngx-scroll-selector';

type CurrentAccounts = {
  id: string;
  name: string;
  balance: number;
  dateAvailable?: string;

}
type AvailableAccounts = {
  id: string;
  name: string;
  rate?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  currentAccounts: CurrentAccounts[] = [
    {
      id: 'account-1',
      name: 'Account 1',
      balance: 10000,
    },
    {
      id: 'account-2',
      name: 'Account 2',
      balance: 20000,
      dateAvailable: '2023-11-13'
    },
    {
      id: 'account-3',
      name: 'Account 3',
      balance: 130000,
      dateAvailable: '2023-11-13'
    },
  ];
  originalAvailableAccounts: AvailableAccounts[] = [
    {
      id: 'Another account',
      name: 'Another account',
    },
    {
      id: 'account-1',
      name: 'Account 1',
    },
    {
      id: 'account-2',
      name: 'Account 2',
    },
    {
      id: 'account-3',
      name: 'Account 3',
    },

  ];
  availableAccounts = this.originalAvailableAccounts;

  handleSelected(value: SelectedItem) {
    if (value.column === 'left') {
      this.availableAccounts = this.originalAvailableAccounts.filter(account => account.id !== value.id )
      console.log('Left column;', value);
    }
    if (value.column === 'right') {
      console.log('Right column;', value);
    }

  }
}
