export interface IconActionModal {
  left?: string;
  right?: string;
}

export interface TabActionModal {
  icon: string;
  title: string;
  disabled?: boolean;
  default?: boolean;
}

export interface ContentActionModal {
  icon: IconActionModal;
  title: string;
  disabled?: boolean;
  clickButton?: () => void;
  classButton?: string;
  dataDismiss?: boolean;
}

export interface ActionModal {
  id: string;
  tab: TabActionModal;
  content: ContentActionModal[];
}
