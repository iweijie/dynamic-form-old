import React, { useEffect, useReducer, useCallback } from 'react';

import PropTypes from 'prop-types';
import apis from '../../util/apis';
import { noop } from '../../util/index';
import { roundIcon } from '../../util/svg';
import { Toast, Icon } from 'antd-mobile';
import './index.less';

const isEmpty = key => key && !key.length;
const getInitialData = (initValue, isSelectedPerson) => ({
    isFirst: true,
    // 搜索用户数据
    searchUserList: [],
    // 标记当前层级
    unfoldKeys: [],
    //数据源
    datasource: {},
    // 当前展示的 部门 或者 部门人员列表
    currentData: [],
    // 加载中
    loading: false,
    // 人员关键字搜索
    searchValue: '',
    // 已搜索的关键字
    searchkeys: '',
    // 选中的人员 或者部门
    selectedItemIds: (initValue || []).map(item => item.id),
    selectedItems: initValue || [],
});

function personReducer(state, action) {
    const { type, payload } = action;
    switch (type) {
        case 'setData':
            return { ...state, ...payload };
        case 'loading':
            return {
                ...state,
                loading: payload !== undefined ? payload : !state.loading,
            };
        case 'searchValue':
            return { ...state, searchValue: payload };
        case 'selected':
            return {
                ...state,
                selectedItems: payload,
                selectedItemIds: payload.map(item => item.id),
            };
        default:
            return state;
    }
}

const isChilderKey = (item, targetId) => {
    const { children = [], id } = item;
    if (id === targetId) return true;
    if (isEmpty(children)) return false;
    for (let i = 0; i < children.length; i++) {
        if (isChilderKey(children[i], targetId)) return true;
    }
    return false;
};

const handleStopRolling = event => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
};

function getCurrentData(unfoldKeys, datasource) {
    let index = 0;
    let sign = true;
    let currentData = datasource || {};
    while (sign) {
        const findIndex =
            currentData.children &&
            currentData.children.length &&
            // eslint-disable-next-line no-loop-func
            currentData.children.findIndex(
                data => data.id === unfoldKeys[index],
            );
        const findData =
            currentData.children && currentData.children[findIndex];
        if (findData && findData.id) {
            currentData = findData;
            index++;
        } else {
            sign = false;
        }
    }
    return currentData;
}

/**
 * 根据targetKeys获取所有的item
 * @param   targetKeys  [<String>]
 * @param   treeData    [<Object>]
 * @return  items       [<Object>]  eg. { key: '', title: '' }
 * */
const getTargetItems = (targetKey, treeData) => {
    for (let i = 0; i < treeData.length; i++) {
        const item = treeData[i];
        if (targetKey === item.id) return item;
        if (item.children && item.children.length) {
            const targetData = getTargetItems(targetKey, item.children);
            if (targetData) return targetData;
        }
    }
    return undefined;
};

const getDetList = (keys, datasource) => {
    const current = getTargetItems(keys, datasource) || {};
    if (current && current.id && current.children && current.children.length) {
        return Promise.resolve(current);
    }
    return apis
        .fetchDeptUserTree({ id: keys, queryType: 1 })
        .then(response => {
            if (response && response.code === 0) {
                const data = response.data || [];
                current.children = data;
                if (!current.id) {
                    current.id = keys;
                }
                return current;
            }
            return undefined;
        })
        .catch(err => {
            console.log(err);
        });
};

const getSelectDepartment = ({
    item,
    selectedItems,
    handleSelected,
    handleClickItem,
}) => {
    const { name, id } = item;
    const findIndex = selectedItems.findIndex(select => select.id === id);
    const isChecked = findIndex !== -1;
    return (
        <li key={id} className="dynamic-form-department-item">
            <div
                onClick={() => (isChecked ? null : handleClickItem(item))}
                className={'item-left'}
            >
                <div className={'item-left-arrow-wrap-padding'}>
                    <span
                        className={`item-left-arrow-wrap ${
                            isChecked ? 'bgcfff' : ''
                        }`}
                    >
                        {' '}
                    </span>
                </div>
            </div>
            <div
                onClick={() => handleSelected(item)}
                className={'department-item-right'}
            >
                <div className="department-item-right-icon-wrap">
                    {isChecked ? (
                        <div className={'item-left-icon-wrap-active'}>
                            <Icon type="check-circle" />
                        </div>
                    ) : (
                        <div className={'item-left-icon-wrap'}>{roundIcon}</div>
                    )}
                </div>
                <p>{name}</p>
            </div>
        </li>
    );
};

getSelectDepartment.propTypes = {
    item: PropTypes.object,
    handleClickItem: PropTypes.func,
    handleSelected: PropTypes.func,
    selectedItems: PropTypes.array,
};

const getPidPath = id =>
    // 获取父节点
    apis.fetchUpDeptTree({ id }).then(data => {
        if (!data || data.code !== 0) return [];
        data = data.data || [];
        const pids = [];
        while (data && data.id) {
            pids.push(data.id);
            const next =
                data.children && data.children.length && data.children[0];
            data = next;
        }
        return pids;
    });

