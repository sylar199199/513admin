import Vue from 'vue'
import {
  RadioGroup,
  ELForm,
  Radio,
  Row,
  Col,
  Message,
  Input,
  Select,
  Option,
  OptionGroup,
  DatePicker,
  Button,
  ButtonGroup,
  Form,
  FormItem,
  Image,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Pagination,
  Dialog,
  Tree,
  Switch,
  Cascader,
  MessageBox,
  Upload,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
} from 'element-ui'

Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(DatePicker)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Image)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tree)
Vue.use(Switch)
Vue.use(Cascader)
Vue.use(Upload)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

export const $message = Vue.prototype.$message
