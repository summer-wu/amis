import {ActionSchema} from '../../../types/amis/lib/renderers/Action';

const btn0: ActionSchema = {type: 'button', label: 'btn0'};
const btn1: ActionSchema | any = {type: 'action', label: 'btn1'};
const test_page_schema2 = {
  type: 'page',
  title: 'page_aa',
  body: [btn0, btn1],
  data: {
    age: 302
  }
};
export {test_page_schema2};
