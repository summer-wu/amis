// 对应于 amis/examples/mod.js
declare namespace amis {
  function require(module_id): any;
  function define(module_id: string, factory: Function): any;
}
