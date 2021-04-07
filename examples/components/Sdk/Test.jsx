import React from 'react';
import TitleBar from '../../../src/components/TitleBar';
import {render as amis_render_schema} from '../../../src/index';

export default class SdkTest extends React.Component {
  state = {
    data: {
      name: '',
      id: 1,
      email: ''
    }
  };

  renderForm() {
    const form_schema = {
      title: 'form title',
      type: 'form',
      mode:'normal',
      controls: [
        {type: 'text', name: 'name', label: 'Name'},
        {type: 'text', name: 'id', label: 'Id'},
        {type: 'email', name: 'email', label: 'Email'},
        {type: 'static', label: '最后更新时间', name: 'lastModified'}
      ]
    };
    const props = {
      data: this.state.data,
      onFailed: (reason, errors) => {
        console.log('onFailed Submit Failed', errors, '\n', reason);
      },
      onSubmit: values => {
        console.log('onSubmit', values);
      },
      onChange: (values, diff) => {
        debugger;
        this.setState({
          data: {
            ...values,
            lastModified: new Date()
          }
        });

        console.log('Diff', diff);
      }
    };
    return amis_render_schema(form_schema, props);
  }

  handleClick = () => {
    this.setState({
      data: {
        name: 'Amis Renderer',
        id: Math.round(Math.random() * 1000),
        email: 'xxx@xxx.com'
      }
    });
  };

  render() {
    return (
      <div className="schema-wrapper">
        <TitleBar title="API 调用 集成在你的 React 应用中" />
        <div className="wrapper">
          {this.renderForm()}

          <button onClick={this.handleClick}>随机修改</button>

          <h3>当前值</h3>
          <pre>
            <code>{JSON.stringify(this.state.data, null, 2)}</code>
          </pre>
        </div>
      </div>
    );
  }
}