function SelectPerson(props) {
    const {
        onCancel = noop,
        isSelectedPerson,
        rootId = 0,
        onSelected = noop,
        isMultiple,
        initValue,
    } = props;
    const [data, dispatch] = useReducer(
        personReducer,
        getInitialData(initValue, isSelectedPerson),
    );
    const { unfoldKeys, datasource, currentData, selectedItems } = data;
    const setDetList = useCallback(
        keys =>
            getDetList(keys, [datasource]).then(item => {
                if (!item) return undefined;
                const isRoot = keys === 0;
                const newUnfoldKeys = isRoot ? [] : [...unfoldKeys, keys];
                dispatch({
                    type: 'setData',
                    payload: {
                        currentData: item.children,
                        unfoldKeys: newUnfoldKeys,
                    },
                });
                return item;
            }),
        [unfoldKeys, datasource],
    );

    const setTreeDataAboutTargetItems = useCallback(async (target, data) => {
        const { pid } = target;

        return getPidPath(pid).then(async pids => {
            for (let i = 0; i < pids.length; i++) {
                await getDetList(pids[i], data);
                const item = getTargetItems(pids[i], data);
                if (!item) throw Error('数据错误');
            }
            return pids;
        });
    }, []);

    useEffect(() => {
        // 初始化获取值

        Toast.loading('Loading...', 0);
        setDetList(rootId)
            .then(async data => {
                if (!selectedItems) return data;
                let pids;
                let item = data;
                for (let i = selectedItems.length - 1; i >= 0; i--) {
                    pids = await setTreeDataAboutTargetItems(selectedItems[i], [
                        data,
                    ]);
                }
                if (pids && pids.length) {
                    item = getTargetItems(pids[pids.length - 1], [data]);
                }
                dispatch({
                    type: 'setData',
                    payload: {
                        datasource: data,
                        currentData: item.children,
                        unfoldKeys: pids || [],
                    },
                });
                return data;
            })
            .finally(() => {
                Toast.hide();
            });

        const body = document.querySelector('body');
        body.style.height = '100vh';
        body.style.overflow = 'hidden';

        return () => {
            const body = document.querySelector('body');
            body.style.height = 'auto';
            body.style.overflow = 'visible';
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // 上一页
    const previousHandle = useCallback(() => {
        if (!unfoldKeys || !unfoldKeys.length) return;
        const newUnfoldKeys = [...unfoldKeys];
        newUnfoldKeys.pop();
        const current = getCurrentData(newUnfoldKeys, datasource);
        if (
            current &&
            current.id !== undefined &&
            current.children &&
            current.children.length
        ) {
            dispatch({
                type: 'setData',
                payload: {
                    currentData: current.children,
                    unfoldKeys: newUnfoldKeys,
                },
            });
        }
    }, [dispatch, unfoldKeys, datasource]);

    const handleClickItem = useCallback(
        item => {
            const { id } = item;

            Toast.loading('Loading...', 0);
            setDetList(id, 'next').then(data => {
                Toast.hide();
            });
        },
        [setDetList],
    );
    // 正反选
    const handleSelected = useCallback(
        item => {
            let list;
            const index = selectedItems.findIndex(data => data.id === item.id);

            if (!isMultiple) {
                list = index === -1 ? [item] : [];
            } else {
                if (index !== -1) {
                    selectedItems.splice(index, 1);
                } else {
                    for (let i = selectedItems.length - 1; i >= 0; i--) {
                        if (isChilderKey(item, selectedItems[i].id)) {
                            selectedItems.splice(i, 1);
                        }
                    }
                    selectedItems.push(item);
                }
                list = [...selectedItems];
            }
            dispatch({
                type: 'selected',
                payload: list,
            });
        },
        [dispatch, isMultiple, selectedItems],
    );

    const handleComplate = useCallback(() => {
        onSelected(selectedItems, selectedItems);
        onCancel();
    }, [onCancel, onSelected, selectedItems]);

    const hasPrevious = !!unfoldKeys.length;

    return (
        <div className={'select-person-wrap'}>
            <div className={'select-person-header'}>
                <div onClick={onCancel}>关闭</div>
                <p>已选择{selectedItems.length}项</p>
                <div onClick={handleComplate}>完成</div>
            </div>
            <div
                onScroll={handleStopRolling}
                className={`${
                    hasPrevious ? 'can-previous' : ''
                } select-person-list-wrap`}
                key="select-person-list-wrap"
            >
                {hasPrevious ? (
                    <div className="previous-btn-wrap">
                        <div className="previous-btn" onClick={previousHandle}>
                            <span className="previous-btn-icon">
                                <Icon type="left" />
                            </span>
                            <span className="previous-btn-text">
                                返回上一页
                            </span>
                        </div>
                    </div>
                ) : null}
                <div className={'select-person-list-content'}>
                    <ul className={'select-person-list'}>
                        {!currentData || !currentData.length ? (
                            <li className={'list-item-empty'}>当前无选项</li>
                        ) : (
                            currentData.map(item =>
                                getSelectDepartment({
                                    item,
                                    selectedItems,
                                    handleSelected,
                                    handleClickItem,
                                }),
                            )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

SelectPerson.propTypes = {
    onCancel: PropTypes.func,
    onSelected: PropTypes.func,
    isSelectedPerson: PropTypes.bool,
    rootId: PropTypes.number,
    isMultiple: PropTypes.bool,
    initValue: PropTypes.any,
};

export default SelectPerson;
