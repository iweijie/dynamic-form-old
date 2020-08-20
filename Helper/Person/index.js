import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * 人物组件
 * @description 这是关于人物组件的描述内容
 * @class Persion
 * @extends {Component}
 */
class Persion extends Component {
    /**
     * 处理睡觉的回调
     * @param {string} name 姓名
     */
    handleSleep = name => {
        console.log(`${name} 开始睡觉`);
        this.props.onSleep();
    };
    render() {
        const { name, hobbies } = this.props;
        return (
            <div onClick={this.handleSleep.bind(this, name)}>
                <p>姓名：{name}</p>
                <p>爱好：{hobbies.join(',')}</p>
            </div>
        );
    }
}
Persion.propTypes = {
    /**
     * @describe 姓名
     * @category data
     * @extend sdfkl水电费快乐sdfkl
     */
    name: PropTypes.string.isRequired,
    /**
     * 爱好
     * @test 1
     */
    hobbies: PropTypes.array,
    /**
     * 睡觉的事件回调
     */
    onSleep: PropTypes.func,
};
Persion.defaultProps = {
    name: '张三',
    hobbies: ['睡觉', '打王者'],
};
export default Persion;
