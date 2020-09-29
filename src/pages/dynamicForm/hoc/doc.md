# 容器组件 OR 高阶组件

## Monitor

1. 用于注入 $trigger $listen 方法， 用于组件之间的通信

- $trigger ：触发事件函数，用于当前组件数据变化时通知其他关联的组件
- $listen  ：用于监听其他组件变化时分发的通知

## Trigger

1. 用于监听组件触发事件的函数包装， 利于 Monitor 的监听
