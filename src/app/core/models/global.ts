export interface DataTableApp {
  partitionKey: string;
  rowKey: string;
  danaIdConversation: string;
  name: string;
}

export interface IDialogApp {
  partitionKey: string;
  rowKey: string;
  timestamp: string;
  title: string;
  data: any;
  detail: any;
}
