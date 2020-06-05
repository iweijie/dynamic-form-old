import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createForm, formShape } from 'rc-form';
import { Toast, TextareaItem, Modal, Button, Icon, List } from 'antd-mobile';
// import iconChecked from '@/assets/images/icon_checked.svg';
import iconBin from './icon_bin.svg';
import styles from './style.less';
import apis from '../../util/apis';
const alert = Modal.alert;
const noop = () => {};
// 弹出框滚动时 阻止 外层容器滚动
const handleStopRolling = event => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
};

const getModalTitle = (close = noop) => (
    <div className="dynamic-form-modal-title">
        <span className="close-icon" onClick={close}></span>
        <p>常用语列表</p>
        {/* <span className="confirm-icon" onClick={confirm}></span> */}
    </div>
);

class CommonComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editFlag: false,
            editText: '',
            visible: false,
            list: [],
        };
    }
    componentDidMount() {
        const { presetKey, show } = this.props;
        if (show) {
            this.getList(presetKey);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.show === this.props.show) {
            return;
        }
        if (this.props.show) {
            this.getList();
        }
    }

    componentWillUnmount() {}

    render() {
        const { show, onCancel } = this.props;
        const { getFieldProps } = this.props.form;
        const { list } = this.state;
        return (
            <Modal
                popup
                maskClosable={true}
                animationType="slide-up"
                onClose={onCancel}
                className={`${styles['common-comment-modal']} dynamic-form-modal take-leave-modal`}
                visible={show}
            >
                <List
                    renderHeader={() => getModalTitle(onCancel)}
                    onScroll={handleStopRolling}
                    className="popup-list"
                >
                    <div className={styles['common-comment-modal-list-wrap']}>
                        {/* {getModalTitle(onCancel)} */}
                        <div className={styles['list-wrap']}>
                            <ul className={styles['common-comment-modal-list']}>
                                {list.map(item => (
                                    <li
                                        className={styles['item']}
                                        key={item.id}
                                        data-id={item.id}
                                        onClick={this.handleSelectClick}
                                    >
                                        {/* {item.checked && <img src={iconChecked} className={styles['item-check']} />} */}
                                        <div className={styles['item-text']}>
                                            {item.presetText}
                                        </div>
                                        {item.userId !== 0 ? (
                                            <img
                                                src={iconBin}
                                                className={styles['item-btn']}
                                                data-id={item.id}
                                                onClick={this.handleDeleteClick}
                                            />
                                        ) : null}
                                    </li>
                                ))}
                                {!list.length && (
                                    <div className="no-select">当前无选项</div>
                                )}
                            </ul>
                        </div>
                        <div className={styles['btn-box']}>
                            <button
                                className={styles['btn']}
                                type="button"
                                onClick={this.toggle}
                            >
                                新增
                            </button>
                        </div>
                    </div>
                </List>
                <Modal
                    className={styles['modal']}
                    visible={this.state.visible}
                    maskClosable={true}
                    transparent
                    onClose={this.toggle}
                >
                    <div>
                        <div className={styles['modal-title']}>
                            新增常用语
                            <Icon
                                onClick={this.toggle}
                                type="cross"
                                size="sm"
                                color="#D8D8D8"
                            ></Icon>
                        </div>
                        <TextareaItem
                            rows={5}
                            placeholder={'请输入'}
                            {...getFieldProps('add', {})}
                        ></TextareaItem>
                        <footer className={styles['footer']}>
                            <Button onClick={this.onConfirm}>确定</Button>
                        </footer>
                    </div>
                </Modal>
            </Modal>
        );
    }

    toggle = () => {
        const { visible } = this.state;
        this.setState({ visible: !visible });
    };

    onConfirm = () => {
        const { presetKey, formFieldName, fieldKey } = this.props;
        const { getFieldValue, setFieldsValue } = this.props.form;
        const text = getFieldValue('add');
        if (!text || !text.trim()) return Toast.fail('新增常用语不能为空！', 2);
        const key = `${formFieldName}-${fieldKey}`;
        Toast.loading('加载中...', 0);
        return apis
            .addPreSetInfo({
                presetKey,
                presetName: key,
                presetRemark: key,
                presetText: text,
            })
            .then(data => {
                if (data && data.code === 0) {
                    Toast.success('新增成功', 2);
                    setFieldsValue({
                        add: undefined,
                    });
                    this.toggle();
                    this.getList('refresh');
                } else {
                    Toast.fail(data.msg || '新增失败', 2);
                }
            })
            .catch(err => {
                Toast.fail(err.msg || err.message || '新增失败', 2);
            });
    };

    getList = refresh => {
        const { presetKey } = this.props;
        const { list } = this.state;
        if (!refresh && list.length) return;
        Toast.loading('加载中...', 0);
        apis.getDetailByKeys({ presetKey })
            .then(data => {
                if (!data || data.code !== 0) {
                    Toast.fail(data.msg || '常用语列表获取错误', 2);
                    return;
                }
                Toast.hide();
                this.setState({
                    list: data.data || [],
                });
            })
            .catch(err => {
                Toast.fail(err.msg || err.message || '常用语列表获取错误', 2);
            });
    };

    // 删除常用语
    handleDeleteClick = e => {
        // 阻止冒泡 避免触发父元素勾选事件
        e.stopPropagation();
        const id = +e.currentTarget.getAttribute('data-id');
        alert('确认删除？', '', [
            { text: '取消', style: 'default' },
            {
                text: '确认',
                onPress: () => {
                    Toast.loading('加载中...', 0);
                    apis.deletePreSetInfo({ id })
                        .then(data => {
                            if (data && data.code === 0) {
                                // 使用id调用删除api
                                Toast.success('删除成功', 2);
                                const temp = this.state.list.filter(
                                    item => item.id !== id,
                                );
                                this.setState({ list: temp });
                                return;
                            }
                            Toast.fail(data.msg || '删除失败', 2);
                        })
                        .catch(err => {
                            Toast.fail(err.msg || err.message || '删除失败', 2);
                        });
                },
            },
        ]);
    };

    // 勾选常用语
    handleSelectClick = e => {
        const { onConfirm, onCancel } = this.props;
        const { list } = this.state;
        const id = +e.currentTarget.getAttribute('data-id');
        const findIndex = list.findIndex(item => item.id === id);
        if (findIndex === -1) return;
        onConfirm(list[findIndex].presetText);
        onCancel();
    };

    // 点击编辑按钮回调
    handleEditClick = e => {
        // 阻止冒泡 避免触发父元素勾选事件
        e.stopPropagation();

        this.handleEditToggle();
        this.editingId = Number(e.currentTarget.getAttribute('data-id'));

        const editItem = this.state.list.find(
            item => item.id === this.editingId,
        );
        if (editItem && editItem.text) {
            this.setState({ editText: editItem.text });
        }
    };
}

CommonComment.propTypes = {
    form: formShape,
    show: PropTypes.bool,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    presetKey: PropTypes.string,
    formFieldName: PropTypes.string,
    fieldKey: PropTypes.string,
};

export default createForm()(CommonComment);
