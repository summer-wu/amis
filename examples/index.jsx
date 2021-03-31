/**
 * @file entry of this example.
 * @author liaoxuezhi@cloud.com
 */
import './polyfills/index';
import React from 'react';
import {render} from 'react-dom';
import {AppEntry} from './components/App';

export function bootstrap(mountTo, initalState) {
  render(<AppEntry />, mountTo);
}
