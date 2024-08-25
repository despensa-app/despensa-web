export interface DataSidebar {
  id: string;
  path?: string;
  text: string;
  click?: () => void;
  hide?: boolean;
}
