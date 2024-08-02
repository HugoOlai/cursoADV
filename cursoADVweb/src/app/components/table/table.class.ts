import { Type } from '@angular/core';

export class HeaderTable {
  description: string = "";
  key: string = "";
  key2?: string;
  classHead?:string;
  class?: string;
  style?: string;
  order: boolean = true;
  sortField?: string;
  desc?: boolean;
  hasFunc?: boolean;
  hasTooltip?: boolean;
  hasTooltipDy?: boolean;
  tooltip?: string;
  placement?: string;
  handle?: Function;
  selectAll?: boolean;
  select?: boolean;
  varTooltip?: string;
  trFunction?: boolean;
}

export class ActionsTable {
  description: string = "";
  nomeMobile?: Function;
  isButton: boolean = true;
  show?: Function;
  icon?: string;
  class?: string;
  style?: string;
  classIcon?: string;
  tooltip?: string;
  placement?: string;
  handle?: Function;
  value?: Function;
  tooltipD?: Function;
  descriptionD?: Function;
  constructor() {
    this.show = (item: any) => { return true; };
  }
}

export class OptionsTable {
  textAction?: string;
  class?: string;
  semTopo?: boolean;
  captionShow?: boolean;
  subirColuna?: boolean
  caption?: string;
  searchShow?: boolean;
  action?: boolean;
  lineMode?: boolean;
  lineSize?: boolean;
  placeholder?: string;
  pagination?: boolean;
  pagesSize?: any[];
  descriptionPageSize?: string;
  empty?: string;
  modeCard?: boolean;
  component?: Type<any>;
  pageSize: number = 5;
  select?: boolean;
  selectAll?: boolean;
  trFunction?: boolean;
  trTooltip?: string;
  trClass?: Function;
  handle?: Function;
  handleClass?: Function;
  tdKeyList?: Array<string>;
  index?: boolean;
}
